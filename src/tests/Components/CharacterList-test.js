import getCharacters from '../../ApiModules/getCharacters';

jest.mock('../../ApiModules/getCharacters');

getCharacters.mockReturnValue({
  then: () => ({
    result: {},
    catch: () => {},
  }),
});

const createSubject = ({ ...attributes }) => {
  return prepareComponentTest('CharactersList', attributes);
};

describe('<CharactersList>', () => {
  describe('When rendered', () => {
    it('Should fetch a list of characters', () => {
      const [_, __] = createSubject({});

      expect(getCharacters).toBeCalled();
    });
  });
});
