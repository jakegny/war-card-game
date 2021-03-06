function Player(id) {
  this.id = id;
  this.hand = [];

  this.play = play;
  this.cardOnTable = {};
  this.addCards = addCards;
  this.addCard = addCard;
  this.clearCard = clearCard;
  this.isOut = false;
}

function play() {
  // If there are no more cards or you already have a card on the table
  if (this.hand.length === 0 || Object.keys(this.cardOnTable).length !== 0) {
    return;
  }
  this.cardOnTable = this.hand.shift();
}

function setIsOut() {
  this.isOut = true;
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
