import { OrdersService } from '../services/userorders.service.js';

export class OrdersController {
  ordersService = new OrdersService();
  createOrder = async (req, res, next) => {
    try {
      const dinerId = +req.params.dinerId;
      const { productId, amount } = req.body;
      const { user } = res.locals;

      const productPrice = await this.ordersService.calculateProductPrice(
        productId,
        amount,
      );

      console.log(productId, amount);
      if (!productId || !amount) {
        res.status(400).json({ message: '메뉴와 수량을 모두 정해주세요.' });
        return;
      }
      await this.ordersService.createOrder(
        user,
        productId,
        amount,
        dinerId,
        productPrice,
      );

      res.status(201).json({ message: '주문이 성공적으로 생성되었습니다.' });
    } catch (e) {
      next(e);
    }
  };

  getProductByDiner = async (req, res, next) => {
    try {
      const dinerId = +req.params.dinerId;
      const dinerExists = await this.ordersService.checkDinerExists(dinerId);
      if (!dinerExists) {
        // 식당이 없을 경우
        res.status(404).json({ message: '해당 식당이 존재하지 않습니다.' });
        return;
      }

      const products = await this.ordersService.getProductsByDiner(dinerId);
      if (!products || products.length === 0) {
        // 식당 정보가 없을 경우
        res.status(404).json({ message: '해당 식당의 메뉴가 없습니다.' });
        return;
      }
      res.json({ products });
    } catch (e) {
      next(e);
    }
  };
}
