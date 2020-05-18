const { createProxyMiddleware } = require('http-proxy-middleware');

// const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:5000/' });
// //target是要请求服务器的地址

// module.exports=function(app0){
//     app0.use(apiProxy)
// }

module.exports = function (app) {
    app.use("/rest",
        createProxyMiddleware({
            target: 'http://101.133.165.169:5000',
            changeOrigin: true,
            // pathRewrite: {
            //     "^/rest": "/rest"
            // }
        })
    )
}