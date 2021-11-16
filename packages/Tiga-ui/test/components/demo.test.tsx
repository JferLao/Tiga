import React from 'react'
import { shallow } from 'enzyme'
import { Button, Text, View } from '@tarojs/components'
import mountTest from '../../../../tools/shared/mountTest'
class Counter extends React.Component {
  state = { count: 0 }
  increment = () => {
    const { count } = this.state
    this.setState({ count: count + 1 })
  }

  decrement = () => {
    const { count } = this.state
    this.setState({ count: count - 1 })
  }
  render() {
    return (
      <View>
        <Button onClick={this.decrement}>-</Button>
        <Text>{this.state.count}</Text>
        <Text className='hello'>hhh</Text>
        <Button onClick={this.increment}>+</Button>
      </View>
    )
  }
}

describe('<Counter />', () => {
  it('测试文字', () => {
    // const wrapper = shallow(<Counter />)
    // const helloworld = wrapper.find('.hello')
    // expect(helloworld.text()).toEqual('hhh')
  })

  it('测试点击', () => {
    const wrapper = shallow(<Counter />)
    expect(wrapper.state('count')).toBe(0)
    wrapper.instance().increment()
    expect(wrapper.state('count')).toBe(1)
  })
})

mountTest(Counter)