var webpack = require('webpack');
var path = require('path');
var root = path.resolve(__dirname, '../');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:2992',
    'webpack/hot/only-dev-server',
    path.resolve(root, './src/index')
  ],
  output: {
    path: path.resolve(root, 'dist'),
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
      include: path.resolve(root, 'src')
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  }
};
