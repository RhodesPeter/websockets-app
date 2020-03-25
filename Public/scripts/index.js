var socket = io();

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // prevents page reloading
  var textInput = document.querySelector('.text-input');
  socket.emit('chat message', textInput.value);
  textInput.value = '';
  return false;
});

socket.on('chat message', function (msg) {
  var liElement = document.createElement('li')
  liElement.textContent = msg;

  document.querySelector('#messages').append(liElement);
});