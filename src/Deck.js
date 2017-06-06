const Card = require('./Card');

function Deck() {
  const values = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K'
  ];
  this.cards = [];
  const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      this.cards.push(new Card(suits[s], values[v]));
    }
  }
  this.shuffle = shuffle;
  this.split = split;
  this.shuffle();
}

function shuffle() {
  let temp, rand;
  var remaining = this.cards.length;

  while (0 !== remaining) {
    pick = Math.floor(Math.random() * remaining);
    remaining -= 1;

    temp = this.cards[remaining];
    this.cards[remaining] = this.cards[pick];
    this.cards[pick] = temp;
  }
}

function split() {
  const HALF = 26;
  const firstHalf = this.cards.slice(0, HALF);
  const secondHalf = this.cards.slice(HALF, this.cards.length);
  return {
    player1Hand: firstHalf,
    player2Hand: secondHalf
  };
}

module.exports = Deck;
