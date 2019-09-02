const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const APP_DIR = path.resolve(ROOT, 'src');
const BUILD_DIR = path.resolve(ROOT, 'dist');

const moduleConfig = require('./module.js');

module.exports = {
  entry: {
    app: [APP_DIR + '/index.js']
  },
  output: {
    filename: '[id].[hash].js',
    chunkFilename: '[id].[hash].js',
    path: BUILD_DIR,
    publicPath: '/'
  },
  module: moduleConfig,
  resolve: {
    alias: {
      'Src': APP_DIR,
      'Style': APP_DIR + '/assets/style'
    },
    extensions: ['*', '.js', '.json']
  },
  plugins: [
    //creation of HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ]
}
