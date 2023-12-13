import { ReviewsRepository } from '../repositoryies/reviews.repository.js';

export class ReviewsService {
  constructor() {
    this.reviewsRepository = new ReviewsRepository();
  }

  readMany = async ({ sort }) => {
    const reviews = await this.reviewsRepository.readMany({ sort });

    return reviews;
  };

  readOne = async ({ reviewId }) => {
    const review = await this.reviewsRepository.readOne({ reviewId });

    return review;
  };

  createOne = async ({ rating, content, userId, userName }) => {
    const review = await this.reviewsRepository.createOne({
      rating,
      content,
      userId,
      userName,
    });
  };

  updateOne = async ({ userId, userName, id, rating, content }) => {
    // 일치하지 않는 리뷰가 존재하지 않는 경우
    const review = await this.reviewsRepository.readOneById(id);

    // 작성자 ID와 인증 정보의 사용자 ID가 다른 경우\
    const isReviewOwner = review.userId === userId;
    if (!isReviewOwner) {
      throw new HttpStatus.Forbidden('리뷰 수정 권한이 없습니다.');
    }

    const updateReview = await this.reviewsRepository.updateOneById(id, {
      rating,
      content,
    });

    return { ...updateReview, userName };
  };

  deleteOne = async ({ userId, userName, id }) => {
    // 일치하지 않는 리뷰가 존재하지 않는 경우
    const review = await this.reviewsRepository.readOneById(id);

    // 작성자 ID와 인증 정보의 사용자 ID가 다른 경우
    const isReviewOwner = review.userId === userId;
    if (!isReviewOwner) {
      throw new HttpStatus.Forbidden('리뷰 삭제 권한이 없습니다.');
    }

    const deletedReview = await this.reviewsRepository.deleteOneById(id);

    return { ...deletedReview, userName };
  };
}
