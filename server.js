const http2 = require('http2');
const fs = require('fs');
const util = require('util')

const server = http2.createSecureServer({
  key: fs.readFileSync('k.pem'),
  cert: fs.readFileSync('c.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  // stream.respond({
  //   'content-type': 'text/html',
  //   ':status': 200
  // });
  let body = ''
  stream.on('data' , (chunk)=>{
    console.log(`chunk ===> ${JSON.stringify(chunk)}`)
    body+=chunk;
  });
  stream.on('end' , (chunk)=>{
    if (chunk)
      body+=chunk;
    stream.respond({
      'content-type': 'text/html',
      ':status': 200
    });
    const result = JSON.stringify({
      headers,
      body
    },null, 2);
    console.log(`result ===> ${result}`)
    stream.end(result);
  })
});

server.listen(8443);
