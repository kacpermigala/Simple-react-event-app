import getCharacter from '../../ApiModules/getCharacter';

jest.mock('../../ApiModules/getCharacter');

getCharacter.mockReturnValue({
  then: () => ({
    data: {},
    catch: () => {},
  }),
});

const createSubject = ({ ...attributes }) => {
  return prepareComponentTest('CharacterProfile', attributes);
};

describe('<CharacterProfile>', () => {
  describe('When location character available', () => {
    it('Shouldn`t call getCharacter method', () => {
      const [_, __] = createSubject({
        location: {
          character: {},
        },
      });

      expect(getCharacter).not.toBeCalled();
    });
  });
  describe('When location character isn`t available', () => {
    it('Should call getCharacter method', () => {
      const [_, __] = createSubject({
        location: {},
        match: {
          params: {
            id: 0,
          },
        },
      });

      expect(getCharacter).toBeCalled();
    });
  });
});
