var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('Public'))

io.on('connection', function (socket) {
  console.log('a user connected');
  io.emit('chat message', 'A new user has joined the chat');

  // This '/' path is the path of the page with the websockets connection on
  io.of('/').clients((error, clients) => {
    if (error) throw error;
    console.log(clients);
  });

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);

    // This will emit the event to all connected sockets
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function () {
    console.log('a user disconnected');
    io.emit('chat message', 'A user has left the chat');
  });
});

http.listen(port, function () {
  console.log(`listening on port ${port}`);
});
