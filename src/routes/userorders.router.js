import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { OrdersController } from '../controllers/userorders.controller.js';

const router = express.Router();
const ordersController = new OrdersController();

router.post('/diner/:dinerId', authMiddleware, ordersController.createOrder);

router.get(
  '/diner/:dinerId',
  authMiddleware,
  ordersController.getProductByDiner,
);
export default router;
