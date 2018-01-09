const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // 定义日志中间键
app.use(bodyParser.json()); // 定义解析json的中间键
app.use(bodyParser.urlencoded({ extended: false })); // 定义解析urlencode的中间键
app.use(cookieParser()); // 定义解析cookie的中间键
app.use(express.static(path.join(__dirname, 'public'))); // 定义存放静态文件的目录
// 路由控制器
app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler // 开发环境下的错误处理器
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page // 生产环境下的错误处理器
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
