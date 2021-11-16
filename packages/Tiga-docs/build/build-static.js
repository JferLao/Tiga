const ora = require('ora')
const fs = require('fs-extra')
const path = require('path')

const spinner = ora('文档构建已启动！')

spinner.start()

fs.emptyDirSync(path.resolve(__dirname, '../docs/h5'))

fs.copy(
  path.resolve(__dirname, '../dist/h5'),
  path.resolve(__dirname, '../docs/h5')
)
  .then(() => {
    spinner.stop()
  })
  .catch(err => console.error(err))

spinner.stop()
