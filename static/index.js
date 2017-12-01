const http = require('http');
const fs = require('fs');
const staticModule = require('./static_module');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if(req.url != '/' && req.url != 'index.html' && req.url != '/favicon.ico') {
    staticModule.getStaticFile(req.url, req, res);
    // res.end('dd');
  } else {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (err) {
        console.log('出错了');
        return;
      }
      // console.log(data);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});