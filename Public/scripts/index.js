var socket = io();

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // prevents page reloading
  var textInput = document.querySelector('.chat__text-input');

  if (textInput.value.length > 0) {
    socket.emit('chat message', textInput.value);
    textInput.value = '';
    return false;
  }
});

socket.on('chat message', function (msg) {
  var liElement = document.createElement('li')
  liElement.textContent = msg;

  document.querySelector('.chat__messages').append(liElement);
});

socket.on('connected users', function (users) {
  var usersList = document.querySelector('.chat__users-list');
  usersList.innerHTML = '';

  users.forEach(user => {
    var liElement = document.createElement('li');
    liElement.classList.add('chat__user-list-item');
    liElement.textContent = user;
    usersList.append(liElement);
  });
});