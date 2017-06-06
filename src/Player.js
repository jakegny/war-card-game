function Player(hand) {
  this.hand = hand;

  this.play = play;
  this.addCards = addCards;
}

function play() {
  return this.hand.shift();
}

function addCards(cards) {
  this.hand = this.hand.concat(cards);
}

module.exports = Player;
