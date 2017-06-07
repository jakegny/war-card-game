const chai = require('chai');
const expect = chai.expect;
const Game = require('../src/Game');

describe('Game', function() {
  describe('with 2 Players', function() {
    const newGame = new Game(2);
    it('Player1 should have 26 cards', function() {
      const player1 = newGame.players[0];
      expect(player1.hand.length).to.eql(26);
    });
    it('Player2 should have 26 cards', function() {
      const player2 = newGame.players[1];
      expect(player2.hand.length).to.eql(26);
    });
  });
  describe('with 3 Players', function() {
    const newGame = new Game(3);
    it('Player1 should have 18 cards', function() {
      const player1 = newGame.players[0];
      expect(player1.hand.length).to.eql(18);
    });
    it('Player2 should have 17 cards', function() {
      const player2 = newGame.players[1];
      expect(player2.hand.length).to.eql(17);
    });
    it('Player3 should have 17 cards', function() {
      const player3 = newGame.players[2];
      expect(player3.hand.length).to.eql(17);
    });
  });
  describe('with 4 Players', function() {
    const newGame = new Game(4);
    it('Player1 should have 13 cards', function() {
      const player1 = newGame.players[0];
      expect(player1.hand.length).to.eql(13);
    });
    it('Player2 should have 13 cards', function() {
      const player2 = newGame.players[1];
      expect(player2.hand.length).to.eql(13);
    });
    it('Player3 should have 13 cards', function() {
      const player3 = newGame.players[2];
      expect(player3.hand.length).to.eql(13);
    });
    it('Player4 should have 13 cards', function() {
      const player4 = newGame.players[3];
      expect(player4.hand.length).to.eql(13);
    });
  });
});
