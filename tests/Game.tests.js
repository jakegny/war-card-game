const chai = require('chai');
const expect = chai.expect;
const Game = require('../src/server/Game');

describe('Game', function() {
  describe('with 2 Players', function() {
    const testGame = new Game();
    testGame.addPlayer('abcd');
    testGame.addPlayer('efgh');
    testGame.deal();
    it('Player1 should have 26 cards', function() {
      const player1 = testGame.players[0];
      expect(player1.hand.length).to.eql(26);
    });
    it('Player2 should have 26 cards', function() {
      const player2 = testGame.players[1];
      expect(player2.hand.length).to.eql(26);
    });
  });
  describe('with 3 Players', function() {
    const testGame = new Game();
    testGame.addPlayer('abcd');
    testGame.addPlayer('efgh');
    testGame.addPlayer('ijkl');
    testGame.deal();
    it('Player1 should have 18 cards', function() {
      const player1 = testGame.players[0];
      expect(player1.hand.length).to.eql(18);
    });
    it('Player2 should have 17 cards', function() {
      const player2 = testGame.players[1];
      expect(player2.hand.length).to.eql(17);
    });
    it('Player3 should have 17 cards', function() {
      const player3 = testGame.players[2];
      expect(player3.hand.length).to.eql(17);
    });
  });
  describe('with 4 Players', function() {
    const testGame = new Game();
    testGame.addPlayer('abcd');
    testGame.addPlayer('efgh');
    testGame.addPlayer('ijkl');
    testGame.addPlayer('mnop');
    testGame.deal();
    it('Player1 should have 13 cards', function() {
      const player1 = testGame.players[0];
      expect(player1.hand.length).to.eql(13);
    });
    it('Player2 should have 13 cards', function() {
      const player2 = testGame.players[1];
      expect(player2.hand.length).to.eql(13);
    });
    it('Player3 should have 13 cards', function() {
      const player3 = testGame.players[2];
      expect(player3.hand.length).to.eql(13);
    });
    it('Player4 should have 13 cards', function() {
      const player4 = testGame.players[3];
      expect(player4.hand.length).to.eql(13);
    });
  });
  describe('addPlayer', function() {
    it('should add a player to the game', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      expect(testGame.players.length).to.eql(1);
    });
  });
  describe('removePlayer', function() {
    it('should add a player to the game', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      testGame.addPlayer('efgh');
      expect(testGame.players.length).to.eql(2);
      testGame.removePlayer('abcd');
      expect(testGame.players.length).to.eql(1);
      expect(testGame.players[0].id).to.eql('efgh');
    });
  });
  describe('allPlayersHavePlayed', function() {
    it('should return false if any player has an empty cardOnTable obj', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      testGame.addPlayer('efgh');
      testGame.deal();
      expect(testGame.allPlayersHavePlayed()).to.eql(false);
    });
    it('should return true if all players have a cardOnTable obj', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      testGame.addPlayer('efgh');
      testGame.deal();
      testGame.players.forEach(player => {
        player.play();
      });
      expect(testGame.allPlayersHavePlayed()).to.eql(true);
    });
  });
  describe('compareCards', function() {
    it('player1: 2 of spades, player2: 3 of hears, winner: player2', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      let player1 = testGame.players[0];
      player1.addCard({ value: '2', suit: 'Spades' });
      player1.play();
      testGame.addPlayer('efgh');
      let player2 = testGame.players[1];
      player2.addCard({ value: '3', suit: 'Hearts' });
      player2.play();
      const winner = testGame.compareCards();
      expect(winner).to.eql(player2);
    });
    it('player1: 4 of spades, player2: 3 of hears, winner: player2', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      let player1 = testGame.players[0];
      player1.addCard({ value: '4', suit: 'Spades' });
      player1.play();
      testGame.addPlayer('efgh');
      let player2 = testGame.players[1];
      player2.addCard({ value: '3', suit: 'Hearts' });
      player2.play();
      const winner = testGame.compareCards();
      expect(winner).to.eql(player1);
    });
    it('player1: 4 of spades, player2: 3 of hears, player3: 5 of diamonds, winner: player3', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      let player1 = testGame.players[0];
      player1.addCard({ value: '4', suit: 'Spades' });
      player1.play();
      testGame.addPlayer('efgh');
      let player2 = testGame.players[1];
      player2.addCard({ value: '3', suit: 'Hearts' });
      player2.play();
      testGame.addPlayer('ijkl');
      let player3 = testGame.players[2];
      player3.addCard({ value: '5', suit: 'Diamonds' });
      player3.play();
      const winner = testGame.compareCards();
      expect(winner).to.eql(player3);
    });
    it('player1: 4 of spades, player2: 4 of hearts, winner: null / tie', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      let player1 = testGame.players[0];
      player1.addCard({ value: '4', suit: 'Spades' });
      player1.play();
      testGame.addPlayer('efgh');
      let player2 = testGame.players[1];
      player2.addCard({ value: '4', suit: 'Hearts' });
      player2.play();
      const winner = testGame.compareCards();
      expect(winner).to.eql(null);
    });
  });
  describe('compare', function() {
    it('player1: 5 of spades, player2: 8 of hearts, player 2 should have 2 cards, player 1 - 0 cards', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      let player1 = testGame.players[0];
      player1.addCard({ value: '5', suit: 'Spades' });
      player1.play();
      testGame.addPlayer('efgh');
      let player2 = testGame.players[1];
      player2.addCard({ value: '8', suit: 'Hearts' });
      player2.play();
      testGame.compare();
      expect(player1.hand.length).to.eql(0);
      expect(player2.hand.length).to.eql(2);
    });
    it('player1: 5 of spades, player2: 3 of hearts, player 1 should have 2 cards, player 2 - 0 cards', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      let player1 = testGame.players[0];
      player1.addCard({ value: '5', suit: 'Spades' });
      player1.play();
      testGame.addPlayer('efgh');
      let player2 = testGame.players[1];
      player2.addCard({ value: '3', suit: 'Hearts' });
      player2.play();
      testGame.compare();
      expect(player1.hand.length).to.eql(2);
      expect(player2.hand.length).to.eql(0);
    });
    it('player1: 5 of spades, player2: 5 of hearts, player 1 should have 1 card each, and winners pot should be 2. second play - 10-D vs 8-D, player1: 4 cards, player 2: 0, winnersPot: 0', function() {
      let testGame = new Game();
      testGame.addPlayer('abcd');
      let player1 = testGame.players[0];
      player1.addCard({ value: '5', suit: 'Spades' });
      player1.addCard({ value: '10', suit: 'Diamonds' });
      player1.play();
      testGame.addPlayer('efgh');
      let player2 = testGame.players[1];
      player2.addCard({ value: '5', suit: 'Hearts' });
      player2.addCard({ value: '8', suit: 'Diamonds' });
      player2.play();
      testGame.compare();
      expect(player1.hand.length).to.eql(1);
      expect(player2.hand.length).to.eql(1);
      expect(testGame.winnersPot.length).to.eql(2);
      player1.play();
      player2.play();
      let gameOver = testGame.compare();
      expect(player1.hand.length).to.eql(4);
      expect(player2.hand.length).to.eql(0);
      expect(testGame.winnersPot.length).to.eql(0);
      expect(gameOver).to.eql(true);
      expect(testGame.winner).to.eql(player1);
    });
    it.only(
      'should be able to continue after a player runs out of cards',
      function() {
        let testGame = new Game();
        testGame.addPlayer('abcd');
        let player1 = testGame.players[0];
        player1.addCard({ value: '5', suit: 'Spades' });
        player1.addCard({ value: '10', suit: 'Diamonds' });
        player1.addCard({ value: 'A', suit: 'Spades' });
        player1.play();
        testGame.addPlayer('efgh');
        let player2 = testGame.players[1];
        player2.addCard({ value: '5', suit: 'Hearts' });
        player2.addCard({ value: '8', suit: 'Diamonds' });
        player2.addCard({ value: '2', suit: 'Clubs' });
        player2.play();
        testGame.addPlayer('ijkl');
        let player3 = testGame.players[2];
        player3.addCard({ value: '5', suit: 'Clubs' });
        player3.addCard({ value: '4', suit: 'Clubs' });
        player3.play();
        testGame.compare();
        expect(player1.hand.length).to.eql(2);
        expect(player2.hand.length).to.eql(2);
        expect(player3.hand.length).to.eql(1);
        player1.play();
        player2.play();
        player3.play();
        testGame.compare();
        expect(player1.hand.length).to.eql(7);
        expect(player2.hand.length).to.eql(1);
        expect(player3.hand.length).to.eql(0);
        expect(testGame.winnersPot.length).to.eql(0);
        player1.play();
        player2.play();
        testGame.compare();
        expect(player1.hand.length).to.eql(8);
        expect(player2.hand.length).to.eql(0);
        expect(testGame.winner).to.eql(player1);
      }
    );
  });
});
