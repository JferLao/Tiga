import Taro from '@tarojs/taro'
import Index from './pages/index/index'
import React from 'react'

import './app.scss'

class App extends React.Component {
  config: Taro.Config = {
    pages: ['pages/basic/button/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
