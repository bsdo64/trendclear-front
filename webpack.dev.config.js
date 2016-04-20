
var webpack = require('webpack');

var buildEntryPoint = function(entryPoint){
  return [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    entryPoint
  ]
};

var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:2992',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "http://localhost:2992/_assets/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};

