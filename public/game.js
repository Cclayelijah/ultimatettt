// Make connection
var socket = io.connect('http://localhost:4000');

// Global variables;
var ctoggle = 0; // 0 means chat box is closed

// Get player name
function setName() {
  var n = prompt("Enter a Name:");
  if (n != null) {
    // Send to server
    socket.emit('name', n);
  }
}

// Shows and hides chat box
function toggleChat() {
  if (ctoggle) {
    document.getElementById('board-wrapper').style.width = "100%"; // Hides chat box
    ctoggle = 0;
  } else {
    document.getElementById('board-wrapper').style.width = "auto"; // Shows chat box
    ctoggle = 1;
  }
}

// Listens for form submit event
function listenSubmit() {
  var form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); //stops the normal behavior of submit
  });
  console.log('listening for submit');
}

// Sends message in chatbox
function sendMessage() {
  var msg = document.getElementById('message').value;
  console.log(msg);
}