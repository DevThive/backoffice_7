async function getUserInfo() {
  const json = await await fetch('/user/me');
}

function customAlert(text) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
}

function remove() {
  window.localStorage.removeItem('token');
  window.location.replace('/');
}
