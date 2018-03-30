const path = require('path');

const mode = process.env.mode || 'development';

let outputPath = path.resolve(__dirname, 'dist');

const config = {
  entry: './src/index.js',
  mode,
  output: {
    filename: 'index.js',
  }
};


if(process.env.envType === 'browser') {
  outputPath = path.resolve(__dirname, 'browser-dist');
} else {
  config.output.library = 'utc-date';
  config.output.libraryTarget = 'umd';
}

config.output.path = outputPath;

module.exports = config;
