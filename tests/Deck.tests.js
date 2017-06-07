const chai = require('chai');
const expect = chai.expect;
const Deck = require('../src/server/Deck');

describe('Deck', function() {
  describe('length', function() {
    it('should have length of 52', function() {
      let testDeck = new Deck();
      expect(testDeck.cards.length).to.eql(52);
    });
  });
  describe('shuffle', function() {
    it('should have the same length of cards afterward', function() {
      let testDeck = new Deck();
      const firstLength = testDeck.cards.length;
      testDeck.shuffle();
      const shuffleLength = testDeck.cards.length;
      expect(firstLength).to.eql(shuffleLength);
    });
    it('should re order the deck in place', function() {
      let testDeck = new Deck();
      const firstCard = testDeck.cards[0];
      testDeck.shuffle();
      const firstCardAfterShuffle = testDeck.cards[0];
      expect(firstCard).to.not.eql(firstCardAfterShuffle);
    });
  });
});
