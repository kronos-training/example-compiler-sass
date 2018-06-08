const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  target: 'web',
  entry: {
    theme: './styles/main.scss'
  },
  output: {
    filename: '[name].css',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};

module.exports = config;