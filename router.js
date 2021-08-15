
// module.exports = function (app, comments) {

//   // 当服务器收到 get 请求的时候，执行回调处理函数

//   app.get('/', function (req, res) {
//     //  express 默认会去项目中的 views 目录找 index.html  进行模板引擎渲染
//     res.render('index.html', {
//       comments: comments
//     })
//   })

//   app.get('/post', function (req, res) {
//     res.render('post.html')
//   })
//   // 使用 get 请求的页面
//   // app.get('/pinglun', function (req,res){
//   //   let comment = req.query
//   //   comment.dateTime = "2021-10-23"
//   //   comments.unshift(comment)

//   //   res.redirect('/') //相当于 res.statusCode=302 res.setHeader('Location','/')
//   // })

//   // 使用 post 请求的页面
//   app.post('/post', function (req, res) {
//     // console.log('收到表单post')
//     // 1. 获取表单 post 请求体数据
//     // 2. 处理
//     // 3. 发送响应
//     let comment = req.body
//     comment.dateTime = "2021-10-23"
//     comments.unshift(comment)

//     res.redirect('/') //相当于 res.statusCode=302 res.setHeader('Location','/')
//     // req.query 只能拿 get 请求参数

//     // post
//   })
//   app.get('/about', function (req, res) {
//     // 在 Express 中可以直接 req.query 来获取查询字符串参数
//     console.log(req.query)
//     res.send('你好，我是express')
//   })
// // }

// // express 提供一种 router 方式进行路由管理

// let fs = require('fs')

// let express = require('express')

// let router = express.Router()

// app.get('/', function (req, res) {
//   //  express 默认会去项目中的 views 目录找 index.html  进行模板引擎渲染
//   res.render('index.html', {
//     comments: comments
//   })
// })

const express = require('express')

const Student = require('./student')

const fs = require('fs')

const router = express.Router()

router.get('/', function (req, res) {
  //  express 默认会去项目中的 views 目录找 index.html  进行模板引擎渲染
  Student.find((err, students) => {
    if (err) {
      throw err
    }
    res.render('index.html', {
      students
    })
  })
})

router.get('/index_login', function (req, res) {
  Student.find((err, students) => {
    if (err) {
      throw err
    }
    res.render('index_login.html', {
      students
    })
  })
})

router.get('/post', function (req, res) {
  res.render('post.html')
})

router.post('/save', function (req, res) {
  Student.save(req.body, (err) => {
    if (err) {
      throw err
    }
    res.redirect('/index_login')
  })
})

router.get('/edit', (req, res) => {
  Student.findByid(parseInt(req.query.id), (err, student) => {
    if (err) {
      throw err
    }
    res.render('update.html', {
      student
    })
  })
})

router.post('/edit', (req, res) => {
  Student.updateByid(req.body, (err) => {
    if (err) {
      throw err
    }
    res.redirect('/index_login')
  })
})
// 使用 get 请求的页面
// app.get('/pinglun', function (req,res){
//   let comment = req.query
//   comment.dateTime = "2021-10-23"
//   comments.unshift(comment)

//   res.redirect('/') //相当于 res.statusCode=302 res.setHeader('Location','/')
// })

// 使用 post 请求的页面
// router.post('/post', function (req, res) {
//   // console.log('收到表单post')
//   // 1. 获取表单 post 请求体数据
//   // 2. 处理
//   // 3. 发送响应
//   res.redirect('/') //相当于 res.statusCode=302 res.setHeader('Location','/')
//   // req.query 只能拿 get 请求参数

//   // post
// })
router.get('/delete', (req, res) => {
  // 在 Express 中可以直接 req.query 来获取查询字符串参数
  // console.log(req.query)
  Student.delete(req.query.id, (err) => {
    res.redirect('/index_login')
  })
})

router.post('/login', (req, res) => {
  Student.login(req.body, (err, flag, students) => {
    if(err) {
      throw err
    }
    if(flag === 0){
      res.redirect('/lg')
      res.render('login.html', {
        message: '用户名不存在或密码错误'
      })
    } else {
      res.redirect('/index_login')
    }
  })
})

router.get('/lg', (req, res) => {
  res.render('login.html')
})
// 把 router 导出
module.exports = router
