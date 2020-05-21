// A function to set a cookie (from w3schools.com)
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  alert("Welcome again, " + cvalue);
  window.location.replace('game.html'); // logged in
}

// A function to get a cookie (from w3schools.com)
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// A function to check a cookie (from w3schools.com) - if exists you don't need to login
function checkCookie() {
  console.log("checking cookie");
  var cookie = getCookie('username');
  if (cookie != "") { //if cookie value is set
    if (true) { //if cookie is to be reset
      document.cookie = "username=Elijah; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/;"; //deletes getCookie
      setCookie('username', cookie, 30); //sets cookie again
    }
    window.location.replace('game.html'); // Skip login
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

// Handles the Login
function login() {
  var username = document.getElementById('name').value;
  setCookie('username', username, 30);
}