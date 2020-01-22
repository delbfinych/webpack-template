const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const PATHS = {
  src: path.join(__dirname, '..', 'src'),
  dist: path.join(__dirname, '..', 'dist'),
  static: 'static',
};
const PAGES_DIR = path.join(PATHS.src, 'pages');

module.exports = {
  externals: { paths: PATHS },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: path.join(PATHS.static, 'js', '[name].[chunkhash].js'),
    path: PATHS.dist,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: `${PATHS.static}/fonts`,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: `${PATHS.static}/media`,
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join(
        `${PATHS.static}`,
        'css',
        '[name].[contenthash].css'
      ),
    }),
    ...fs.readdirSync(PAGES_DIR).map(
      fileName =>
        new HtmlWebpackPlugin({
          filename: `${fileName}.html`,
          template: `${PAGES_DIR}/${fileName}/${fileName}.pug`,
          alwaysWriteToDisk: true,
          inject: 'body',
          hash: true,
        })
    ),
    new FaviconsWebpackPlugin({
      logo: `${PATHS.src}/theme/favicon.ico`,
      prefix: 'static/',
    }),
  ],
  resolve: {
    alias: {
      // put your aliases here
    },
  },
};
