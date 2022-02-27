import toMatchRenderedSnapshot from '../../../tools/matchers/rendered-snapshot'

// 匹配器加到Jest中
expect.extend({
  toMatchRenderedSnapshot
})
