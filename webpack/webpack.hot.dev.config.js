var webpack = require('webpack');
var path = require('path');
var root = path.resolve(__dirname, '../');

module.exports = {
  devtool: 'cheap',
  entry: {
    Entry: [
      'webpack-dev-server/client?http://localhost:2992',
      'webpack/hot/only-dev-server',
      path.resolve(root, './src/App/Entry')
    ]
  },
  output: {
    path: path.resolve(root, './dist'),
    filename: 'bundle-[name].js',
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
      loaders: ["style", "css", "sass"],
      include: path.resolve(root, 'src')
    }]
  }
};
