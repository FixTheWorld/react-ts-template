process.env.NODE_ENV = 'development';
var opn = require('opn') // 打开浏览器
var path = require('path') // 路径模块
var express = require('express') // express框架 
var webpack = require('webpack') //核心模块webpack

var webpackConfig = require('./webpack.config')// 配置文件

var port = webpackConfig.devServer.port


var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

app.use(require('connect-history-api-fallback')()) 
//开启 支持history路由


app.use(devMiddleware) // 服务器webpack插件


app.use(hotMiddleware) // 热加载自动打包


app.use('./static', express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}