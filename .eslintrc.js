module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/base',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // prettier 的配置： https://juejin.cn/post/6924568874700505102
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  globals: {
    globalThis: 'readonly',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1, // 如果有console，会抛出错误
    'prettier/prettier': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
