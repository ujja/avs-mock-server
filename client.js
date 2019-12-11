process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const http2 = require('http2');
const fs = require('fs');
const client = http2.connect('https://localhost:8443/stream', {
  ca: fs.readFileSync('./cert.pem')
});
client.on('error', (err) => console.error(err));

const req = client.request({ ':path': '/test' });

req.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  }
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => { data += chunk; });
req.on('end', () => {
  console.log(`\n${data}`);
  client.close();
});
req.end();
