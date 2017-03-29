const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname, '../');
const dist = path.resolve(root, './dist');
const bundleServer = {
  host: 'http://localhost',
  port: 2992,
  pathName: '_assets/',
};

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    Entry: [
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-dev-server/client?${bundleServer.host}:${bundleServer.port}`,
      'webpack/hot/only-dev-server',
      path.resolve(root, './src/App/Entry'),
    ],
  },
  devServer: {
    port: 2992,
    compress: true,
    contentBase: dist,
    headers: { 'Access-Control-Allow-Origin': '*' },
    publicPath: `${bundleServer.host}:${bundleServer.port}/${bundleServer.pathName}`,
    stats: true,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: `${bundleServer.host}:${bundleServer.port}/${bundleServer.pathName}`,
    filename: 'bundle-[name].js',
    path: dist,
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
    }),
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
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]&importLoaders=1',
          'postcss-loader',
        ],
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
            limit: 4096,
          },
        },
      }],
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
  },
};
