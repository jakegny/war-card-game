const chai = require('chai');
const expect = chai.expect;
const Deck = require('../src/Deck');
const Player = require('../src/Player');

describe('Player', function() {
  describe('properties', function() {
    it('should have a hand of length 26 to start', function() {
      let testDeck = new Deck();
      let splitDeck = testDeck.split();
      let testPlayer = new Player(splitDeck.player1Hand);
      expect(testPlayer.hand.length).to.eql(26);
    });
  });
  describe('play', function() {
    it('should take the first card from the players hand', function() {
      let testDeck = new Deck();
      let splitDeck = testDeck.split();
      let testPlayer = new Player(splitDeck.player1Hand);
      const lengthBeforePlay = testPlayer.hand.length;
      const firstCard = testPlayer.hand[0];
      const playedCard = testPlayer.play();
      const lengthAfterPlay = testPlayer.hand.length;
      expect(lengthBeforePlay).to.eql(lengthAfterPlay + 1);
      expect(firstCard).to.eql(playedCard);
    });
  });
  describe('addCards', function() {
    it('should put new cards in the back of the players hands', function() {
      let testDeck = new Deck();
      let splitDecks = testDeck.split();
      let testPlayer = new Player(splitDecks.player1Hand);
      const twoCards = splitDecks.player2Hand.slice(0, 2);
      testPlayer.addCards(twoCards);
      const lastIndex = testPlayer.hand.length - 1;
      expect(testPlayer.hand[lastIndex - 1]).to.eql(twoCards[0]);
      expect(testPlayer.hand[lastIndex]).to.eql(twoCards[1]);
    });
  });
});