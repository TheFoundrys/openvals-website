const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9559;

const ROUTES = [
  '/',
  '/models',
  '/datasets',
  '/spaces',
  '/pricing',
  '/openvals-docs',
  '/assessment',
  '/aixlence',
  '/redshield',
  '/about',
  '/blog',
];

const VIEWPORTS = [
  { name: 'desktop-1440', w: 1440, h: 900, type: 'desktop' },
  { name: 'tablet-768', w: 768, h: 1024, type: 'tablet' },
  { name: 'mobile-375', w: 375, h: 812, type: 'mobile' },
  { name: 'mobile-320', w: 320, h: 700, type: 'mobile' },
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
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

    console.log('--- TESTING KEY ROUTES ACROSS VIEWPORTS ---');
    for (const route of ROUTES) {
      await send('Page.navigate', { url: `http://localhost:3000${route}` });
      await sleep(800);

      for (const vp of VIEWPORTS) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.w,
          height: vp.h,
          deviceScaleFactor: vp.type === 'mobile' ? 2 : 1,
          mobile: vp.type === 'mobile',
        });
        await sleep(200);

        const checkRes = await send('Runtime.evaluate', {
          expression: `
            (() => {
              const docWidth = document.documentElement.scrollWidth;
              const winWidth = window.innerWidth;
              return { docWidth, winWidth, hasOverflow: docWidth > winWidth + 1 };
            })()
          `,
          returnByValue: true,
        });

        const res = checkRes.result.value;
        if (res.hasOverflow) {
          console.log(`[OVERFLOW DETECTED] Route ${route} on ${vp.name}: docWidth=${res.docWidth} > winWidth=${res.winWidth}`);
        } else {
          console.log(`[PASS] Route ${route} on ${vp.name}`);
        }
      }
    }
    ws.close();
  } finally {
    chrome.kill('SIGTERM');
  }
}

run().catch(console.error);

