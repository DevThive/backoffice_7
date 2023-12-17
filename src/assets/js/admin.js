let adminId;

async function getUserInfo() {
  const json = await await fetch('/user/me');
}

function sign_in() {
  let email = $('#inputEmail').val();
  let password = $('#inputPassword').val();
  console.log(email, password);
  $.ajax({
    type: 'POST',
    url: '/auth/login',
    data: {
      email: email,
      password: password,
    },
    success: function (response) {
      localStorage.setItem('token', response.token);
      console.log(response.token);
      //window.location.replace('/main.html');
    },
    error: function (error) {
      customAlert(error.responseJSON.message);
    },
  });
}

function customAlert(text) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
}

function remove() {
  window.localStorage.removeItem('token');
  window.location.replace('/');
}

function setAdminId(id) {
  adminId = id;
}

async function toMyDiner() {
  try {
    const diner = await adminHasDiner(adminId);
    if (!diner) return alert('등록하신 식당이 없습니다.');
    console.log(diner);
    window.location.replace(`/html/edit-diner.html?dinerId=${diner}`);
  } catch (e) {
    console.log(e);
    alert(
      e.response?.data?.message ||
        e.response?.data?.errorMessage ||
        '오류가 발생했습니다.',
    );
  }
}
