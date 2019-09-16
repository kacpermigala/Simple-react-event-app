import React from 'react';
import { MockChildren, testText } from '../mocks/mockChildren';

const createSubject = ({ ...attributes }) => {
  return prepareComponentTest('Loader', attributes);
};

describe('<Loader>', () => {
  describe('When show set to true', () => {
    it('Should show animation', () => {
      const [comp, _] = createSubject({
        show: true,
        children: <MockChildren />,
      });

      expect(comp.find('.wrapper-middle').exists()).toBeTruthy();
    });
    it('Shouldn`t show children', () => {
      const [comp, _] = createSubject({
        show: true,
        children: <MockChildren />,
      });

      expect(comp.find('h1').exists()).toBeFalsy();
    });
  });
  describe('When show set to false', () => {
    it('Shouldn`t show animation', () => {
      const [comp, _] = createSubject({
        show: false,
        children: <MockChildren />,
      });

      expect(comp.find('.wrapper-middle').exists()).toBeFalsy();
    });
    it('Should show children', () => {
      const [comp, _] = createSubject({
        show: false,
        children: <MockChildren />,
      });

      expect(comp.find('h1').text()).toEqual(testText);
    });
  });
});
