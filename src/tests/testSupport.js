import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Enzyme, { mount as enzymeMount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import * as path from 'path';

registerRequireContextHook();

Enzyme.configure({ adapter: new Adapter() });

const createdWrappers = [];
const plainComponents = {};

beforeAll(() => {
  const componentsContext = require.context('../Components', true, /\.jsx?$/);
  componentsContext.keys().forEach(componentPath => {
    plainComponents[
      path.parse(componentPath).name
    ] = require(`../Components/${componentPath}`).default;
  });
});

afterEach(() => {
  createdWrappers.forEach(wrapper => wrapper.unmount());
  createdWrappers.splice(0, createdWrappers.length);
});

export function renderIntoDocument(reactElement) {
  const domElement = document.createElement('div');
  ReactDOM.render(reactElement, domElement);

  return domElement;
}

export function mount(reactElement) {
  return enzymeMount(reactElement);
}

export function prepareComponentTest(componentName, props = {}) {
  const KlassComponent = plainComponents[componentName];
  if (
    typeof KlassComponent !== 'function' &&
    typeof KlassComponent !== 'object'
  ) {
    throw `Component ${componentName} is not available for testing`;
  }

  const wrapper = mount(<KlassComponent {...props} />);
  createdWrappers.push(wrapper);

  let compName = componentName;
  if (typeof componentName === 'function') {
    compName = componentName.displayName;
  }

  if (!compName || compName.length === 0) {
    // eslint-disable-next-line no-console
    console.warn('Could not determine component name, returning wrapper');
    return [wrapper, wrapper];
  }

  const comp = wrapper.find(compName);
  return [comp, wrapper];
}

global.prepareComponentTest = prepareComponentTest;
