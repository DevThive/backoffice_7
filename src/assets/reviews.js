window.onload = () => {
  loadReviewsFromLocalStorage();
  updateReviewsDisplay();
};

let selectedRating = 0;
const reviewsArray = [];

function loadReviewsFromLocalStorage() {
  const storedReviews = localStorage.getItem('reviewsArray');
  if (storedReviews) {
    reviewsArray.push(...JSON.parse(storedReviews));
  }
}

function saveReviewsToLocalStorage() {
  localStorage.setItem('reviewsArray', JSON.stringify(reviewsArray));
}

function setRating(rating) {
  selectedRating = rating;
  updateStarColors();
}

function updateStarColors() {
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < selectedRating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

function submitReview() {
  const reviewText = document.querySelector('.review-textarea').value.trim();
  if (selectedRating === 0 || reviewText === '') {
    alert('별점과 리뷰를 모두 작성해주세요.');
    return;
  }

  const newReview = {
    rating: selectedRating,
    text: reviewText,
    date: new Date().toLocaleString(),
  };
  reviewsArray.unshift(newReview);
  addReviewToDisplay(newReview, 0);
  saveReviewsToLocalStorage();
  clearReviewForm();
}

function clearReviewForm() {
  document.querySelector('.review-textarea').value = '';
  selectedRating = 0;
  updateStarColors();
}

function addReviewToDisplay(review, index) {
  const reviewsList = document.getElementById('reviewsList');

  const reviewElement = document.createElement('div');
  reviewElement.classList.add('review');
  reviewElement.innerHTML = `
    <p>${review.date}</p>
    <p>별점: ${'⭐'.repeat(review.rating)}</p>
    <p>${review.text}</p>
    <div class="review-options">
      <button onclick="editReview(${index})">수정</button>
      <button onclick="deleteReview(${index})">삭제</button>
    </div>
  `;

  reviewsList.prepend(reviewElement);
}

function updateReviewsDisplay() {
  const reviewsList = document.getElementById('reviewsList');
  reviewsList.innerHTML = '';

  reviewsArray.forEach((review, index) => {
    addReviewToDisplay(review, index);
  });
}

function editReview(index) {
  // 수정 평점을 받기 위해 prompt 대신에 별점 선택 팝업을 사용
  const editedRating = prompt(
    '리뷰를 수정하세요 (1에서 5까지의 별점을 선택하세요):',
    reviewsArray[index].rating,
  );
  const editedText = prompt(
    '리뷰 내용을 수정하세요:',
    reviewsArray[index].text,
  );

  // 수정 평점이 유효한 범위인지 확인
  if (editedRating !== null && editedRating >= 1 && editedRating <= 5) {
    reviewsArray[index].rating = parseInt(editedRating, 10); // 정수로 변환
    reviewsArray[index].text = editedText;
    reviewsArray[index].date = new Date().toLocaleString();
    updateReviewsDisplay();
    saveReviewsToLocalStorage();
  } else if (editedRating !== null) {
    alert('1에서 5까지의 유효한 별점을 입력하세요.');
  }
}

function deleteReview(index) {
  const confirmDelete = confirm('정말로 이 리뷰를 삭제하시겠습니까?');
  if (confirmDelete) {
    reviewsArray.splice(index, 1);
    updateReviewsDisplay();
    saveReviewsToLocalStorage();
  }
}
