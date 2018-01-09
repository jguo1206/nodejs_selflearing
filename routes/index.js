const express = require('express');

const router = express.Router();

/* GET home page. */
// 访问主页的时候，调用ejs模版引擎来渲染index.ejs模版
// 定义当路由器接受到get请求的时候页面返回什么，当构建博客系统是可以通过更改这个页面的代码来定义页面的路由规划
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;

  