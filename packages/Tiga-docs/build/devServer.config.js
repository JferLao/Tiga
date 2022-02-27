module.exports = function ({ publicPath, contentBase, protocol, host, url }) {
  return {
    // 启用压缩
    compress: true,
    // 忽略打印信息
    clientLogLevel: 'none',
    // 提供内容路径
    contentBase,
    // 请求头
    // headers: {
    //   "x-route-tags": "test"
    // }
    // 开启热更新
    hot: true,
    host,
    https: protocol === 'https',
    // 任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: {
      disableDotRule: true
    },
    // 实时重载的脚本被插入到包
    inline: true,
    publicPath,
    public: url,
    // webpack 的错误或警告在控制台不可见
    quiet: true,
    // stats: "errors-only",
    watchOptions: {
      ignored: /node_modules/
    }
    // overlay: true,
  }
}
