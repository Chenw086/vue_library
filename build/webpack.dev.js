const { merge } = require('webpack-merge')
const common = require('./webpack.base.js')
const path = require('path')
const resolve = (dir) => path.join(__dirname, '..', dir)
const devWebpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [],
  },
  output: {
    path: undefined,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/',
    clean: true,
  },
  // 日志打印只打印错误和警告
  stats: 'errors-warnings',
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      progress: true, // 将运行进度输出到控制台。
      overlay: { warnings: false, errors: true }, // 全屏显示错误信息
    },
  },

  // 定义内部变量，不然会报错
  plugins: [],
})

module.exports = devWebpackConfig
