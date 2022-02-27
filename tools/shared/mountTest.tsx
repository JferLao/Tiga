import React from 'react'
import { mount } from 'enzyme'
// eslint-disable-next-line jest/no-export
export default function mountTest(Component: React.ComponentType): void {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = mount(<Component />)
      expect(() => {
        wrapper.setProps({})
        wrapper.unmount()
      }).not.toThrow()
    })
  })
}
