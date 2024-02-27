const { merge } = require('webpack-merge')
const common = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const path = require('path')

const resolve = (dir) => path.join(__dirname, '..', dir)
const isProduction = process.env.NODE_ENV === 'production'

module.exports = function (env, argv) {
  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:10].css',
        chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
      }),
    ],
    output: {
      path: resolve('dist'),
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[hash].js',
      clean: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vue: {
            test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
            name: 'vue-chunk',
            priority: 40,
          },
          elementPlus: {
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            name: 'elementPlus-chunk',
            priority: 30,
          },
          libs: {
            test: /[\\/]node_modules[\\/]/,
            name: 'libs-chunk',
            priority: 20,
          },
        },
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}.js`,
      },
      minimize: isProduction,
      minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
    },
  })
}
