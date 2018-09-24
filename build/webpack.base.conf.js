'use strict'
require('babel-polyfill')
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: {
  //   app: './src/main.js',
  //   'babel-polyfill': './src/main.js'
  // },
  entry: ['babel-polyfill', './src/main.js'],
  // entry: {
    // app: './src/main.js'
  // },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: function (modulePath) {
          return /node_modules/.test(modulePath) &&
            !/node_modules\/jsonld/.test(modulePath) &&
            !/node_modules\/rdf-normalize/.test(modulePath) &&
            !/node_modules\/rdf-canonize/.test(modulePath) &&
            !/node_modules\/rdf-ext/.test(modulePath) &&
            !/node_modules\/asyncjoin/.test(modulePath) &&
            !/node_modules\/rdf-dataset-simple/.test(modulePath) &&
            !/node_modules\/rdf-sink/.test(modulePath) &&
            !/node_modules\/sparqlalgebrajs/.test(modulePath) &&
            !/node_modules\/rdf-serializer-jsonld/.test(modulePath) &&
            !/node_modules\/asynciterator-promiseproxy/.test(modulePath) &&
            !/node_modules\/rdf-parser-n3/.test(modulePath) &&
            !/node_modules\/asynciterator-union/.test(modulePath) &&
            !/node_modules\/asyncreiterable/.test(modulePath) &&
            !/node_modules\/rdf-terms/.test(modulePath) &&
            !/node_modules\/sparqljson-parse/.test(modulePath) &&
            !/node_modules\/graphql-to-sparql/.test(modulePath) &&
            !/node_modules\/fetch-sparql-endpoint/.test(modulePath) &&
            !/node_modules\/sparqljson-to-tree/.test(modulePath) &&
            !/node_modules\/node-web-streams/.test(modulePath)
        },
        query: {
          presets:[ 'es2015', 'stage-2' ]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
