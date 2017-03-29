module.exports = {
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'env': {
    'browser': true,
    'node': true,
    'jquery': true,
  },
  'plugins': [
    'react',
  ],
  parser: 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true,
    },
  },
};
