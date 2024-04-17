const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('Server is running');
});

let games = {};

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('createGame', data => {
    const gameId = "game" + Math.floor(Math.random() * 10000); // Simple random ID for demonstration
    games[gameId] = {
      players: [socket.id],
      board: Array(9).fill(null),
      xIsNext: true
    };
    socket.join(gameId);
    socket.emit('gameCreated', gameId);
  });

  socket.on('joinGame', gameId => {
    const game = games[gameId];
    if (game && game.players.length === 1) {
      game.players.push(socket.id);
      socket.join(gameId);
      io.to(gameId).emit('gameStarted', gameId);
    } else {
      socket.emit('error', 'Game full or does not exist.');
    }
  });

  socket.on('move', (data) => {
    const { gameId, index, player } = data;
    const game = games[gameId];
    if (game) {
      game.board[index] = player;
      game.xIsNext = !game.xIsNext;
      io.to(gameId).emit('moveMade', { index, player });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
