// webpack configuration for css: https://www.youtube.com/watch?v=rrMGUnBmjwQ
const path = require('path');
// const webpack = require('webpack');
// require('dotenv').config();

module.exports = {
  mode: 'development',
  // entry: { app: ['./src/App.jsx'] },
  entry: { app: ['./src/index.js'] },
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
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'img',
          },
        },
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
