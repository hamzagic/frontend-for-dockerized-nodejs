module.exports = {
    root: true,
    env: {
      browser: true,
    },
    extends: [
      'plugin:vue/recommended',
    ],
    parserOptions: {
      parser: 'babel-eslint',
    },
    rules: {
    //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //   'import/extensions': 'off',
    //   'vue/html-self-closing': 'off',
    //   'no-plusplus': "off",
    //   'import/no-dynamic-require': 'off',
    //   'global-require': 'off',
    //   'no-empty-pattern': 'off',
    //   'no-lonely-if': 'off',
    //   "no-multiple-empty-lines": [2, {"max": 1}],
    //   "no-param-reassign": 0,
      "no-unused-vars": 'off'
    },
  };
  