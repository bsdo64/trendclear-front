var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var root = path.resolve(__dirname, '../');

var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-source-map',
  debug: true,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.resolve(root, 'src')
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "postcss", "sass"],
      include: path.resolve(root, 'src')
    }, {
      test: /\.json$/,
      loaders: ["json"],
    }]
  },
  node: {
    child_process: 'empty',
    fs: 'empty'
  },
  postcss: function () { return [ autoprefixer ] }
};
