const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
module.exports = {
  lintOnSave: false,
  publicPath: './',
  // outputDir: 'dist',
  // publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
          }),
        ],
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 8071,
    open: true,
    proxy: {
      '/api': {  //代理地址
        target: 'http://127.0.0.1:8082/  ',  //需要代理的地址
        changeOrigin: true,  //是否跨域
        secure: false,
        pathRewrite: {
          '^/api': '/',   //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
        },
      },
    },
  },
}
