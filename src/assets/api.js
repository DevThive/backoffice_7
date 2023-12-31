function getSelf(callback) {
  $.ajax({
    type: 'GET',

    url: '/api/users/auth/user/me',

    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    success: function (response) {
      console.log(response.user);

      callback(response.user);
    },
    error: function (xhr, status, error) {
      if (status == 500) {
        alert('로그인이 필요합니다.');
      } else {
        localStorage.clear();
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
      window.location.href = '/';
    },
  });
}

function admingetSelf(callback) {
  $.ajax({
    type: 'GET',

    url: '/api/users/auth/admin/me',

    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    success: function (response) {
      console.log(response.user);

      callback(response.user);
    },
    error: function (xhr, status, error) {
      if (status == 500) {
        alert('로그인이 필요합니다.');
      } else {
        localStorage.clear();
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
      window.location.href = '/';
    },
  });
}

//포스트 (메뉴 및 업장 정보 가져올 때 사용)
function getPostDetail(postId, callback) {
  $.ajax({
    type: 'GET',
    url: `/posts/${postId}`,
    error: function (xhr, status, error) {
      if (status == 401) {
        alert('로그인이 필요합니다.');
      } else if (status == 404) {
        alert('존재하지 않는 상품입니다.');
      } else {
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
      window.location.href = '/post.html';
    },
    success: function (response) {
      console.log(response);
      //callback(response.goods);
    },
  });
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
