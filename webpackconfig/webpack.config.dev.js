const webpack = require('webpack');

const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const APP_DIR = path.resolve(ROOT, 'src');
const BUILD_DIR = path.resolve(ROOT, 'dist');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    //By default this is localhost
    host: 'localhost',
    //Enable webpack's Hot Module Replacement
    hot: true,
    //Tell the server where to serve content from
    contentBase: BUILD_DIR,
    // This option allows you to whitelist services that are allowed to access the dev server.
    allowedHosts: ['host.com'],
    //When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses
    historyApiFallback: true,
    //Shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
