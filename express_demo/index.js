
const express = require('express');
const http = require('http');
const bodyparser = require('body-parser'); // 实现对path的分析和判断
const auth = require('./middlewares/auth');

const app = express();
// *
  // app.use('/', (request, response) => {
  //   response.end('Hello welcome to my first express demo');
  // });

// **
  // app.use((request, response, next) => {
  //   request.duang = 1;
  //   next();
  // });
  // app.use((request, response) => {
  //   console.log(request.duang);
  //   response.end('Welcome to my first express framework');
  // });

// ***
  // const app = express(); // app是express的实例化对象
  // app.use(auth); // 典型的中间键的用法

  // app.use((request, response, next) => {
  //   request.duang = 1;
  //   next('something wrong');
  // });

  // app.use((request, response) => {
  //   response.end('Welcome to the great journey to Disneyland!');
  // });

//
// bodyparser: 自动解析键和值； 帮助处理request的body
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.use((request,response, next) => {
  request.middlewares = [];
  next();
})

function mw1(options){
  return function(request, response, next){
    request.middlewares.push('mw1');
    next();
  }
  
}

function mw2(request, response, next){
  request.middlewares.push('mw2');
  next(); // 调用中间键
}

function mw3(request, response, next){
  request.middlewares.push('mw3');
  response.end(JSON.stringify(request.middlewares)); // 调用中间键
}

// app.use('/', (request, response) => {
//   console.log(response);
// })
app.use('/', mw1())
app.get('/article', mw2)
app.post('/user',mw2)
app.use(mw3)
// app.use(mw1(), mw2, mw3);
// 错误处理中间键
// ** 要有四个 参数一个不能少
// ** 如何调用-- 在任意一个next函数中传入参数, 流程就会自动跑到error中间键这一部分
app.use((err, request, response, next) => {
  response.end(err);
})
const server = http.createServer(app);
server.listen('8888');
