'use strict'
const resolve = require('path').resolve
const webpack = require('webpack')
// const NpmInstallPlugin = require('npm-install-webpack-plugin')
const NotifierPlugin = require('webpack-notifier')

module.exports = {

  target: 'node',
  // target: 'electron',

  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/webpack/issues/1599
  node: {
    __dirname: false,
    __filename: false,
  },

  // context: __dirname,

  entry: {
    'main.js': './src/main.js',
    'preload.js': './src/preload.js',
    // 'test.js': './test/index.js',
  },

  output: {
    pathinfo: true,
    path: 'dist',
    filename: '[name]',
  },

  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'raw' },
    ],
  },

  resolve: {
    extensions: ['', '.js'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  externals: [
    (ctx, req,  cb) => {
      // if (resolve(ctx, req).indexOf(srcDir) !== 0) return cb()
      if (/^\.\.?\//.test(req)) return cb()
      cb(null, `commonjs ${req}`)
    },
  ],

  plugins: [
    // new NpmInstallPlugin({ save: true }),
    new NotifierPlugin({ alwaysNotify: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'bluebird',
    }),
    new webpack.DefinePlugin({
      // rootDir: `"${resolve(__dirname, '..')}"`,
      // $dirname: '__dirname',
    }),
  ],
}
