const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const index = new ExtractTextPlugin('index.css');
const violet = new ExtractTextPlugin('violet.css');
const light = new ExtractTextPlugin('light.css');
const dark = new ExtractTextPlugin('dark.css');
const pink = new ExtractTextPlugin('pink.css');
const green = new ExtractTextPlugin('green.css');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-class-properties', 'transform-object-rest-spread'],
          },
        },
      },
      {
        test: /index.scss/,
        use: index.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /violet.scss/,
        use: violet.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /light.scss/,
        use: light.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /dark.scss/,
        use: dark.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /pink.scss/,
        use: pink.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /green.scss/,
        use: green.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    index,
    violet,
    light,
    dark,
    pink,
    green,
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist',
    proxy: [{
      context: ['/api/*'],
      target: 'http://localhost:3000',
    }],
  },
};
