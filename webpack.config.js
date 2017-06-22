const readFileSync = require('fs').readFileSync;
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [
  // this gives the compiled codebase access to process.env.NODE_ENV
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new ExtractTextPlugin('main.css')
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false
    })
  );
}

// if (ENV === 'production') {
//   plugins = Array.prototype.concat(plugins.slice(0, 1), [new webpack.optimize.UglifyJsPlugin({
//     sourceMap: false,
//     comments: false
//   })], plugins.slice(1))
// }

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/index.js', './src/main.scss']
  },
  resolve: {
    extensions: ['.js', '.html']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    chunkFilename: '[name].[id].js'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.(html|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['latest']
          }
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  devtool: 'inline-source-map'
};
