import { OrdersService } from '../services/orders.service.js';

export class OrdersController {
  ordersService = new OrdersService();
  createOrder = async (req, res, next) => {
    try {
      const { productId, amount } = req.body;
      const { user } = res.locals;

      const productPrice = await this.ordersService.calculateProductPrice(
        productId,
        amount,
      );

      if (!productId || !amount) {
        res.status(400).json({ message: '메뉴와 수량을 모두 정해주세요.' });
        return;
      }

      await this.ordersService.createOrder(
        user,
        productId,
        amount,
        productPrice,
      );

      res.status(201).json({ message: '주문이 성공적으로 생성되었습니다.' });
    } catch (e) {
      next(e);
    }
  };
}
