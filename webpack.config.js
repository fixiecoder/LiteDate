const path = require('path');

const mode = process.env.mode || 'development';

module.exports = {
  entry: './src/index.js',
  mode,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'lite-date',
    libraryTarget: 'umd',
  }
};