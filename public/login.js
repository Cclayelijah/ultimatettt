var user = {
  name: "",
  exp: 0
};

$('#login-form').on('submit', function(event) {
  event.preventDefault(); //stops the normal behavior of submit
  user.name = document.getElementById('name').value;
  window.location.replace('/play.html');
});

export { user };