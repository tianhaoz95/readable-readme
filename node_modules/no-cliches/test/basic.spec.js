const cliches = require('../cliches');

const clichesInSentence = 'Writing specs puts me at loose ends.';
const goodSentence = 'The good dog jumps over the bad cat.';

describe('no-cliches', () => {
  describe('a sentence filled with cliches', () => {
    let results = null;

    beforeEach(() => {
      results = cliches(clichesInSentence);
    });

    it('will not escape notice', () => {
      expect(results).toEqual([{ index: 22, offset: 13 }]);
    });
  });

  it('should not have a problem with a short sentence', () => {
    expect(cliches(goodSentence)).toEqual([]);
  });
});
