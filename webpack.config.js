const path = require('path');

const mode = process.env.mode || 'development';

let outputPath = path.resolve(__dirname, 'dist');
let library = 'utc-date';
let libraryTarget = 'umd';

if(process.env.envType === 'browser') {
  outputPath = path.resolve(__dirname, 'browser-dist');
  libraryTarget = 'global';
  library = 'UTCDate';
}


module.exports = {
  entry: './src/index.js',
  mode,
  output: {
    filename: 'index.js',
    path: outputPath,
    libraryTarget,
    library,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
