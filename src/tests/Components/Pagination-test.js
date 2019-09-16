const createSubject = ({ ...attributes }) => {
  return prepareComponentTest('Pagination', attributes);
};

describe('<Pagination>', () => {
  it('Shouldn`t show begin button if is on page 1', () => {
    const [_, wrapper] = createSubject({
      offset: 0,
      total: 200,
    });

    expect(
      wrapper
        .find('.page')
        .at(0)
        .text()
    ).not.toEqual('&lt;&lt;');
  });
  it('Shouldn`t show end button if is last page', () => {
    const [_, wrapper] = createSubject({
      offset: 180,
      total: 200,
    });

    expect(
      wrapper
        .find('.page')
        .last()
        .text()
    ).not.toEqual('&gt;&gt;');
  });
  it('Should show correct active button', () => {
    const [_, wrapper] = createSubject({
      offset: 100,
      total: 200,
    });

    expect(wrapper.find('.active').text()).not.toEqual('5');
  });
  it('Should set correct offset for end button', () => {
    const setOffset = jest.fn();
    const [_, wrapper] = createSubject({
      offset: 100,
      total: 201,
      setOffset,
    });
    wrapper
      .find('.page')
      .last()
      .simulate('click');

    expect(setOffset).toHaveBeenCalledWith(200);
  });
  it('Should set correct offset for start button', () => {
    const setOffset = jest.fn();
    const [_, wrapper] = createSubject({
      offset: 100,
      total: 201,
      setOffset,
    });
    wrapper
      .find('.page')
      .first()
      .simulate('click');

    expect(setOffset).toHaveBeenCalledWith(0);
  });
  it('Should set correct offset for normal button', () => {
    const setOffset = jest.fn();
    const [_, wrapper] = createSubject({
      offset: 100,
      total: 201,
      setOffset,
    });
    wrapper
      .find('.page')
      .at(1)
      .simulate('click');

    expect(setOffset).toHaveBeenCalledWith(80);
  });
});
