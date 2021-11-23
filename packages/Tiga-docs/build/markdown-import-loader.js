const highlight = require('highlight.js')
const { getOptions } = require('loader-utils')
const frontMatter = require('front-matter')
const mdContainer = require('markdown-it-container')
const template = require('./markdown-react-components-template')

const options = {
  className: 'wrap'
}

let md = require('markdown-it')({
  html: true, // 在源码中启用 HTML 标签
  xhtmlOut: true, // 使用 '/' 来闭合单标签 （比如 <br />）。
  typographer: false, //启用一些语言中立的替换 + 引号美化
  linkify: false // 将类似 URL 的文本自动转换为链接。
})
  .enable(['smartquotes'])
  .set({
    highlight(content, languageHint) {
      highlight.configure({
        // 用来替换TAB字符串的字符
        tabReplace: '   ',
        // 一个开关选项。用来生成<br>取代新一行的字符，当代码使用非<pre>包裹时非常实用
        useBR: true
        // 一个载入类名前面的字符串标记，为了兼容样式表
        // classPrefix
      })

      let highlightContent
      if (languageHint && highlight.getLanguage(languageHint)) {
        try {
          highlightContent = highlight.highlight(languageHint, content).value
        } catch (err) {
          console.log(err)
        }
      }
      if (!languageHint) {
        try {
        } catch (err) {
          highlightContent = highlight.highlightAuto(content).value
        }
      }
      // 把代码中的{}转
      highlightContent = highlightContent.replace(
        /[{}]/g,
        match => `{'${match}'}`
      )

      // 加上 hljs
      highlightContent = highlightContent
        .replace('<code class="', '<code class="hljs ')
        .replace('<code>', '<code class="hljs">')

      return highlight.fixMarkup(highlightContent)
    }
  })

const formatOpening = () => `
  <div className="ti-component__container">
    <div className="ti-component__code">`

const formatClosing = () => `
    </div>
  </div>`

module.exports = source => {
  // 缓存加速
  this.cacheable
  const _options = getOptions(this) || {}

  Object.assign(
    options,
    _options.markdownItReact ? _options.markdownItReact() : {}
  )

  // md转换
  const { body } = frontMatter(source)

  const imports = `import React from 'react';  import copy from 'copy-to-clipboard';`

  const moduleJS = []
  const state = ''
  const standardTag = ':::'
  const matchParamsTag = '````'

  const getTag = obj => {
    return obj.trim().match(/^demo\s*(.*)$/)
  }

  let flag = ''

  md.use(mdContainer, 'demo', {
    validate: params => getTag(params),
    render: (tokens, idx) => {
      // 寻找tag
      const m = getTag(tokens[idx].info)

      // 1 means the tag is opening
      if (tokens[idx].nesting === 1) {
        flag = idx
        let codeText = ''
        let i = 1
        let nextToken = tokens[idx + i]
        while (nextToken.markup !== standardTag) {
          if (nextToken.markup === matchParamsTag) {
            codeText = nextToken.content
          }
          i++
          nextToken = tokens[idx + i]
        }
        return formatOpening(codeText, md.render(m[1]), flag)
      }

      return formatClosing(flag)
    }
  })

  // md 处理过后的字符串含有 class 和 style ，需要再次处理给到react
  // fix: style需要处理
  const content = md
    .render(body)
    .replace(/<hr>/g, '<hr />')
    .replace(/<br>/g, '<br />')
    .replace(/class=/g, 'className=')
    .replace(/style=/g,'styles=')

  const js = moduleJS.join('\n')
  const jsx = content
  
  return template({ imports, js, jsx, state, options })
}
