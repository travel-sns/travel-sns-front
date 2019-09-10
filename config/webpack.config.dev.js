const webpack = require("webpack");
const path = require("path");
const ROOT = path.resolve(__dirname, "../");
const APP_DIR = path.resolve(ROOT, "src");
const BUILD_DIR = path.resolve(ROOT, "dist");

module.exports = {
  mode: "development",
  //https://webpack.js.org/configuration/devtool/#devtool
  devtool: "cheap-module-source-map", //디버깅용
  output: {
    filename: "[name].[hash].js",
    path: BUILD_DIR,
    publicPath: "/",
    pathinfo: true
  },
  devServer: {
    index: "index.html",
    host: "localhost", //By default this is localhost
    port: 8080,
    hot: true, //Enable webpack's Hot Module Replacement
    compress: true,
    contentBase: path.join(ROOT, "public"), //Tell the server where to serve content from, path.join(__dirname, 'public')
    allowedHosts: ["host.com"], // This option allows you to whitelist services that are allowed to access the dev server.
    historyApiFallback: true, //When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses
    overlay: true, //Shows a full-screen overlay in the browser when there are compiler errors or warnings
    clientLogLevel: "warning", //may be too verbose, you can turn logging off by setting it to 'silent'
    disableHostCheck: false, //When set to true this option bypasses host checking
    openPage: "travel-sns-front" //Specify a page to navigate to when opening the browser
    // proxy: {
    //   "/api": {
    //     target: "https://other-server.example.com",
    //     secure: false //A backend server running on HTTPS
    //   }
    // }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
