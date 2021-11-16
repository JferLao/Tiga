import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { ButtonProps } from '@tarojs/components/types/Button'

import TiComponent from './base'

type TigaButtonProps = Pick<
  ButtonProps,
  | 'formType'
  | 'openType'
  | 'lang'
  | 'sessionFrom'
  | 'sendMessageTitle'
  | 'sendMessagePath'
  | 'sendMessageImg'
  | 'showMessageCard'
  | 'appParameter'
  | 'onContact'
  | 'onGetUserInfo'
  | 'onGetPhoneNumber'
  | 'onOpenSetting'
  | 'onError'
>

export interface TiButtonProps extends TiComponent, TigaButtonProps {
  /**
   * 按钮的大小
   *  @default 'normal'
   */
  size?: 'normal' | 'small' | 'medium'

  /**
   * 按钮的类型
   * 默认无色按钮
   */
  type?: 'primary' | 'info' | 'text'

  /**
   * 圆角
   * @default false
   */
  circle?: boolean

  /**
   * 是否通栏样式（即按钮宽度为屏幕宽度时的样式）
   * @default false
   */
  full?: boolean

  /**
   * 设置按钮的载入状态
   * @default false
   */
  loading?: boolean
  /**
   * 设置按钮为禁用态（不可点击）
   * @default false
   */
  disabled?: boolean

  /**
   * 图标
   */
  icon?: JSX.Element
  /**
   * 点击按钮时触发
   */
  onClick?: CommonEventFunction
}

export interface TiButtonState {
  isWEB: boolean
  isWEAPP: boolean
}

export interface TiButtonGroupProps extends TiComponent {
  /**
   * 是否有间距
   * @default true
   */
  hasPadding?: boolean
  /** 
   * 组合按钮，需要放置TiButton
  */
  buttoSlot: JSX.Element | null
}

declare const TiButton: ComponentClass<TiButtonProps>

export default TiButton
