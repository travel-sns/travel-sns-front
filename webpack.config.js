const merge = require("webpack-merge");
const common = require("./config/webpack.config.common.js");
const dev = require("./config/webpack.config.dev.js");
const prod = require("./config//webpack.config.prod.js");

module.exports = (env, options) => {
  if (options.mode === "development") {
    return merge(common, dev);
  }
  if (options.mode === "production") {
    return merge(common, prod);
  }
};
