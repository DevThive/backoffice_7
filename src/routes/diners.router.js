import express from 'express';
import { DinersController } from '../controllers/diners.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const dinersController = new DinersController();

// 식당 등록
router.post('/', dinersController.createDiner);
// 전체 식당 조회
router.get('/', dinersController.getDiners);
// 특정 식당 조회
router.get('/:dinerId', dinersController.findDiner, dinersController.getDiner);
// 식당 정보 수정
router.patch(
  '/:dinerId',
  dinersController.findDiner,
  dinersController.updateDiner,
);
// 식당 삭제
router.delete(
  '/:dinerId',
  dinersController.findDiner,
  dinersController.deleteDiner,
);

export default router;
