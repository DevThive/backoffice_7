let selectedRating = 0;

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
  alert(`별점: ${selectedRating}\n리뷰등록이 완료 되었습니다!`);
}
