const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

 module.exports = {
  devtool: 'inline-source-map',
  entry: './src/app.js',
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        }
      ]
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loaders: ['ngtemplate-loader', 'html-loader']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader'
      })
    }]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/mockups',
      to: 'mockups'
    }]),
    new ExtractTextPlugin('main.css')
  ]
};
