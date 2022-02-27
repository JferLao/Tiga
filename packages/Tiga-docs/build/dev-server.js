const ora = require('ora')
const path = require('path')
const chalk = require('chalk')

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('./webpack.dev.config')
const webpackBaseConfig = require('./webpack.base.config')
const webpackConfig = webpackMerge(webpackDevConfig, webpackBaseConfig)
const open = require('./open')
const spinner = ora('项目开始...').start()

const { getProjectRoot, prepareUrls, formatTime } = require('./utils')
const outputPath = require('./outputPath')
const project = getProjectRoot()
const host = '0.0.0.0'
const port = 8000
const protocol = 'http'
const urls = prepareUrls(protocol, host, port)

const compiler = webpack(webpackConfig)
const webpackDevServerConfig = require('./devServer.config')({
  publicPath: '/',
  contentBase: path.join(project, outputPath.output),
  protocol,
  host,
  url: urls.lanUrlForConfig
})

const server = new WebpackDevServer(compiler, webpackDevServerConfig)
server.listen(port, host, err => {
  if (err) {
    return console.log(err)
  }
})

let isFirstCompile = true


compiler.hooks.invalid.tap('InvalidHook', filepath => {
  console.log(chalk.grey(`[${formatTime()}]修改路径: ${filepath}`))
  spinner.text = '项目运行中...🚀 ~'
  spinner.render()
})

compiler.hooks.done.tap('DoneHook', stats => {
  const { errors, warnings } = formatWebpackMessage(stats.toJson({}, true))
  const isSuccess = !errors.length

  if (errors.length) {
    errors.splice(1)
    spinner.fail(chalk.red('编译失败!\n'))
    console.log(chalk.red(errors.join('\n\n')))
    console.log()
    return
  }

  if (warnings.length && isFirstCompile) {
    spinner.warn(chalk.yellow(`编译错误 \n`))
    console.log(chalk.yellow(`${warnings.join('\n\n')}\n`))
  }

  if (isSuccess) {
    spinner.succeed(chalk.green('编译成功!\n'))
  }

  if (isFirstCompile) {
    console.log(chalk.cyan(`> 正在监听 ${urls.lanUrlForTerminal}`))
    console.log(chalk.cyan(`> 正在监听 ${urls.localUrlForBrowser}`))
    console.log()
    open(urls.localUrlForBrowser)
    isFirstCompile = false
  }
})
