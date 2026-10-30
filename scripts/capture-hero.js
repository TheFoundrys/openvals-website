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
      // wait and retry
    }
    await sleep(200);
  }
  throw new Error("Could not find Chrome page target");
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function capture() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

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
    const cdp = new CDPClient(wsUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');

    // Wait for initial page hydration
    await sleep(3000);

    const themes = ['light', 'dark'];

    for (const theme of themes) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        mobile: false,
      });

      await cdp.send('Emulation.setEmulatedMedia', {
        media: 'screen',
        features: [{ name: 'prefers-color-scheme', value: theme }],
      });

      await cdp.send('Runtime.evaluate', {
        expression: `
          if ('${theme}' === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        `
      });

      // 1. Capture "Start in the product" (Image 2 style)
      await cdp.send('Runtime.evaluate', {
        expression: `
          const btn = document.querySelector('[data-tab="product"]');
          if (btn) btn.click();
        `
      });
      await sleep(600);

      const shotProduct = await cdp.send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 1920, height: 1080, scale: 1 },
      });
      fs.writeFileSync(path.join(screenshotsDir, `hero-1920-${theme}-product.png`), Buffer.from(shotProduct.data, 'base64'));
      console.log(`Saved hero-1920-${theme}-product.png`);

      // 2. Capture "Start in your terminal" (Image 3 style)
      await cdp.send('Runtime.evaluate', {
        expression: `
          const btn = document.querySelector('[data-tab="terminal"]');
          if (btn) btn.click();
        `
      });
      await sleep(700);

      const shotTerminal = await cdp.send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 1920, height: 1080, scale: 1 },
      });
      fs.writeFileSync(path.join(screenshotsDir, `hero-1920-${theme}-terminal.png`), Buffer.from(shotTerminal.data, 'base64'));
      console.log(`Saved hero-1920-${theme}-terminal.png`);

      // 3. Mobile 390 capture for both states
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 1,
        mobile: true,
      });
      await sleep(400);

      const shotMobileTerm = await cdp.send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 390, height: 844, scale: 1 },
      });
      fs.writeFileSync(path.join(screenshotsDir, `hero-390-${theme}-terminal.png`), Buffer.from(shotMobileTerm.data, 'base64'));
      console.log(`Saved hero-390-${theme}-terminal.png`);

      // Click product tab on mobile
      await cdp.send('Runtime.evaluate', {
        expression: `
          const btn = document.querySelector('[data-tab="product"]');
          if (btn) btn.click();
        `
      });
      await sleep(500);

      const shotMobileProd = await cdp.send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y: 0, width: 390, height: 844, scale: 1 },
      });
      fs.writeFileSync(path.join(screenshotsDir, `hero-390-${theme}-product.png`), Buffer.from(shotMobileProd.data, 'base64'));
      console.log(`Saved hero-390-${theme}-product.png`);
    }

    cdp.close();
  } finally {
    chrome.kill();
  }
}

capture().catch(err => {
  console.error("Capture failed:", err);
  process.exit(1);
});
