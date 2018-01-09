// learning nodejs 
// Lesson 1: Http 搭建
// http协议相关的东西  为什么用express这个框架 不同框架的对比
// 搭建一个简单的 http service之后就可以做一个简单的互动聊天系统

// **（一）基础知识
    // ** const url = 'address://pudong.shanghai.china/jingkeroad/111'; // 只要通过规定的协议address来访问后面的地址就可以把想要寄的东西寄到想寄的地方
    // ** 总结而言， url就是定位某个主机上面某个端口某个资源的位置
    // ** 在查看网页的html时找到network的remote address Remote Address:10.21.24.227:80--表示发到80端口 （http://www.cnpc/Pages/default.html）
    // ** http 中有哪些元素，用这些元素可以做什么
    // ** http & https https://store.yooso.com.cn/
    // ** url: Uniform Resource Locator; 是uri的子集。 uri这里的i是indentifier
    // ** url的构成：  Schema:// host:port/path?query#hash
    // ** host:主机名。表示是在哪一台机器上提供的服务  主机名+端口名决定正在使用哪一个服务，既由谁来给你提供服务
    // ** port: 端口号;一般服务器系统上有一些常用的端口： 22-ssh服务；80-http服务；443-https服务; mongodb:27017
    // ** 端口号码用来储存一些大家都广泛接受的协议的传输；上面的8008是自己定义的（1000之后的端口）；不能和一台主机上面的其他tcp服务有一个冲突即可
    // ** path：资源在对应的主机和端口的下面到底是在哪个位置。
    // ** host: 有两种选择（1） ip地址 （2）域名
    // ** 域名和DNS： DNS解析--domain name system--一句话：相当于一个别名（g.cn-- google的域名）把一个域名具体解析到一个ip地址，一个主机
    // ** localhost:127.0.0.1
    // ** ?query#hash:
    // ** query: 大多数协议都是基于约定来的，包括分隔符。query的典型样式是：?a=1&b=2&c=3 分隔符号： ？ 以及 $ 都是分隔符
    // ** query: 从字面上的意义来说是筛选和查询的作用

// ** （二） http请求头部分
    // ** HTTP请求第一部分（第一行） GET /index/HTTP(协议版本)/1.1--标明用什么方法请求一个什么路径以及用什么HTTP版本去请求
    // ** HTTP 方法： GET POST PATCH PUT DELETE OPTION HEAD（Postman有很多可自行参考） --方法名字表达了具体的操作是什么样子的
    // ** GET：获取某一个资源的请求 POST：1）新建 2）修改
    // ** path:/user GET: 获取所有用户 POST：新建用户 PATCH：修改用户信息 PUT： 创建 DELETE：删除 OPTIONS：列举可进行的操作 HEAD：返回head信息
    // ** HTTP 请求头的第二部分： 第二行到空行之间 重要的键值对： Content_Type: 请求体的类型（编码、格式等）
    // ** Content-Length: 请求体的长度
    // ** Accept： 能够接受的返回体类型
    // ** Cookie： cookie
    // ** http请求头和请求体以空行作为分隔符
    // ** HTTP 请求头的第三部分： 请求体 http-request/response-body
    // ** 根据请求头解析具体内容
    // ** ftp 断点续传
    // ** 命令行神器 on-my-zsh
    // ** http:超文本传输协议（1）文本传输--可读的文本/headers里面都是明文的，body里的东西还是要指定格式
    // ** 为什么请求体会如此复杂？
    // ** 请求体的格式通常由请求头里的content-type指定，有可能会很大
    // ** buffer和流：一次吃不下的水一口口吃
    // ** 可以通过限制 content.length来决定每次传输多大的文件
    // ** 也可以通过buffer
    // ** npm i -g express 安装express
    // ** npm i -g express-generator
    // ** express --view=ejs one_punch //建立一个名为one_punch的项目
    // ** cd one_punch
    // ** npm i
    // ** node bin/www

// ** CODEs
import * as http from 'http';
import * as qs from 'querystring'; // parse and stringtify url 
import * as a from 'express';
import * as fs from 'fs';

// let server = http.createServer();
// server.listen(8000);
// server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
//    response.statusCode = 200;
//    response.write('welcome to my first http server');
//    response.end();
// });


const users: any[] = [];
let server = http.createServer();
server.listen(8088);

