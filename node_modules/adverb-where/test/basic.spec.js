const adverbs = require('../adverbs');

const badWordInSentence = 'Allegedly, this sentence is terrible.';
const goodSentence = 'The good dog jumps over the bad cat.';
const vagueSentence = 'We are writing about things and stuff.';

describe('adverb-where', () => {
  describe('a sentence filled with adverbs', () => {
    let results = null;

    beforeEach(() => {
      results = adverbs(badWordInSentence);
    });

    it('will not escape notice', () => {
      expect(results).toEqual([{ index: 0, offset: 9 }]);
    });
  });

  it('should not have a problem with a short sentence', () => {
    expect(adverbs(goodSentence)).toEqual([]);
  });

  it('should flag vague constructs', () => {
    expect(adverbs(vagueSentence)).toEqual([{ index: 21, offset: 6 }, { index: 32, offset: 5 }]);
  });
});
