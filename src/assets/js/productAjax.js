// 메뉴 조회
function fetchReviews(dinerId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/proudcts/diner/${dinerId}`,
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

// 메늎 상세 조회
function fetchReviewDetail(dinerId, productId, callback) {
  $.ajax({
    type: 'GET',
    url: `/api/products/${productId}/diner/${dinerId}`,
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
