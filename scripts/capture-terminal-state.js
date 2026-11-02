const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;

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
        if (page && page.webSocketDebuggerUrl) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch (e) {
      // retry
    }
    await sleep(300);
  }
  throw new Error("Could not find Chrome page target");
}

async function run() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');

  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--user-data-dir=' + path.join(__dirname, '..', '.chrome-user-data'),
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

    const themes = ['dark', 'light'];

    for (const theme of themes) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        mobile: false,
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

      // 1. Capture Product Tab (Image 2)
      await send('Runtime.evaluate', {
        expression: `document.querySelector('[data-tab="product"]')?.click();`
      });
      await sleep(600);

      const shotProduct = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 1920, height: 1080, scale: 1 },
      });
      fs.writeFileSync(path.join(screenshotsDir, `hero-1920-${theme}-product.png`), Buffer.from(shotProduct.data, 'base64'));
      console.log(`Saved hero-1920-${theme}-product.png`);

      // 2. Click Terminal Tab (Image 3)
      await send('Runtime.evaluate', {
        expression: `document.querySelector('[data-tab="terminal"]')?.click();`
      });
      await sleep(600);

      const shotTerminal = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 1920, height: 1080, scale: 1 },
      });
      fs.writeFileSync(path.join(screenshotsDir, `hero-1920-${theme}-terminal.png`), Buffer.from(shotTerminal.data, 'base64'));
      console.log(`Saved hero-1920-${theme}-terminal.png`);

      // 3. Mobile Terminal State (390)
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 1,
        mobile: true,
      });
      await sleep(500);

      const shotMobileTerm = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 390, height: 844, scale: 1 },
      });
      fs.writeFileSync(path.join(screenshotsDir, `hero-390-${theme}-terminal.png`), Buffer.from(shotMobileTerm.data, 'base64'));
      console.log(`Saved hero-390-${theme}-terminal.png`);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
