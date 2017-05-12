const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    Entry: [
      'babel-polyfill',
      path.resolve(root, './src/App/Entry'),
    ],
  },
  output: {
    path: path.resolve(root, './dist'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
    }),
    new ExtractTextWebpackPlugin('styles.css'),
  ],
  resolve: {
    alias: {
      '~': path.resolve(root, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.resolve(root, 'src'),
      }, {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&localIdentName=[hash:base64:8]&importLoaders=1',
            'postcss-loader',
          ],
        }),
      }, {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
        include: path.resolve(root, 'src'),
      }, {
        test: /\.woff2?$/,
        // Inline small woff files and output them below font/.
        // Set mimetype just in case.
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 50000,
            mimetype: 'application/font-woff',
          },
        },
      }, {
        test: /\.(ttf|svg|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
          },
        },
      }, {
        test: /\.(png|jpg|wav|mp3)$/,
        include: [
          path.resolve(root, 'src/App/images'),
        ],
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash:base64:12].[ext]',
            limit: 4096,
          },
        },
      }],
  },
};
