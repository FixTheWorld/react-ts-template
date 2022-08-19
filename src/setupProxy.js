// 此时的高版本需要拿到原来低版本导出值的子属性  createProxyMiddleware
const proxy = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        proxy.createProxyMiddleware("/ajax", {
            target: "https://i.maoyan.com",//
            changeOrigin: true
        })
    );
    app.use(
        proxy.createProxyMiddleware("/api", {
            target: "http://localhost:5000",//
            changeOrigin: true
        })
    );
};
// 此时就可以打开项目了!!!
