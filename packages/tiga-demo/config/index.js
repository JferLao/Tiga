/* eslint-disable import/no-commonjs */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isBuildComponent = process.env.TARO_BUILD_TYPE === 'component'

const config = {
  projectName: 'tiga-ui',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: isBuildComponent ? 'dist' : `dist/${process.env.TARO_ENV}`,
  plugins: [],
  babel: {
    sourceMap: true,
    presets: ['env'],
    plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']
  },
  framework: 'react',
  defineConstants: {},
  alias: {
    'tiga-ui': path.resolve(__dirname, '../../tiga-ui/src/index.ts')
  },
  mini: {},
  h5: {
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true
      }
    },
    publicPath: './'
  }
}

if (isBuildComponent) {
  Object.assign(config.h5, {
    enableSourceMap: false,
    enableExtract: false,
    enableDll: false
  })
  config.h5.webpackChain = chain => {
    chain.plugins.delete('htmlWebpackPlugin')
    chain.plugins.delete('addAssetHtmlWebpackPlugin')
    chain.merge({
      output: {
        path: path.join(process.cwd(), 'dist', 'h5'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'tiga-ui'
      },
      externals: {
        classnames: 'commonjs2 classnames',
        '@tarojs/components': 'commonjs2 @tarojs/components',
        '@tarojs/taro-h5': 'commonjs2 @tarojs/taro-h5'
      },
      plugin: {
        extractCSS: {
          plugin: MiniCssExtractPlugin,
          args: [
            {
              filename: 'css/index.css',
              chunkFilename: 'css/[id].css'
            }
          ]
        }
      }
    })
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
