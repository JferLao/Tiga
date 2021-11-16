import TiButton from '../../src/components/button'
// import mountTest from '../../../../tools/shared/mountTest'
import React from 'react'
import { renderToString } from 'nerv-server'

describe('按钮测试', () => {
  it('size测试', () => {
    const component = renderToString(<TiButton size='normal'>按钮</TiButton>)
    expect(component).toMatchSnapshot()
  })
})
