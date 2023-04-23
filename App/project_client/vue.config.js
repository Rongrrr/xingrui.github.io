const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  outputDir: "docs",
  assetsDir: "assets",
  productionSourceMap: true,
  runtimeCompiler: true,
  transpileDependencies: false,
  lintOnSave: false,

  parallel: require("os").cpus().length > 1,
  pluginOptions: {},

  devServer: {
    open: true,
    host: "localhost",
    port: 8081,
    https: false,
    
    proxy: {
      '/api': {
        target: 'http://localhost:5000/api/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },

    }
  }

})
