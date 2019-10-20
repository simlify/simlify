const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
  devtool: 'source-map',

  entry: [
    'babel-polyfill',
    './main.jsx',
    './assets/scss/main.scss',
  ],

  context: resolve(__dirname, 'app'),

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '',
  },

  devServer: {
    port: 8081,
    historyApiFallback: true,
    proxy: { 
      '/api/*': 'http://localhost:3000/',
      '/socketio/*': {
        target: 'ws://localhost:3000/socketio/',
        ws: true,
      },
    }
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new MiniCssExtractPlugin({ filename: './styles/style.css', ignoreOrder: false }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      app: path.resolve(__dirname, 'app/'),
      assets: path.resolve(__dirname, 'app/assets/'),
      components: path.resolve(__dirname, 'app/components/'),
      config: path.resolve(__dirname, 'app/config/'),
      store: path.resolve(__dirname, 'app/store/'),
      view: path.resolve(__dirname, 'app/view/'),
      helper: path.resolve(__dirname, 'helper/'),
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        include: [
          path.resolve(__dirname, './app'),
          path.resolve(__dirname, './node_modules/@projectstorm'),
        ],
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ["@babel/preset-env","@babel/preset-react"]
        }
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              public: '../',
              hmr: process.env.NODE_ENV === 'development',
              includePaths: ['./node_modules'],
            }
          },
          'css-loader',
          'sass-loader',
        ],
        
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png',
              name: 'images/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      { test: /\.svg$/,
        loader: "babel-loader!svg-react-loader"
      },
    ]
  },
};

module.exports = config;
