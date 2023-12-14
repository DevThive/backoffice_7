import express from 'express';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware.js';
import { ProductsController } from '../controllers/products.controller.js';

const productsController = new ProductsController();
const router = express.Router();

//메뉴 생성
router.post('/', authAdminMiddleware, productsController.createProduct);

//메뉴 조회
router.get('/', productsController.getProducts);

//특정 메뉴조회
router.get('/:productId', productsController.getProduct);

//메뉴 수정
router.put(
  '/:productId',
  authAdminMiddleware,
  productsController.updateProduct,
);

//메뉴 삭제
router.delete(
  '/:productId',
  authAdminMiddleware,
  productsController.deleteProduct,
);

export default router;
