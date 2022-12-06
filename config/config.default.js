// 默认配置文件
module.exports = {
    dbUri: 'mongodb://127.0.0.1:27017',
    baseURL : 'https://echarts.apache.org/examples',//测试环境
    dev:{
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            "/api": {
              target: "https://echarts.apache.org/examples", //设置你调用的接口域名和端口号
              changeOrigin: true, //跨域
              pathRewrite: {
                "^/api": "" 
              }
            }
        },
    }
}