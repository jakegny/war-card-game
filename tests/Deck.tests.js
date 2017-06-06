const chai = require('chai');
const expect = chai.expect;
const Deck = require('../src/Deck');

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
  describe('split', function() {
    let testDeck = new Deck();
    let splitDeck = testDeck.split();
    it('should return the first half of the deck to Player1, and the second to player2', function() {
      expect(splitDeck.player1Hand).to.exist;
      expect(splitDeck.player2Hand).to.exist;
    });
    it('should give each player 26 cards', function() {
      expect(splitDeck.player1Hand.length).to.eql(26);
      expect(splitDeck.player2Hand.length).to.eql(26);
    });
  });
});
