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

  ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('CONSOLE:', msg.params.args.map(a => a.value !== undefined ? a.value : a.description).join(' '));
    }
  };

  setTimeout(async () => {
    ws.send(JSON.stringify({
      id: 2,
      method: 'Runtime.evaluate',
      params: {
        expression: `(() => {
          const btn = document.querySelector('[data-tab="terminal"]');
          console.log('Clicking terminal button...');
          btn.click();
          setTimeout(() => {
            const btnAfter = document.querySelector('[data-tab="terminal"]');
            const box = document.querySelector('[class*="terminalBox"]');
            console.log('500MS_STATE:', JSON.stringify({
              className: btnAfter ? btnAfter.className : 'null',
              hasBox: !!box,
              boxText: box ? box.innerText : 'NO BOX'
            }));
          }, 500);
        })()`
      }
    }));
  }, 1000);

  setTimeout(() => {
    chrome.kill();
    process.exit(0);
  }, 4000);
}

run().catch(err => {
  console.error(err);
  chrome.kill();
});
