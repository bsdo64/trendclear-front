const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    Entry: [
      'babel-polyfill',
      path.resolve(root, './src/App/Entry')
    ]
  },
  output: {
    path: path.resolve(root, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    }),
    new ExtractTextWebpackPlugin('styles.css')
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: path.resolve(root, 'src')
    }, {
      test: /\.css$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: "style-loader",
        use: [
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]&importLoaders=1',
          'postcss-loader'
        ]
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "postcss-loader", "sass-loader"],
      }),
      include: path.resolve(root, 'src')
    }, {
      test: /\.json$/,
      use: ["json-loader"],
    }]
  }
};
