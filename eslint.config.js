import uniHelper from '@uni-helper/eslint-config'

export default uniHelper({
  rules: {
    // 禁用 antfu/top-level-function 规则，允许使用箭头函数
    'antfu/top-level-function': 'off',

    // 允许 console.log 用于调试
    'no-console': 'off',

    // Vue相关规则调整
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',

    // 其他可能需要的自定义规则
    'prefer-const': 'warn', // prefer-const 警告而不是错误
  },
})
