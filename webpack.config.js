const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',

  entry: path.resolve(src, 'index.tsx'),

  output: {
    path: dist,
    filename: 'bundle.[hash].js'
  },

  resolve: {
    extensions: ['.js', '.mjs', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: path.resolve(src, 'index.html'),
      minify: isProduction
    })
  ]
}