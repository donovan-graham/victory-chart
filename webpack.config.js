var path = require('path');
var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'dist');

module.exports = {
  context: srcPath,
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  // entry: path.join(srcPath, 'js', 'client.js'),
  entry: path.join(srcPath, 'js', 'repayment.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};
