const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const rimraf = require('rimraf')

const Mocha = require('mocha')
const mocha = new Mocha({
  timeout: '10000ms'
})

const webpackProdConfig = require('../build/webpack.prod.config')
const webpackBaseConfig = require('../build/webpack.base.config')
const webpackConfig = webpackMerge(webpackProdConfig, webpackBaseConfig)

// const htmlTestFile = require('../test/html-test')
// const cssJsTestFile = require('../test/css-js-test')

// process.chdir(path.join(__dirname,'test'))

rimraf('./dist', () => {
  webpack(webpackConfig, (err, status) => {
    if (err) {
      console.log(err)
      process.exit(2)
    }
    console.log(
      status.toString({
        colors: true,
        modules: false,
        children: false
      })
    )

    console.log('Webpack build success, begin run test.')

    mocha.addFile(path.join(__dirname, 'html-test.js'))
    mocha.addFile(path.join(__dirname, 'css-js-test.js'))
    mocha.run()
  })
})
