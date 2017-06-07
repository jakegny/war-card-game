const Player = require('./Player');
const Deck = require('./Deck');

function Game() {
  this.deck = new Deck();
  this.players = [];
  this.winnersPot = [];
  this.winner = null;
  this.inProgress = false;

  this.setInProgress = setInProgress;
  this.deal = deal;
  this.addPlayer = addPlayer;
  this.removePlayer = removePlayer;
  this.allPlayersHavePlayed = allPlayersHavePlayed;
  this.addCardsToWinnersPot = addCardsToWinnersPot;
  this.compareCards = compareCards;
  this.playerWins = playerWins;
  this.compare = compare;
  this.onePlayerHasAllCards = onePlayerHasAllCards;
}

function addPlayer(id) {
  this.players.push(new Player(id));
}

function removePlayer(id) {
  this.players = this.players.filter(player => {
    return player.id !== id;
  });
}

function setInProgress(inProgress) {
  this.inProgress = inProgress;
}

function deal() {
  let cards = this.deck.cards;
  while (cards.length > 0) {
    this.players.forEach(function(player) {
      if (cards.length === 0) {
        return;
      }
      player.addCard(cards.shift());
    });
  }
}

function addCardsToWinnersPot() {
  let newWinnersPot = this.winnersPot;
  this.players.forEach(function(player) {
    if (Object.keys(player.cardOnTable).length !== 0) {
      newWinnersPot.push(player.cardOnTable);
    }
    player.clearCard();
  });
  this.winnersPot = newWinnersPot;
}

function playerWins(player) {
  player.addCards(this.winnersPot);
  this.winnersPot = [];
}

function allPlayersHavePlayed() {
  let havePlayed = true;
  this.players.forEach(player => {
    // They don't have a card down AND the they have more cards to be played
    if (
      Object.keys(player.cardOnTable).length === 0 && player.hand.length > 0
    ) {
      havePlayed = false;
    }
  });
  return havePlayed;
}

// Return the playerId with the highest card value
function compareCards() {
  let playerWithBiggestCard = [this.players[0]];
  for (let i = 1; i < this.players.length; i++) {
    playerWithBiggestCard = cardIsBigger(playerWithBiggestCard, [
      this.players[i]
    ]);
  }
  if (playerWithBiggestCard.length > 1) {
    // TIE
    return null;
  }
  return playerWithBiggestCard[0];
}

function valuePosition(card) {
  switch (card.value) {
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    case '10':
      return 10;
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
  }
}

function cardIsBigger(player1, player2) {
  const card1Value = valuePosition(player1[0].cardOnTable);
  const card2Value = valuePosition(player2[0].cardOnTable);
  if (
    card1Value > card2Value || Object.keys(player2[0].cardOnTable).length === 0
  ) {
    return player1;
  } else if (
    card2Value > card1Value || Object.keys(player1[0].cardOnTable).length === 0
  ) {
    return player2;
  } else {
    return player1.concat(player2);
  }
}

function onePlayerHasAllCards() {
  const totalPlayers = this.players.length;
  let numWith0Cards = 0;
  this.players.map(player => {
    if (player.hand.length === 0) {
      numWith0Cards += 1;
    }
  });
  if (numWith0Cards === totalPlayers - 1) {
    return true;
  }
  return false;
}

function compare() {
  if (this.allPlayersHavePlayed()) {
    const winner = this.compareCards();
    this.addCardsToWinnersPot();
    if (winner) {
      this.playerWins(winner);
      if (this.onePlayerHasAllCards()) {
        this.winner = winner;
        return true;
      }
    }
  }
  return false;
}

module.exports = Game;
