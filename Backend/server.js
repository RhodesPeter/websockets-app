var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('Public'))

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);

    // This will emit the event to all connected sockets
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(port, function () {
  console.log(`listening on port ${port}`);
});
