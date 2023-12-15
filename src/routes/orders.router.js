import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { OrdersController } from '../controllers/orders.controller.js';

const router = express.Router();
const ordersController = new OrdersController();

router.post('/diner/:dinerId', authMiddleware, ordersController.createOrder);

export default router;
