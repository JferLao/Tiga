const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackProd = require('./webpack.prod.config')
const webpackBase = require('./webpack.base.config')
const { printBuildError } = require('./utils')
const formatWebpackMessage = require('./format_webpack_message')

const snapper = ora('--------- 开始构建文档 --------- \n').start()

const currentWebpack = webpackMerge(webpackProd, webpackBase)
const webpackCompiler = webpack(currentWebpack)
webpackCompiler.run((err, stats) => {
  if (err) {
    return printBuildError(err)
  }

  const { errors, warnings } = formatWebpackMessage(stats.toJson({}, true))

  const isSuccess = !errors.length && !warnings.length

  if (isSuccess) {
    snapper.succeed(chalk.green('编译成功!!\n'))
    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })}\n`
    )
    return
  }

  if (errors.length) {
    errors.splice(1)
    snapper.fail(chalk.red('编译失败!!\n'))
    return printBuildError(new Error(errors.join('\n\n')))
  }
  if (warnings.length) {
    snapper.warn(chalk.yellow('编译警告!!.\n'))
    console.log(warnings.join('\n\n'))
  }
})

snapper.stop()
