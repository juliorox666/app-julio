const path = require("path");

module.exports = {
  lintOnSave: false,
  baseUrl: process.env.NODE_ENV === 'production' ? "./" : "/",
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
    }
  }
}
