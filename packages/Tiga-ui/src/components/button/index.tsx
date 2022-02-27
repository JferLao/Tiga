import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { TiButtonProps, TiButtonState } from '../../../types/button'
import { BaseEventOrig, Button, CommonEvent, Form, View } from '@tarojs/components'
import { ButtonProps } from '@tarojs/components/types/Button'
import classNames from 'classnames'
import TiLoading from '../loading'

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small',
  medium: 'medium'
}

const TYPE_CLASS = {
  primary: 'primary',
  info: 'info',
  text: 'text'
}
class TiButton extends Component<TiButtonProps, TiButtonState> {
  static defaultProps: TiButtonProps
  static propTypes: InferProps<TiButtonProps>

  constructor(props: TiButtonProps) {
    super(props)
    this.state = {
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP
    }
  }

  private onClick = (event: CommonEvent): void => {
    if (!this.props.disabled) {
      this.props?.onClick?.(event)
    }
  }

  private onGetUserInfo = (event: CommonEvent): void => {
    this.props?.onGetUserInfo?.(event)
  }

  private onContact = (event: BaseEventOrig<ButtonProps.onContactEventDetail>): void => {
    this.props?.onContact?.(event)
  }

  private onGetPhoneNumber = (event: CommonEvent): void => {
    this.props?.onGetPhoneNumber?.(event)
  }

  private onError = (event: CommonEvent): void => {
    this.props?.onError?.(event)
  }

  private onOpenSetting = (event: CommonEvent): void => {
    this.props?.onOpenSetting?.(event)
  }

  private onSumit = (event: CommonEvent): void => {
    if (this.state.isWEAPP || this.state.isWEB) {
      // TODO: 3.0 this.$scope
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.$scope.triggerEvent('submit', event.detail, {
        bubbles: true,
        composed: true
      })
    }
  }

  private onReset = (event: CommonEvent): void => {
    if (this.state.isWEAPP || this.state.isWEB) {
      // TODO: 3.0 this.$scope
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.$scope.triggerEvent('reset', event.detail, {
        bubbles: true,
        composed: true
      })
    }
  }

  render(): JSX.Element {
    const {
      size = 'normal',
      type = '',
      circle,
      full,
      icon,
      loading,
      disabled,
      customStyle,
      formType,
      openType,
      lang,
      sessionFrom,
      sendMessageTitle,
      sendMessagePath,
      sendMessageImg,
      showMessageCard,
      appParameter
    } = this.props
    const { isWEAPP, isWEB } = this.state
    const rootClassName = ['ti-button']
    const classObject = {
      [`ti-button--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
      'ti-button--disabled': disabled,
      [`ti-button--${type}`]: TYPE_CLASS[type],
      'ti-button--circle': circle,
      'ti-button--full': full
    }
    const loadingColor = type === 'primary' ? '#fff' : ''
    const loadingSize = size === 'small' ? '30' : 0

    let loadingComponent: JSX.Element | null = null
    if (loading) {
      loadingComponent = (
        <View className='ti-button__icon'>
          <TiLoading color={loadingColor} size={loadingSize} />
        </View>
      )
      rootClassName.push('ti-button--icon')
    }

    let iconComponent: JSX.Element | null = null
    if (icon) {
      iconComponent = icon
    }

    const webButton = (
      <Button className='ti-button__wxbutton' lang={lang} formType={formType}></Button>
    )

    const button = (
      <Button
        className='ti-button__wxbutton'
        formType={formType}
        openType={openType}
        lang={lang}
        sessionFrom={sessionFrom}
        sendMessageTitle={sendMessageTitle}
        sendMessagePath={sendMessagePath}
        sendMessageImg={sendMessageImg}
        showMessageCard={showMessageCard}
        appParameter={appParameter}
        onGetUserInfo={this.onGetUserInfo}
        onGetPhoneNumber={this.onGetPhoneNumber}
        onOpenSetting={this.onOpenSetting}
        onError={this.onError}
        onContact={this.onContact}
      ></Button>
    )

    return (
      <View
        className={classNames(rootClassName, classObject, this.props.className)}
        style={customStyle}
        onClick={this.onClick}
      >
        {iconComponent}
        {isWEB && !disabled && webButton}
        {isWEAPP && !disabled && (
          <Form onSubmit={this.onSumit} onReset={this.onReset}>
            {button}
          </Form>
        )}
        {loadingComponent}
        <View className='ti-button__text'>{this.props.children}</View>
      </View>
    )
  }
}

TiButton.defaultProps = {
  size: 'normal',
  circle: false,
  full: false,
  loading: false,
  disabled: false,
  customStyle: {},
  // Button props
  lang: 'en',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: false,
  appParameter: ''
}

TiButton.propTypes = {
  size: PropTypes.oneOf(['normal', 'small', 'medium']),
  type: PropTypes.oneOf(['primary', 'info', 'text']),
  circle: PropTypes.bool,
  full: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  formType: PropTypes.oneOf(['submit', 'reset', '']),
  openType: PropTypes.oneOf([
    'contact',
    'share',
    'getUserInfo',
    'getPhoneNumber',
    'launchApp',
    'openSetting',
    'feedback',
    'getRealnameAuthInfo',
    'getAuthorize',
    'contactShare',
    ''
  ]),
  lang: PropTypes.string,
  sessionFrom: PropTypes.string,
  sendMessageTitle: PropTypes.string,
  sendMessagePath: PropTypes.string,
  sendMessageImg: PropTypes.string,
  showMessageCard: PropTypes.bool,
  appParameter: PropTypes.string,
  onGetUserInfo: PropTypes.func,
  onContact: PropTypes.func,
  onGetPhoneNumber: PropTypes.func,
  onError: PropTypes.func,
  onOpenSetting: PropTypes.func
}

export default TiButton
