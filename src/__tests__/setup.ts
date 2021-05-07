import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// @ts-ignore
Enzyme.configure({ adapter: new Adapter() });

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
