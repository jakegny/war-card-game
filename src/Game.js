const Player = require('./Player');
const Deck = require('./Deck');

function Game(numPlayers) {
  if (!numPlayers) {
    throw new Error('Specify number of players');
  }
  this.deck = new Deck();
  this.players = [];
  for (let i = 0; i < numPlayers; i++) {
    this.players.push(new Player());
  }

  this.deal = deal;

  this.deal(numPlayers);
}

function deal(numPlayers) {
  let cards = this.deck.cards;
  while (cards.length > 0) {
    this.players.forEach(function(player, idx) {
      if (cards.length === 0) {
        return;
      }
      player.addCard(cards.shift());
    });
  }
}

module.exports = Game;
