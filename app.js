/* 
  app.js 入门模块
  职责：
    启动服务
    做一些服务相关配置
      模板引擎
      body-parser 解析表单 post 请求体
      提供静态资源服务
    挂载路由
    监听端口启动服务
*/
const express = require('express')
const bodyParser = require('body-parser')
/* 
    创建你服务器应用程序
    也就是原来的 http.createServer
*/

const app = express()
const router = require('./router.js')


// 加载 art-template 模板引擎
app.engine('html', require('express-art-template'))
// 在 Express 中开放资源就是一个 API 的事儿
// 公开指定目录
// 只要这样做了，你就可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
// 第一个参数为第二个回调函数参数的别名
app.use('/node_modules', express.static('./node_modules'))
app.use('/public/', express.static('./public/'))

// 配置 body-parser 中间件（插件, 专门用来解析表单post请求体）
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(router)

//   相当于 server.listen
app.listen(3000, function () {
  console.log('server is running port 3000')
})
