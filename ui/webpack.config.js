// webpack configuration for css: https://www.youtube.com/watch?v=rrMGUnBmjwQ
const path = require('path');
// const webpack = require('webpack');
// require('dotenv').config();

module.exports = {
  mode: 'development',
  entry: { app: ['./src/App.jsx'] },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     __UI_API_ENDPOINT__: `'${process.env.UI_API_ENDPOINT}'`,
  //   })
  // ],
  devtool: 'source-map',
};
