module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "env": {
    "browser": true,
    "node": true,
    "jquery": true,
  },
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    'object-curly-spacing': ["error", "always"]
  }
};