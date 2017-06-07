import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPlayedCard: {}
    };
  }

  render() {
    const isMe = this.props.player && this.props.myId === this.props.player.id;
    return (
      <div>
        <p>Player - {this.props.player.id}</p>
        <p>Number of cards in hand: {this.props.player.hand.length}</p>
        <p>
          Card:
          {' '}
          {this.props.player.cardOnTable && this.props.player.cardOnTable.value
            ? `${this.props.player.cardOnTable.value} of ${this.props.player.cardOnTable.suit}`
            : ''}
        </p>
        {isMe
          ? <button
              onClick={() => {
                this.props.clickPlay(this.props.myId);
              }}
            >
              Play a card
            </button>
          : null}
      </div>
    );
  }
}

export default Player;
