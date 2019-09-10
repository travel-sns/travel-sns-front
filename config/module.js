const path = require('path');
const ROOT = path.resolve(__dirname, '../');
const APP_DIR = path.resolve(ROOT, 'src');
const BUILD_DIR = path.resolve(ROOT, 'dist');

module.exports = {
  rules: [{
      test: /\.(js|jsx)$/,
      exclude: "/node_modules",
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              context: APP_DIR,
            }
          }
        },
        'postcss-loader'
      ]
    }
  ]
}
