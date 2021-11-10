// 部分库有esm问题 ---- SyntaxError: Unexpected token 'export',需要放置到这里
const transformIgnorePatterns = ['<rootDir>/node_modules/']

module.exports = {
  // 指示是否应在运行期间报告每个测试
  verbose: true,
  // 每次测试之前运行一些代码配置，或者环境变量
  setupFiles: ['./test/setup.js'],
  // 每次测试之后运行运行代码，或者环境变量
  setupFilesAfterEnv: ['./test/setupAfterEnv.ts'],
  // 模块文件扩展
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  // 模块名映射
  moduleNameMapper: {
    '@tarojs/components': '@tarojs/components/dist-h5/react',
  },
  // 测试路径匹配模式
  testPathIgnorePatterns: ['/node_modules/'],
  // 转换器
  // JEST现在暂不支持ESM，需要babel或者写loader支持
  transform: {
    '\\.(tsx|ts)?$': '../../tools/preprocessor/codePreprocessor.js',
    '\\.(m?)js?$': '../../tools/preprocessor/codePreprocessor.js'
  },
  //  正则匹配测试
  testRegex: '.*\\.test\\.(j|t)sx?$',
  // 转换器要忽略的路径(使用正则匹配)
  transformIgnorePatterns,
  // 从哪里收集测试覆盖率
  collectCoverageFrom: ['src/components/**/*.{ts,tsx}'],
  // snapshot 序列化
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // globals: {
  //   'ts-jest': {
  //     tsConfig: './tsconfig.json'
  //   }
  // },
  // jsdom 环境测试地址, 反应在 location.herf 属性上
  testURL: 'http://localhost'
}
