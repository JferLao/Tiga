const ora = require('ora')
const fs = require('fs-extra')
const path = require('path')

const spinner = ora('文档构建已启动,正在复制Demo到当前页面')

spinner.start()

fs.emptyDirSync(path.resolve(__dirname, '../dist/h5'))

fs.copy(
  path.resolve(__dirname, '../../tiga-demo/dist'),
  path.resolve(__dirname, '../dist')
)
  .then(() => {
    spinner.stop()
  })
  .catch(err => console.error(err))

spinner.stop()
