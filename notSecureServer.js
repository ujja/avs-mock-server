const http2 = require('http2');
const fs = require('fs');

const server = http2.createServer();
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });

  console.log(`req ===> ${JSON.stringify(headers, null, 2)}`)
  stream.end(`req ===> ${JSON.stringify(headers, null, 2)}`);
});

server.listen(8443);
