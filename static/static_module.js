const fs = require('fs');
const sys = require('util');
const http = require('http');
const url = require('url');
const path = require('path');

const BASE_DIR = __dirname;
const CONF = BASE_DIR + '/conf/';
const STATIC = BASE_DIR;
const mimeConf = getUrlConf();
const CACHE_TIME = 60*60*24*365;

exports.getStaticFile = (pathname, req, res) => {
  let extname = path.extname(pathname);
  extname = extname ? extname.slice(1) : '';
  
  const realPath = STATIC + pathname;
  const mimeType = mimeConf[extname] ? mimeConf[extname] : 'text/plain';
  
  // return;
  fs.exists(realPath, (exists) => {
    if (!exists) {
      res.writeHead(404, {'Content-Type': "text/plain"});
      res.write('Sorry, Not Found this Source.');
      res.end();
    } else {
      var fileInfo = fs.statSync(realPath);
      // console.log(fileInfo);
      var lastModified = fileInfo.mtime.toUTCString();
      console.log(lastModified);
      if(mimeConf[extname]) {
        var date = new Date();
        date.setTime(date.getTime() + CACHE_TIME * 1000);
        res.setHeader('Expires', date.toUTCString());
        res.setHeader('Cache-Control', 'max-age=' + CACHE_TIME);
        res.setHeader('Last-Modified', lastModified);
      }
      // console.log('-----');
      // console.log(lastModified == req.headers['if-modified-since']);
      // console.log('-----');
      if (req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']) {
        res.writeHead(304, 'Not Modified');
        res.end();
      } else {
        fs.readFile(realPath, 'binary', function(err, file) {
          if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end(err);
          } else {
            res.writeHead(200, {'Content-Type': mimeType});
            res.write(file, 'binary');
            res.end();
          }
        })
      }
    }
  })
}
function getUrlConf () {
  let routerMsg = {};
  try {
    const str = fs.readFileSync(CONF + 'mime_type.json', 'utf8');
    routerMsg = JSON.parse(str);
  } catch(e) {
    sys.debug("JSON parse fails");
  }
  
  return routerMsg;
}