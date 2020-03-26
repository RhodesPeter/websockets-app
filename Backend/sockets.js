const sockets = (io) => {
  io.on('connection', function (socket) {
    console.log('a user connected');
    io.emit('chat message', '* A new user has joined the chat *');

    socket.on('chat message', function (msg) {
      console.log('message: ' + msg);

      // This will emit the event to all connected sockets
      io.emit('chat message', msg);
    });

    emitUpdateUsersEvent(io);

    socket.on('disconnect', function () {
      console.log('a user disconnected');
      io.emit('chat message', '* A user has left the chat *');

      emitUpdateUsersEvent(io);
    });
  });
}

const emitUpdateUsersEvent = (io) => {
  // This '/' path is the path of the page with the websockets connection on
  io.of('/').clients((error, clients) => {
    if (error) throw error;
    io.emit('connected users', clients);
  });
};

module.exports = sockets;