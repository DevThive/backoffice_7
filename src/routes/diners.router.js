import express from 'express';
import { OrdersController } from '../controllers/orders.controller.js';
import { DinersController } from '../controllers/diners.controller.js';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware.js';

const router = express.Router();
const dinersController = new DinersController();
const ordersController = new OrdersController();

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

// 식당별 주문 조회
router.get(
  '/:dinerId/orders',
  authAdminMiddleware,
  dinersController.findDiner,
  ordersController.getOrdersByDiner,
);
// 주문 완료 처리
router.patch(
  '/:dinerId/orders/:orderId',
  authAdminMiddleware,
  dinersController.findDiner,
  ordersController.findOrder,
  ordersController.updateOrder,
);

export default router;
