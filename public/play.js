// Make connection
var socket = io('/classic');
import user from '/login.js';

// Global variables;
var game;
var player;
var color = "";
var name = "Guest";
var ctoggle = 0; // 0 means chat box is closed

// Shows and hides chat box
var toggleChat = function() {
  if (ctoggle) {
    document.getElementById('board-wrapper').style.width = "100%"; // Hides chat box
    ctoggle = 0;
  } else {
    document.getElementById('board-wrapper').style.width = "auto"; // Shows chat box
    ctoggle = 1;
  }
};

// Handles form submission
var onFormSubmit = function(event) {
  event.preventDefault(); //stops the normal behavior of submit
  var msg = document.getElementById('message').value;
  document.getElementById('message').value = '';
  var date = new Date();
  socket.emit('chat-message', {
    bgColor: 'fill-' + color,
    msg: msg,
    name: user.name,
  }); // passes string argument of the classname to give msg bg color.
  //socket.emit('message', msg);
};

socket.on('join', function(data) {
  game = data.gameid;
  player = data.playernum;

  if (player == 1) {
    color = "blue";
    var myNum = document.getElementById('myPlayerNum');
    myNum.innerHTML = "Player 1";
    myNum.style.color = "#D1ECF1";
    var opponentNum = document.getElementById('opponentPlayerNum');
    opponentNum.innerHTML = "Player 2";
    opponentNum.style.color = "#F8D7DA";
  } else if (player == 2) {
    color = "red";
    var myNum = document.getElementById('myPlayerNum');
    myNum.innerHTML = "Player 2";
    myNum.style.color = "#F8D7DA";
    var opponentNum = document.getElementById('opponentPlayerNum');
    opponentNum.innerHTML = "Player 1";
    opponentNum.style.color = "#D1ECF1";
  } else {
    console.log("There was an error assigning player");
  }
});

function getTimeStamp() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ext = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // To display "0" as "12"
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ":" + minutes + " " + ext;
}

socket.on('chat-message', function(message) {
  console.log("new message received");
  var h5 = '<h5 class="mb-1">' + message.name + '</h5>';
  var sm = '<small class="text-muted">' + getTimeStamp() + '</small>';
  var d1 = '<div class="msg-head d-flex w-100 justify-content-between"></div>';
  var p = '<p class="mb-1">' + message.msg + '</p>';
  var chatItem = '<div class="list-group-item flex-column ' + message.bgColor + '"></div>';
  $("#chatList").append(chatItem);
  $("#chatList .list-group-item").last().append(d1, p);
  $(".msg-head").last().append(h5, sm);
});

document.querySelector('form').addEventListener('submit', onFormSubmit);
document.querySelector('#toggleChat').addEventListener('click', toggleChat);
$(".small-box").hover(function() {
    $(this).addClass(color);
  },
  function() {
    $(this).removeClass(color);
  });