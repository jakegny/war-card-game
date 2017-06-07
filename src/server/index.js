const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('../../config/webpack.config.dev');
const open = require('open');

const port = 3000;
const app = express();
const compiler = webpack(config);

const Game = require('./Game');

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

const io = require('socket.io')(server);

let game;

io.on('connection', socket => {
  if (!game) {
    game = new Game();
  }
  game.addPlayer(socket.client.id);
  console.log(`Player ${socket.client.id} has joined the game.`);
  io.emit('new player', game);

  socket.on('start game', () => {
    game.deal();
    game.setInProgress(true);
    io.emit('new game', game);
  });

  socket.on('play', playerId => {
    let player = game.players.filter(player => playerId === player.id)[0];
    player.play();
    let gameOver = game.compare();
    if (gameOver) {
      io.emit('game over', game);
    } else {
      io.emit('played', game);
    }
  });

  socket.on('whoami', () => {
    console.log('clientId', socket.client.id);
    socket.emit('youare', socket.client.id);
  });

  socket.on('disconnect', () => {
    console.log(`Player ${socket.client.id} has left the game.`);
    game.removePlayer(socket.client.id);
    io.emit('player left', game);
  });
});