// server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
//     let url = request.url;
//     let responsestring: any;
//     console.log(url);
//     if (typeof url !== 'undefined') {
//         const querystring = url.substr(url.indexOf('?') + 1, url.length);
//         const query = qs.parse(querystring); // 解析query string
//         console.log(query);
//         if (url.indexOf('/hello') > -1) {
//             responsestring = 'Hi There';
//             if (query.i_need_money = 'true' && (query.how_much) > 500){
//                 responsestring = 'go away';
//             } else {
//                 responsestring = 'OK, here you go';
//             }
//         } else if (url.indexOf('/bye') > -1) {
//             responsestring = ' see u later';
//         } else {
//             responsestring = ' i dont know what you are talking about';
//         }

//     } else {
//         responsestring = 'Say something my friend';
//     }
//     response.statusCode = 200;
//     response.end(responsestring);

// });


// 针对不同的path
// server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
//     const url = request.url;
//     console.log(url); // url
//     if (typeof url !== 'undefined'){
//         const path = url.substr(0, url.indexOf('?'));
//         // const queryString = url.substr(url.indexOf('?') + 1, url.length);
//         // const query = qs.parse(queryString);
//         // console.log(query); // query
//         let responsestring: any;
//         // 针对 path的不同 返回的内容不同
//         switch (path) {
//             case '/user': // when path is a user
//                 switch (request.method) { // indicate that we are going to do multiple approaches about the '/user'
//                     case 'GET':
//                         response.statusCode = 200;
//                         response.end(JSON.stringify(users));
//                         break;
//                     case 'POST':
//                         const user = { name: Math.floor(Math.random() * 100) };
//                         users.push(user);
//                         response.statusCode = 200;
//                         response.end(JSON.stringify(user));
//                         break;
//                     default:
//                         response.statusCode = 404;
//                         response.end("NOT FOUND");
//                 }
//                 break;

//             default:
//                 response.statusCode = 404;
//                 response.end("NOT FOUND");
//         }
//     } else {
//         response.statusCode = 404;
//         response.end("NOT FOUND");
//     }

// });


server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
    const url = request.url;
    // console.log(url); // url
    if (typeof url !== 'undefined') {
        const path = url.substr(0, url.indexOf('?'));
        const queryString = url.substr(url.indexOf('?') + 1, url.length);
        const query = qs.parse(queryString);
        console.log(query); // query
        // let responsestring: any;
        // 针对 path的不同 返回的内容不同
        switch (path) {
            case '/user':
                switch (request.method) {
                    case 'GET':
                        response.statusCode = 200;
                        response.end(JSON.stringify(users));
                        break;
                    case 'POST':
                        const contentype = request.headers['Content_Type']; // if the head is not application/json
                        console.log(contentype);
                        if (contentype !== 'application/json') {
                            response.statusCode = 400;
                            response.end("Error");
                        } else {
                            // let datacount = 0;
                            let requestBodyStr: any;
                            request.on('data', function (data) {
                                // console.log(data);
                                if (typeof requestBodyStr !== 'undefined') {
                                    requestBodyStr += data.toString; // 将data的内容拼接大片requestBodyStr
                                    console.log(data);
                                }

                            });
                            request.on('end', function () {
                                response.statusCode = 400;
                                response.end("error");
                                
                                    const user = JSON.parse(requestBodyStr);
                                    users.push(user);
                                    response.statusCode = 200;
                                    response.end(JSON.stringify(user));
                              
                                    response.statusCode = 400;
                                    response.end('Error');
                               

                                // console.log(datacount);
                                // response.end(datacount + '');
                            });
                            break;
                        }

                    default:
                        response.statusCode = 404;
                        response.end("NOT FOUND");
                }
                break;
            case '/text.html':
            response.statusCode = 200;
            fs.createReadStream('./text.html').pipe(response);
            break;
            default:
                response.statusCode = 404;
                response.end("NOT FOUND");
        }
    } else {
        response.statusCode = 404;
        response.end("NOT FOUND");
    }

});



// server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
//     let url = request.url;
//     console.log(url);
//     let responsestr: any;
//     // 要对不同的query进行判断
//     if (typeof url !== 'undefined'){
//         let quertstr = url.substr(url.indexOf('?') + 1, url.length);
//         let query = qs.parse(quertstr);
//         console.log(query);

//         if (url.indexOf('/hello') > -1){
//             if (query.i_would_like_to_order = 'true' && query.budget < 500){
//                 responsestr = 'You could try our discount meal!';
//             } else {
//                 responsestr = 'How about some crawfish?';
//             }
//         } else if (url.indexOf('/bye') > -1){
//             responsestr = 'See you next time and hope you have a great day!';
//         } else {
//             response.statusCode = 404;
//             response.end('NOT FOUND');
//         }
//     } else {
//         response.statusCode = 400;
//         response.end('error');
//     }
//     response.statusCode = 200;
//     response.end(responsestr);
// });