module.exports = {
  /**
   * @desc -  Babel 配置中的一个选项，它指示 Babel 解析器在解析代码时尝试确定代码模块的类型。这个选项通常用于配置 Babel 解析器如何处理模块的类型，尤其是在处理 JavaScript 模块时。

   * - 具体来说，sourceType: 'unambiguous' 的意思是让 Babel 解析器尝试自动检测代码模块的类型，即不做任何假设，而是根据代码的内容来判断它是 ES6 模块还是 CommonJS 模块。

   * 当 Babel 解析器设置为 'unambiguous' 时，它将根据代码中的 import 和 export 声明来确定代码模块的类型。如果代码中包含了 ES6 的 import 和 export 声明，那么 Babel 会将代码解析为 ES6 模块；如果没有这些声明，它将解析为 CommonJS 模块
   */
  sourceType: 'unambiguous',
  // 智能预设：能够编译ES6语法
  presets: [['@babel/preset-env']],
  // 关于此处的解释： https://zhuanlan.zhihu.com/p/147083132
  // 官方：https://babeljs.io/blog/2019/03/19/7.4.0
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    ['@vue/babel-plugin-jsx'],
  ],
}
