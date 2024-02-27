const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolve = (dir) => path.join(__dirname, '..', dir)

const isProduction = process.env.NODE_ENV === 'production'

const getStyleLoaders = (pre) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
    pre && {
      loader: pre,
      options:
        pre === 'sass-loader'
          ? {
              additionalData: ``, // 在这里引入全局变量
            }
          : {},
    },
  ].filter(Boolean)
}

/** @type {import('webpack').Configuration} */
const config = {
  entry: { app: resolve('src/index.ts') },

  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    alias: {
      '@': resolve('src'),
    },
  },

  module: {
    rules: [
      // vue
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              // 开启缓存
              cacheDirectory: path.resolve(
                __dirname,
                '../node_modules/.cache/vue-loader',
              ),
            },
          },
        ],
        include: /(src)/,
      },
      // 脚本
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      // 样式图片文字其余资源
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'images/[base]',
        },
        exclude: [resolve('src/assets/svg')],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'files/[base]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[base]',
        },
      },
    ],
  },

  // 缓存
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename], // 针对构建的额外代码依赖的数组对象。webpack 将使用这些项和所有依赖项的哈希值来使文件系统缓存失效。
    },
    cacheDirectory: resolve('temp_cache'),
    name: 'scf-cache', // 路径temp_cache/scf-cache
    compression: 'gzip',
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, './src'),
      exclude: 'node_modules',
      extensions: ['js', 'ts', 'json'],
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        './node_modules/.cache/.eslintcache',
      ),
      failOnError: true,
      failOnWarning: false,
      emitWarning: false,
    }),

    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      inject: true,
    }),
  ],

  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    hot: true,
    compress: true,
  },
}

module.exports = config
