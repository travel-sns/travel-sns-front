const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const ROOT = path.resolve(__dirname, "../");
const APP_DIR = path.resolve(ROOT, "src");
const BUILD_DIR = path.resolve(ROOT, "dist");

const moduleConfig = require("./module.js");
const resolveConfig = require("./resolve.js");

module.exports = {
  entry: {
    app: [APP_DIR + "/index.js"]
  },
  module: moduleConfig,
  resolve: resolveConfig,
  plugins: [
    //creation of HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    })
  ]
};
