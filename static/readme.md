## 静态服务器
 [source](https://www.cnblogs.com/BestMePeng/p/Node_StaticSource.html)

 - http实现web server 
 - 分支请求 
  - fs 
    - readFile [readFile](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_readfile_path_options_callback)  
    index.html res.setHeader('Content-Type', 'text/html'); 
  - require static 模块
    - mime_type的分析
      - path.extname 后缀
      - 配置文件返回类型
    - 由路径 到__dirname 得到绝对地址
      - fs.exists 文件是否存在
      - fs.statSync 文件的详情， 同步 找到mtime
      > mtime 最后修改时间
      > 304 Not Modified
      req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']
