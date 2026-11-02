const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9558;

const VIEWPORTS = [
  { name: 'desktop-1920x1080', w: 1920, h: 1080, type: 'desktop' },
  { name: 'desktop-1440x900', w: 1440, h: 900, type: 'desktop' },
  { name: 'desktop-1280x800', w: 1280, h: 800, type: 'desktop' },
  { name: 'tablet-1024x768', w: 1024, h: 768, type: 'tablet' },
  { name: 'tablet-820x1180', w: 820, h: 1180, type: 'tablet' },
  { name: 'tablet-768x1024', w: 768, h: 1024, type: 'tablet' },
  { name: 'mobile-414x896', w: 414, h: 896, type: 'mobile' },
  { name: 'mobile-390x844', w: 390, h: 844, type: 'mobile' },
  { name: 'mobile-320x700', w: 320, h: 700, type: 'mobile' },
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots', 'full-audit');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'http://localhost:3000'
  ]);

  try {
    let wsUrl;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
        if (res.ok) {
          const targets = await res.json();
          const page = targets.find(t => t.type === 'page');
          if (page && page.webSocketDebuggerUrl) { wsUrl = page.webSocketDebuggerUrl; break; }
        }
      } catch (e) {}
      await sleep(300);
    }
    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await send('Page.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(1500);

    const issuesFound = [];

    for (const vp of VIEWPORTS) {
      for (const theme of ['light', 'dark']) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.w,
          height: vp.h,
          deviceScaleFactor: vp.type === 'mobile' ? 2 : 1,
          mobile: vp.type === 'mobile',
        });
        await send('Emulation.setEmulatedMedia', {
          media: 'screen',
          features: [{ name: 'prefers-color-scheme', value: theme }],
        });

        await send('Runtime.evaluate', {
          expression: `
            if ('${theme}' === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          `
        });
        await sleep(300);

        // Audit page sections
        const auditRes = await send('Runtime.evaluate', {
          expression: `
            (() => {
              const winWidth = window.innerWidth;
              const docWidth = document.documentElement.scrollWidth;
              const bodyWidth = document.body.scrollWidth;
              const hasDocOverflow = docWidth > winWidth || bodyWidth > winWidth;

              // Check overflowing elements
              const allElements = Array.from(document.querySelectorAll('*'));
              const overflowingElements = [];
              for (const el of allElements) {
                const rect = el.getBoundingClientRect();
                // ignore fixed/sticky or hidden
                const style = window.getComputedStyle(el);
                if (style.display === 'none' || style.visibility === 'hidden' || style.position === 'fixed') continue;
                if (rect.right > winWidth + 1.5 || rect.left < -1.5) {
                  // Ignore elements inside established horizontal scroll containers
                  let parent = el.parentElement;
                  let inScroll = false;
                  while (parent && parent !== document.body) {
                    const pStyle = window.getComputedStyle(parent);
                    if (pStyle.overflowX === 'auto' || pStyle.overflowX === 'scroll' || pStyle.overflowX === 'hidden') {
                      inScroll = true;
                      break;
                    }
                    parent = parent.parentElement;
                  }
                  if (!inScroll && rect.width > 0 && rect.height > 0) {
                    overflowingElements.push({
                      tag: el.tagName,
                      className: (el.className || '').toString().slice(0, 40),
                      left: Math.round(rect.left),
                      right: Math.round(rect.right),
                      width: Math.round(rect.width),
                    });
                  }
                }
              }

              // Check table and card wrappers
              const tables = Array.from(document.querySelectorAll('table')).map(t => {
                const p = t.parentElement;
                const pStyle = window.getComputedStyle(p);
                return {
                  hasScrollParent: pStyle.overflowX === 'auto' || pStyle.overflowX === 'scroll',
                  tableWidth: Math.round(t.getBoundingClientRect().width),
                  parentWidth: Math.round(p.getBoundingClientRect().width),
                };
              });

              // Check packages grid
              const pkgGrid = document.querySelector('[class*="engagementPackagesGrid"]');
              let pkgCols = null;
              if (pkgGrid) {
                const style = window.getComputedStyle(pkgGrid);
                pkgCols = style.gridTemplateColumns;
              }

              // Check search box in latest reports
              const searchBox = document.querySelector('[class*="searchBoxWrap"]');
              let searchBoxWidth = searchBox ? Math.round(searchBox.getBoundingClientRect().width) : null;

              return {
                winWidth,
                docWidth,
                hasDocOverflow,
                overflowingCount: overflowingElements.length,
                overflowingElements: overflowingElements.slice(0, 5),
                tables,
                pkgCols,
                searchBoxWidth,
              };
            })()
          `,
          returnByValue: true,
        });

        const val = auditRes.result.value;
        const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
        fs.writeFileSync(path.join(screenshotsDir, `${vp.name}-${theme}-full.png`), Buffer.from(shot.data, 'base64'));

        console.log(`[${vp.name} | ${theme}] overflow: ${val.hasDocOverflow ? 'YES (' + val.docWidth + '>' + val.winWidth + ')' : 'NO'} | Uncontained overflows: ${val.overflowingCount} | PkgCols: ${val.pkgCols ? val.pkgCols.split(' ').length + ' cols' : 'N/A'}`);
        if (val.overflowingCount > 0) {
          console.log('  -> Elements:', JSON.stringify(val.overflowingElements));
          issuesFound.push({ viewport: vp.name, theme, elements: val.overflowingElements });
        }
      }
    }

    fs.writeFileSync(path.join(screenshotsDir, 'full-audit-issues.json'), JSON.stringify(issuesFound, null, 2));
    console.log('Finished full site audit.');
    ws.close();
  } finally {
    chrome.kill('SIGTERM');
  }
}

run().catch(console.error);

