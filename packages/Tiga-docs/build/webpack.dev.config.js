const path = require('path')
const webpack = require('webpack')

const { getProjectRoot } = require('./utils')
const outputConfig = require('./outputPath')
const projectRoot = getProjectRoot()
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(projectRoot, outputConfig.output),
    filename: 'js/[name].js',
    chunkFilename: 'chunk/[name].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      BASE_NAME: '`/`'
    })
  ]
}
