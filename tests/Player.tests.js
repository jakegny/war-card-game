const chai = require('chai');
const expect = chai.expect;
const Deck = require('../src/server/Deck');
const Player = require('../src/server/Player');

describe('Player', function() {
  describe('play', function() {
    it('should take the first card from the players hand', function() {
      let testDeck = new Deck();
      let splitDeck = testDeck.split();
      let testPlayer = new Player();
      testPlayer.addCards(splitDeck.player1Hand);
      const lengthBeforePlay = testPlayer.hand.length;
      const firstCard = testPlayer.hand[0];
      testPlayer.play();
      const playedCard = testPlayer.cardOnTable;
      const lengthAfterPlay = testPlayer.hand.length;
      expect(lengthBeforePlay).to.eql(lengthAfterPlay + 1);
      expect(firstCard).to.eql(playedCard);
    });
  });
  describe('addCards', function() {
    it('should put new cards in the back of the players hands', function() {
      let testDeck = new Deck();
      let splitDecks = testDeck.split();
      let testPlayer = new Player();
      testPlayer.addCards(splitDecks.player1Hand);
      const twoCards = splitDecks.player2Hand.slice(0, 2);
      testPlayer.addCards(twoCards);
      const lastIndex = testPlayer.hand.length - 1;
      expect(testPlayer.hand[lastIndex - 1]).to.eql(twoCards[0]);
      expect(testPlayer.hand[lastIndex]).to.eql(twoCards[1]);
    });
  });
  describe('addCard', function() {
    it('should put 1 new cards in the back of the players hand', function() {
      let testDeck = new Deck();
      let splitDecks = testDeck.split();
      let testPlayer = new Player();
      testPlayer.addCards(splitDecks.player1Hand);
      const card = splitDecks.player2Hand[0];
      testPlayer.addCard(card);
      const lastIndex = testPlayer.hand.length - 1;
      expect(testPlayer.hand[lastIndex]).to.eql(card);
    });
  });
});
