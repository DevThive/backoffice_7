import express from 'express';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ReviewsController } from '../controllers/reviews.controller.js';

const router = express.Router();
const reviewsController = new ReviewsController();

// 리뷰 조회
router.get('', reviewsController.readMany);
// 리뷰 상세 조회
router.get('/:reviewId', reviewsController.readOne);
// 리뷰 등록
router.post('', authMiddleware, reviewsController.createOne);
// 리뷰 수정
router.put('/:reviewId', authMiddleware, reviewsController.updateOne);
// 리뷰 삭제
router.delete('/:reviewId', authMiddleware, reviewsController.deleteOne);

export default router;
