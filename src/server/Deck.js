const Card = require('./Card');

function Deck() {
  const values = [
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
    'K',
    'A'
  ];
  this.cards = [];
  const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      this.cards.push(new Card(suits[s], values[v]));
    }
  }
  this.shuffle = shuffle;
  this.shuffle();
}

function shuffle() {
  let temp, pick;
  var remaining = this.cards.length;

  while (0 !== remaining) {
    pick = Math.floor(Math.random() * remaining);
    remaining -= 1;

    temp = this.cards[remaining];
    this.cards[remaining] = this.cards[pick];
    this.cards[pick] = temp;
  }
}

module.exports = Deck;
