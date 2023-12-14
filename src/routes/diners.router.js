import express from 'express';
import { DinersController } from '../controllers/diners.controller.js';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware.js';

const router = express.Router();
const dinersController = new DinersController();

// 식당 등록
router.post('/', authAdminMiddleware, dinersController.createDiner);
// 전체 식당 조회
router.get('/', dinersController.getDiners);
// 식당 키워드 검색
router.get('/search', dinersController.searchDiners);
// 특정 식당 조회
router.get('/:dinerId', dinersController.findDiner, dinersController.getDiner);
// 식당 정보 수정
router.patch(
  '/:dinerId',
  authAdminMiddleware,
  dinersController.findDiner,
  dinersController.updateDiner,
);
// 식당 삭제
router.delete(
  '/:dinerId',
  authAdminMiddleware,
  dinersController.findDiner,
  dinersController.deleteDiner,
);

export default router;
