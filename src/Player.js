function Player() {
  this.hand = [];

  this.play = play;
  this.addCards = addCards;
  this.addCard = addCard;
}

function play() {
  return this.hand.shift();
}

function addCards(cards) {
  this.hand = this.hand.concat(cards);
}

function addCard(card) {
  this.hand.push(card);
}

module.exports = Player;
