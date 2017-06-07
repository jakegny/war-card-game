import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Players from './view/Players';

const io = require('socket.io-client');
const socket = io();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {}
    };
    socket.on('youare', id => {
      console.log('id', id);
    });
    socket.on('new game', game => {
      this.setState({ game });
    });
    socket.on('new player', game => {
      // console.log('game', game);
      this.setState({ game });
    });
    socket.on('player left', game => {
      console.log('do you want to continue?');
      this.setState({ game });
    });
    socket.on('played', game => {
      this.setState({ game });
    });
    socket.on('game over', game => {
      this.setState({ game });
    });
    this.handleClick = this.handleClick.bind(this);
    this.clickPlay = this.clickPlay.bind(this);
  }

  componentWillUnmount() {
    socket.emit('disconnect');
  }

  handleClick() {
    if (this.state.game.players.length > 1) {
      socket.emit('start game');
    } else {
      // TODO: need more players
    }
  }

  clickPlay(playerId) {
    socket.emit('play', playerId);
  }

  render() {
    // socket.emit('whoami');
    return (
      <div className="App">
        <Players
          game={this.state.game}
          myId={socket.id}
          clickPlay={this.clickPlay}
        />
        {this.state.game.inProgress
          ? null
          : <button onClick={this.handleClick}>Start Game</button>}
        <div>
          Cards in winners pot:
          {' '}
          {this.state.game.winnersPot ? this.state.game.winnersPot.length : 0}
        </div>
        {this.state.game.winner
          ? <h1>WINNER: {this.state.game.winner}</h1>
          : null}
      </div>
    );
  }
}

export default App;
