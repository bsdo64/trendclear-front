var webpack = require('webpack');
var path = require('path');
var root = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    Entry: [
      path.resolve(root, './src/App/Entry')
    ]
  },
  output: {
    path: path.resolve(root, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.resolve(root, 'src')
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"],
      include: path.resolve(root, 'src')
    }]
  }
};
