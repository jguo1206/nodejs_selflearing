// auth 是用来建权的
module.exports = function auth(request, response, next) {
    console.log(request.query);
    if (request.query.username === 'laoyang') {
        next();
    } else {
        response.end('please go away');
    }
};


