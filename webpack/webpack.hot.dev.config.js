const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname, '../');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    Entry: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:2992',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.resolve(root, './src/App/Entry')
    ]
  },
  output: {
    path: path.resolve(root, './dist'),
    filename: 'bundle-[name].js',
    publicPath: "http://localhost:2992/_assets/"
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    })
],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: path.resolve(root, 'src')
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]&importLoaders=1',
        'postcss-loader'
      ]
    }, {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      include: path.resolve(root, 'src')
    }, {
      test: /\.json$/,
      use: ["json-loader"],
    }]
  },
  node: {
    child_process: 'empty',
    fs: 'empty'
  }
};
