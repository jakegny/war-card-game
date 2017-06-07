function Player(id) {
  this.id = id;
  this.hand = [];

  this.play = play;
  this.cardOnTable = {};
  this.addCards = addCards;
  this.addCard = addCard;
  this.clearCard = clearCard;
}

function play() {
  if (this.hand.length === 0) {
    return;
  }
  this.cardOnTable = this.hand.shift();
}

function clearCard() {
  this.cardOnTable = {};
}

function addCards(cards) {
  this.hand = this.hand.concat(cards);
}

function addCard(card) {
  this.hand.push(card);
}

module.exports = Player;
