import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPlayedCard: {}
    };
  }

  componentWillRecieveProps() {
    this.setState({
      lastPlayedCard: this.props.player.cardOnTable
    });
  }

  render() {
    const isMe = this.props.player && this.props.myId === this.props.player.id;
    console.log('this.state', this.state);
    return (
      <div>
        {isMe ? 'you --' : null}
        Player
        <p>{this.props.player.id}</p>
        <p>Number of cards: {this.props.player.hand.length}</p>
        <p>
          Card:
          {' '}
          {this.props.player.cardOnTable && this.props.player.cardOnTable.value
            ? `${this.props.player.cardOnTable.value} of ${this.props.player.cardOnTable.suit}`
            : ''}
        </p>
        <p>
          Last Played:
          {' '}
          {this.state.lastPlayedCard.value
            ? `${this.state.lastPlayedCard.value} of ${this.state.lastPlayedCard.suit}`
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
