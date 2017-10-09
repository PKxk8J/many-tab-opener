'use strict'

const http = require('http')
const url = require('url')

http.createServer(function (req, res) {
  const query = url.parse(req.url, true).query;
  const title = query.title || req.url
  const body = query.body || req.url
  res.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body>
    ${body}
  </body>
</html>
`)
  res.end()
}).listen(8080)
