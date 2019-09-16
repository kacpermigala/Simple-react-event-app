import React from 'react';
import { MockChildren, testText } from '../mocks/mockChildren';

const createSubject = ({ ...attributes }) => {
  return prepareComponentTest('ErrorBoundary', attributes);
};

describe('<ErrorBoundary>', () => {
  describe('If error is detected', () => {
    it('Should show correct error message', () => {
      const [_, wrapper] = createSubject({});
      wrapper.setState({ hasError: true });

      expect(wrapper.find('h2').text()).toEqual('Something went wrong.');
    });
    it('Should show reload button', () => {
      const [_, wrapper] = createSubject({});
      wrapper.setState({ hasError: true });

      expect(wrapper.find('button').exists()).toBeTruthy();
    });
    it('Should reload page after button click', () => {
      delete window.location;
      window.location = {
        reload: jest.fn(),
      };
      const [_, wrapper] = createSubject({});
      wrapper.setState({ hasError: true });
      wrapper.find('button').simulate('click');

      expect(window.location.reload).toBeCalled();
    });
  });
  describe('If there is no error', () => {
    it('Should show children', () => {
      const [comp, _] = createSubject({
        children: <MockChildren />,
      });

      expect(comp.find('h1').text()).toEqual(testText);
    });
  });
});
