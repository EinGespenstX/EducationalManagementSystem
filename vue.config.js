module.exports = {
    devServer: {
        https: false,//https:{type:Boolean}
        open: true,//配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://39.105.188.162',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}