import React from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import PropTypes, { InferProps } from 'prop-types'
import { TiButtonGroupProps } from '../../../types/button'
// import {TiButtonGroupProps} from 'types/button'

export default class TiButtonGroup extends React.Component<TiButtonGroupProps> {
  public static defaultProps: TiButtonGroupProps
  public static propTypes: InferProps<TiButtonGroupProps>
  render() {
    const { buttoSlot, hasPadding, className } = this.props
    const padddingCls = hasPadding ? 'ti-button-group--space' : null
    return (
      <View className={classNames('ti-button-group', padddingCls, className)}>{buttoSlot}</View>
    )
  }
}

TiButtonGroup.defaultProps = {
  hasPadding: true,
  buttoSlot: null
}

TiButtonGroup.propTypes = {
  hasPadding: PropTypes.bool,
  buttoSlot: PropTypes.elementType
}
