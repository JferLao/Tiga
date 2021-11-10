const React = require('react');
const chai = require('chai')

// eslint-disable-next-line no-console
console.log('Current React Version:', React.version);

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16')
Enzyme.configure({ adapter: new Adapter() });


global.shallow = Enzyme.shallow
global.mount = Enzyme.mount
global.render = Enzyme.render

// 很重要，一些测试的类型断言都需要通过chai去过滤error
global.expect = chai.expect
