module.exports = {
  entry: './public/js/main.js',
  output: {
    path: './.tmp',
    filename: 'main.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
