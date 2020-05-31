var express = require('express');
var socket = require('socket.io');

//const Game = require('./Game.js');
var games = [];
var gIndex = -1;

var app = express();
var server = app.listen(4000, function() {
  console.log("Listening on port 4000");
});
app.use(express.static('public'));

var io = socket(server);
// Custom namespaces - in each namespace you can define channels (games)
// that sockets can join and leave
const classic = io.of('/classic');

function Game(count) { // Used to create Game objects
  this.id = count; // This will be the channel name for sockets.io
  this.p1 = '';
  this.p2 = '';
}

function joinGame(gameid, socket) { // Returns false if all games are full
  if (gameid == -1) { // games[0] is undefined
    return false;
  }
  if (games[gameid].p1 == '') { // if p1 spot is available
    games[gameid].p1 = socket.id;
    socket.join(gameid);
    socket.emit('join', {
      gameid: gameid,
      playernum: 1
    });
    console.log(socket.id + ' joined game ' + gameid + ' as player 1');
    return true;
  } else if (games[gameid].p2 == '') { // if p2 spot is available
    games[gameid].p2 = socket.id;
    socket.join(gameid);
    socket.emit('join', {
      gameid: gameid,
      playernum: 2
    });
    console.log(socket.id + ' joined game ' + gameid + ' as player 2');
    return true;
  }
  return false; // game is full
}

server.on('error', function(err) {
  console.error('Server error:', err);
});


io.on('connection', function(socket) {
  socket.on('disconnect', function() {}); // Other player wins
});

classic.on('connection', function(socket) {
  if (joinGame(gIndex, socket)) {
    socket.on('chat-message', function(message) {
      io.of('classic').to(gIndex).emit('chat-message', message);
    });
  } else {
    gIndex++;
    var game = new Game(gIndex);
    games.push(game);
    console.log('New game created: ' + games[gIndex].id);
    if (joinGame(gIndex, socket)) {
      socket.on('chat-message', function(message) {
        io.of('classic').to(gIndex).emit('chat-message', message);
      });
    }
  }
});

io.on('message', function(data) {
  console.log();
});