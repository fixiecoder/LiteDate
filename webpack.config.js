const path = require('path');

const mode = process.env.mode || 'development';

module.exports = {
  entry: './src/index.js',
  mode,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'utc-date',
    libraryTarget: 'umd',
  }
};
