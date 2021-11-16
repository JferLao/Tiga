const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const FaviconWebpackPlugin = require('favicons-webpack-plugin')

const { getProjectRoot } = require('./utils')

const outputConfig = require('./outputPath')

const projectRoot = getProjectRoot()

module.exports = {
  mode: 'none',
  output: {
    path: path.resolve(projectRoot, outputConfig.output),
    filename: 'js/[name].js',
    chunkFilename: 'chunk/[name].chunk.js',
    publicPath: './'
  },
  resolve: {
    mainFields: ['main']
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        `${path.resolve(projectRoot, outputConfig.output)}/*`,
        `!${path.resolve(projectRoot, outputConfig.output)}/lib/*`
      ]
    }),
    new webpack.DefinePlugin({
      BASE_NAME: `'/tiga-ui'`
    })
    // new FaviconWebpackPlugin({
    //   logo: path.resolve(projectRoot, 'docs/assets/favicon.png'),
    //   prefix: 'favicons/'
    // })
  ]
}
