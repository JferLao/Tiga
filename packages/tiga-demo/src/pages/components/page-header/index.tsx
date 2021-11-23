import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'

import './index.scss'

export interface PageHeaderProps {
  title?: string
}

export default class PageHeader extends Component<PageHeaderProps> {
  public static defaultProps: PageHeaderProps
  public static propTypes: InferProps<PageHeaderProps>

  public render(): JSX.Element {
    const { title } = this.props

    return (
      <View className='page-header'>
        <View className='page-header__title'>{title}</View>
      </View>
    )
  }
}

PageHeader.defaultProps = {
  title: '标题'
}

PageHeader.propTypes = {
  title: PropTypes.string
}
