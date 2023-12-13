import { ReviewsService } from '../services/reviews.service.js';

export class ReviewsController {
  constructor() {
    this.reviewsService = new ReviewsService();
  }

  readMany = async (req, res, next) => {
    try {
      const { sort } = req.query;
      let upperCaseSort = sort?.toUpperCase();

      if (upperCaseSort !== 'ASC' && upperCaseSort !== 'DESC') {
        upperCaseSort = 'DESC';
      }

      const data = await this.reviewsService.readMany({
        sort: upperCaseSort,
      });

      return res.status(200).json({
        success: true,
        message: '리뷰 목록 조회에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { reviewId } = req.params;

      const review = await this.reviewsService.readOne({ id: +reviewId });

      return res.status(200).json({
        success: true,
        message: '리뷰 상세 조회에 성공했습니다.',
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };

  createOne = async (req, res, next) => {
    try {
      const user = res.locals.user;
      if (!user || !user.id) {
        return res.status(500).json({ error: '사용자 정보가 누락되었습니다.' });
      }

      const { id: userId, name: userName } = res.locals.user;
      const { rating, content } = req.body;

      if (!rating) {
        return res.status(400).json({
          success: false,
          message: '별점 등록이 필요합니다.',
        });
      }

      if (!content) {
        return res.status(400).json({
          success: false,
          message: '리뷰 내용 입력이 필요합니다.',
        });
      }

      const data = await this.reviewsService.createOne({
        rating,
        content,
        userId,
        userName,
      });

      return res.status(201).json({
        success: true,
        message: '리뷰 작성에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOne = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { rating, content } = req.body;
      const { id: userId, name: userName } = res.locals.user;

      // 수정 정보가 하나도 없는 경우
      if (!rating && !content) {
        return res.status(400).json({
          success: false,
          message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
        });
      }

      const isValidRating = rating >= 1 && rating <= 5;

      if (!isValidRating) {
        return res.status(400).json({
          success: false,
          message: '지원하지 않는 평가입니다. (평가: 1부터 5까지)',
        });
      }

      const data = await this.reviewsService.updateOne({
        userId,
        userName,
        id: +reviewId,
        rating,
        content,
      });

      return res.status(200).json({
        success: true,
        message: '리뷰 수정에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { id: userId, name: userName } = res.locals.user;

      const data = await this.reviewsService.deleteOne({
        userId,
        userName,
        id: +reviewId,
      });

      return res.status(200).json({
        success: true,
        message: '리뷰 삭제에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
