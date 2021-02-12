const complexity = require('../too-wordy');

const badWordInSentence = 'An abundance of highlights accede to long, complex sentences and common errors.';
const badPhrasesInSentence = 'a number of sentences are so dense and complicated that your readers will be adversely impacted';
const badPhrasesInSentenceWithFormatting = `a   number \nof sentences are dense in a ${String.fromCharCode(8204)}number of ways`;
const goodSentence = 'The good dog jumps over the bad cat.';
const sentenceWithHyphen = 'A transfer visa may be required at check-in between any connecting flight.';

describe('too-wordy', () => {
  describe('a sentence filled with overly complex words', () => {
    let results = null;

    beforeEach(() => {
      results = complexity(badWordInSentence);
    });

    it('the words are noted', () => {
      expect(results).toEqual([{ index: 3, offset: 9 }, { index: 27, offset: 9 }]);
    });
  });

  describe('a sentence with phrases that could be stated more simply', () => {
    let results = null;

    beforeEach(() => {
      results = complexity(badPhrasesInSentence);
    });

    it('the phrases are noted', () => {
      expect(results).toEqual([{ index: 0, offset: 11 }, { index: 87, offset: 8 }]);
    });
  });

  describe('hyphenated words should not be parsed as two words', () => {
    let results = null;

    beforeEach(() => {
      results = complexity(sentenceWithHyphen);
    });

    it('the "in between" is ignored when word is part of hyphen word', () => {
      expect(results).toEqual([]);
    });
  });

  it('should not have a problem with a short sentence', () => {
    expect(complexity(goodSentence)).toEqual([]);
  });

  it('should not have a problem with white-space formatting', () => {
    const results = complexity(badPhrasesInSentenceWithFormatting);
    expect(results).toEqual([{ index: 0, offset: 14 }, { index: 38, offset: 12 }]);
  });

  it('should match just one word sentence', () => {
    expect(complexity('pertaining to')).toEqual([{ index: 0, offset: 13 }]);
  });
});
