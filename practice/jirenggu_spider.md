// 爬虫的第一步：对网站的感兴趣的内容的数据结构有一个比较深的了解；
// 数据元 =》资源
// 同一个资源如何展示；如何以一个合理的形式构建一个爬虫系统？
// 
1）规整化不同网页的资源 class定义不同类型的网站的resource 
2）建立一个spider——protocal，里面定义每一个spider应该实现什么（class basespider)
3) class spider中的方法： getuuid/getcontent/activate spider/ get resource....