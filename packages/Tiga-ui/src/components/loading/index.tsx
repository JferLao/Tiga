import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { View } from '@tarojs/components'
import { pxTransform } from '../../utils'

interface TiLoadingProps {
  size?: string | number
  color?: string | number
}

export default class TiLoading extends React.Component<TiLoadingProps> {
  public static defaultProps: TiLoadingProps
  public static propTypes: InferProps<TiLoadingProps>

  public render(): JSX.Element {
    const { color, size } = this.props
    const loadingSize = typeof size === 'string' ? size : String(size)
    const sizeStyle = {
      width: size ? `${pxTransform(parseInt(loadingSize))}` : '',
      height: size ? `${pxTransform(parseInt(loadingSize))}` : ''
    }
    const colorStyle = {
      border: color ? `1px solid ${color}` : '',
      borderColor: color ? `${color} transparent transparent transparent` : ''
    }
    const ringStyle = Object.assign({}, colorStyle, sizeStyle)

    return (
      <View className='ti-loading' style={sizeStyle}>
        <View className='ti-loading__ring' style={ringStyle}></View>
        <View className='ti-loading__ring' style={ringStyle}></View>
        <View className='ti-loading__ring' style={ringStyle}></View>
      </View>
    )
  }
}

TiLoading.defaultProps = {
  size: 0,
  color: ''
}

TiLoading.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}