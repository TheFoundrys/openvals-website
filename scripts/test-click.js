const { spawn } = require('child_process');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9222',
  '--headless=new',
  'http://localhost:3000'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2500));
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  await new Promise(r => ws.onopen = r);

  const send = (method, params = {}) => new Promise(res => {
    const id = Math.random();
    const handler = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        res(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  const res1 = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('[data-tab="terminal"]');
      btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      return 'Dispatched';
    })()`
  });
  console.log('Dispatch:', res1);

  await new Promise(r => setTimeout(r, 800));

  const res2 = await send('Runtime.evaluate', {
    expression: `(() => {
      const code = document.querySelector('code, span');
      const box = document.querySelector('[class*="terminalBox"]');
      return { hasBox: !!box, text: box ? box.innerText : 'NO BOX' };
    })()`
  });
  console.log('After click state:', res2);

  chrome.kill();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  chrome.kill();
});
