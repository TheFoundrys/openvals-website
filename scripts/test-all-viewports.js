const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9555;

const VIEWPORTS = [
  // Desktop
  { name: 'desktop-1920x1080', w: 1920, h: 1080, type: 'desktop' },
  { name: 'desktop-1600x900', w: 1600, h: 900, type: 'desktop' },
  { name: 'desktop-1440x900', w: 1440, h: 900, type: 'desktop' },
  { name: 'desktop-1366x768', w: 1366, h: 768, type: 'desktop' },
  { name: 'desktop-1280x800', w: 1280, h: 800, type: 'desktop' },
  // Tablet
  { name: 'tablet-1024x768', w: 1024, h: 768, type: 'tablet' },
  { name: 'tablet-912x1368', w: 912, h: 1368, type: 'tablet' },
  { name: 'tablet-820x1180', w: 820, h: 1180, type: 'tablet' },
  { name: 'tablet-768x1024', w: 768, h: 1024, type: 'tablet' },
  // Mobile
  { name: 'mobile-430x932', w: 430, h: 932, type: 'mobile' },
  { name: 'mobile-414x896', w: 414, h: 896, type: 'mobile' },
  { name: 'mobile-390x844', w: 390, h: 844, type: 'mobile' },
  { name: 'mobile-375x812', w: 375, h: 812, type: 'mobile' },
  { name: 'mobile-360x800', w: 360, h: 800, type: 'mobile' },
  { name: 'mobile-320x700', w: 320, h: 700, type: 'mobile' },
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPageWsUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      if (res.ok) {
        const targets = await res.json();
        const page = targets.find(t => t.type === 'page');
        if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
      }
    } catch (e) {}
    await sleep(300);
  }
  throw new Error("Could not find Chrome page target");
}

async function run() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots', 'audit');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const userDataDir = path.join(__dirname, '..', '.chrome-data-audit-' + Date.now());

  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--user-data-dir=' + userDataDir,
    'http://localhost:3000'
  ]);

  try {
    const wsUrl = await getPageWsUrl();
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
    await send('DOM.enable');

    console.log('--- AUDITING RESPONSIVE VIEWPORTS ---');
    const results = [];

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
            window.scrollTo(0, 0);
          `
        });
        await sleep(350);

        // Check horizontal overflow
        const overflowRes = await send('Runtime.evaluate', {
          expression: `
            (() => {
              const docWidth = document.documentElement.scrollWidth;
              const winWidth = window.innerWidth;
              const hasOverflow = docWidth > winWidth;
              // Check navigation items visibility
              const nav = document.querySelector('[class*="nav"]');
              const hamburger = document.querySelector('[class*="menuToggle"]');
              const sphere = document.querySelector('[class*="aiSphereCore"]');
              const cards = Array.from(document.querySelectorAll('[class*="referenceInfoCard"]')).map(c => {
                const rect = c.getBoundingClientRect();
                return {
                  text: c.innerText.replace(/\\n/g, ' '),
                  left: Math.round(rect.left),
                  right: Math.round(rect.right),
                  top: Math.round(rect.top),
                  bottom: Math.round(rect.bottom),
                  overflowsX: rect.right > winWidth || rect.left < 0,
                };
              });
              const statsCard = document.querySelector('[class*="heroStatsCardMain"]');
              const statsRect = statsCard ? statsCard.getBoundingClientRect() : null;

              return {
                docWidth,
                winWidth,
                hasOverflow,
                cards,
                hasNav: !!nav && getComputedStyle(nav).display !== 'none',
                hasHamburger: !!hamburger && getComputedStyle(hamburger).display !== 'none',
                statsRect: statsRect ? { width: Math.round(statsRect.width), height: Math.round(statsRect.height) } : null,
              };
            })()
          `,
          returnByValue: true,
        });

        const data = overflowRes.result.value;
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        const shotName = `${vp.name}-${theme}.png`;
        fs.writeFileSync(path.join(screenshotsDir, shotName), Buffer.from(shot.data, 'base64'));

        const cardOverflows = data.cards.filter(c => c.overflowsX);
        const status = {
          viewport: vp.name,
          theme,
          hasOverflow: data.hasOverflow,
          docWidth: data.docWidth,
          winWidth: data.winWidth,
          hasNav: data.hasNav,
          hasHamburger: data.hasHamburger,
          cardOverflowsCount: cardOverflows.length,
          cardOverflows: cardOverflows.map(c => `${c.text} (L:${c.left}, R:${c.right})`),
        };
        results.push(status);
        console.log(`[${vp.name} | ${theme}] overflow: ${data.hasOverflow ? 'YES (' + data.docWidth + '>' + data.winWidth + ')' : 'NO'} | Card overflows: ${cardOverflows.length} | Nav: ${data.hasNav ? 'desktop' : 'hamburger'}`);
      }
    }

    fs.writeFileSync(path.join(screenshotsDir, 'audit-results.json'), JSON.stringify(results, null, 2));
    console.log('Audit completed and saved to screenshots/audit/audit-results.json');
    ws.close();
  } finally {
    chrome.kill('SIGTERM');
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
  }
}

run().catch(console.error);

