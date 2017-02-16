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
      test: /\.woff2?$/,
      // Inline small woff files and output them below font/.
      // Set mimetype just in case.
      use: {
        loader: 'url-loader',
        options: {
          name: 'fonts/[hash].[ext]',
          limit: 50000,
          mimetype: 'application/font-woff',
        }
      }
    }, {
      test: /\.(ttf|svg|eot)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
        },
      }
    }, {
      test: /\.(png|jpg|wav|mp3)$/,
      include: [
        path.resolve(root, 'src/images')
      ],
      use: {
        loader: 'url-loader',
        options: {
          limit: 4096,
        }
      }
    }],
  },
  node: {
    child_process: 'empty',
    fs: 'empty'
  }
};
