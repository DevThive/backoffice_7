async function getUserInfo() {
  const json = await fetch('/user/me');
}

function customAlert(text) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
}
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function remove() {
  window.localStorage.removeItem('token');
  deleteCookie('Authorization');
  window.location.replace('/');
}
