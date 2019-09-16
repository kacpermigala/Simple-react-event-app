const createSubject = ({ ...attributes }) => {
  return prepareComponentTest('NotFound', attributes);
};

describe('<NotFound>', () => {
  it('Should contain correct text', () => {
    const [comp, _] = createSubject({});

    expect(comp.find('h2').text()).toEqual('Page not found');
  });
});
