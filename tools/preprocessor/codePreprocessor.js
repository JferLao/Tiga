const { createTransformer } = require('babel-jest')
const crypto = require('crypto')
const getBabelCommonConfig = require('./getBabelCommonConfig')
const Package = require('../../packages/tiga-ui/package.json')
const libDir = 'components'

/**
 * 重写transform
 * @default canInstrument
 * @default process
 * @default getCacheKey
 */
module.exports = {
  // 默认true
  canInstrument: true,
  process(src, path, config, transformOptions) {
    
    const babelConfig = getBabelCommonConfig()
    // babel的插件
    babelConfig.plugins = [...babelConfig.plugins]

    // 支持转换的类型现在有js/jsx/ts/tsx
    const babelSupport =
      path.endsWith('.ts') ||
      path.endsWith('.tsx') ||
      path.endsWith('.js') ||
      path.endsWith('.jsx')

      // babel-jest需要锁版本， 不能升版本，不然这个方法有异常
    const babelJest = createTransformer(babelConfig)
    const fileName = babelSupport ? path : 'file.js'
    return babelJest.process(src, fileName, config, transformOptions)
  },
  getCacheKey() {
    return crypto
      .createHash('md5')
      .update('\0', 'utf8')
      .update(libDir)
      .update('\0', 'utf8')
      .update(Package.version)
      .digest('hex')
  }
}
