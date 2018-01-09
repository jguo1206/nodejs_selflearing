// ** express 预习
// EXPRESS IS A ROUTINE AND MIDDELEWARE WEB FRAMEWORK http://expressjs.com/en/guide/using-middleware.html
// *1. 什么是路由
// * 1）确定应用程序如何响应特定端点的客户机请求 2）包含一个uri（或路径）和一个http请求方法 3)一个路由可以由一个或多个处理程序函数
// * 4）路由定义采用下面结构: app.(PATH,HANDLER）
//      ** app 是express的实例
//      **METHOD是HTTP请求方法
//      **path是服务器上的路径  ROUTER PATH: define the endpoints where endpoints can be made
//      **HANDLER是路由匹配时候执行的函数
//      **参考英文文档————http://expressjs.com/en/guide/routing.html

// ** installation
    // install nvm
    // nvm ls
    // npm i -g express-generator
    // npm config set registry https://registry.npm.taobao.com
    // rm -rf one_punch
    // express --view=ejs what_i_love
    // git
    // git init
    // 安装eslint airbnb
    // lint


// ** express正式课程
    // * hapi.js  egg.js
    // * 框架本质上来说做的事情都差不多，框架帮助你简化了很多问题
// ** HTTP复习
    // shema://host:post/path?path#query
    // url: uniform resource locator
    // http请求头： 方法/版本/键值对
    // http请求头之后是一个空行，然后是一个请求体
    // http各个请求是无状态请求，各个请求之间是无关的，如何保证独立的请求之间有联系（是前端后端解决的问题之一） 有一些主流的方法
// ** Express
    // 初始化项目nvm 
    // 淘宝镜像 npm config set registry https://registry.npm.taobao.org
    // rm -rf 删除某一个文件夹

    // 使用git初始化项目 // 讲义中有写将代码推送到对应的github中
    // express_demo
    // npm i --save express(保存express)
    // 每发送一次request一定会有一个response，这是一个完整的生命周期；
    // 中间键之间不需要很强烈的耦合/ next（）表示要使用下一个中间键
    // app.use()用来调用中间键
    // next()中传入任何参数都会调用后面的error中间键
    // 网关： 负责接受请求并分发到处理业务的具体逻辑上去
    // 路由的过程：网关应该把什么请求发到什么地方去呢。 方法：1）是get方法还是post方法 2）path路径是指向到哪里去
    // 当使用app.use的时候实际上对get还是post都没有什么具体的限制

    // 具体代码可以在what_i_love的代码文件中找到