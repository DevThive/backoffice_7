// 리뷰 조회
function fetchReviews(dinerId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/${dinerId}/reviews`,
    success: function (response) {
      callback(response.data);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
    },
  });
}

// 리뷰 상세 조회
function fetchReviewDetail(dinerId, reviewId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/${dinerId}/reviews/${reviewId}`,
    success: function (response) {
      callback(response.data);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert('로그인이 필요합니다.');
      } else if (status == 404) {
        alert('존재하지 않는 리뷰입니다.');
      } else {
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
    },
  });
}

// 리뷰 등록
function submitReview(dinerId, rating, content, callback) {
  $.ajax({
    type: 'POST',
    url: `/api/${dinerId}/reviews`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      rating: rating,
      content: content,
    },
    success: function (response) {
      callback(response.data);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
    },
  });
}

// 리뷰 수정
function updateReview(dinerId, reviewId, rating, content, callback) {
  $.ajax({
    type: 'PUT',
    url: `/api/${dinerId}/reviews/${reviewId}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      rating: rating,
      content: content,
    },
    success: function (response) {
      callback(response.data);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert('로그인이 필요합니다.');
      } else if (status == 404) {
        alert('존재하지 않는 리뷰입니다.');
      } else {
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
    },
  });
}

// 리뷰 삭제
function deleteReview(dinerId, reviewId, callback) {
  $.ajax({
    type: 'DELETE',
    url: `/api/${dinerId}/reviews/${reviewId}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    success: function (response) {
      callback(response.data);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert('로그인이 필요합니다.');
      } else if (status == 404) {
        alert('존재하지 않는 리뷰입니다.');
      } else {
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
    },
  });
}
