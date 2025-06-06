module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:vue/vue3-recommended"
  ],
  "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "plugins": [
      "vue"
  ],
  "rules": {
    "vue/multi-word-component-names": "off",
    "no-unused-vars": 0
  }
};
