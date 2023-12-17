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
  const editedText = prompt('리뷰를 수정하세요:', reviewsArray[index].text);
  if (editedText !== null) {
    reviewsArray[index].text = editedText;
    reviewsArray[index].date = new Date().toLocaleString(); // 수정 시간 업데이트
    updateReviewsDisplay();
    saveReviewsToLocalStorage();
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
