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
      "no-unused-vars": 'off'
    },
  };
  