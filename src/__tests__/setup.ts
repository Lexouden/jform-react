import { shallow, render, mount } from 'enzyme';

// Make Enzyme functions available in all test files without importing
// @ts-ignore
global.shallow = shallow;
// @ts-ignore
global.render = render;
// @ts-ignore
global.mount = mount;

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
