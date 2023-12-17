import { OrdersService } from '../services/orders.service.js';
import { ProductsService } from '../services/products.service.js'

export class OrdersController {
  ordersService = new OrdersService();
  productsService = new ProductsService()

  // 식당별 주문 조회
  getOrdersByDiner = async (req, res) => {
    const { adminId } = res.locals.admin;
    if (adminId !== res.locals.diner.adminId)
      return res.status(401).json({ message: '권한이 없습니다.' });
    const orders = await this.ordersService.getOrdersByDiner(
      res.locals.diner.dinerId,
    );
    res.json({ orders });
  };

  // 특정 주문 찾기
  findOrder = async (req, res, next) => {
    const orderId = +req.params.orderId;
    if (isNaN(orderId))
      return res
        .status(404)
        .json({ message: '해당 주문이 존재하지 않습니다.' });
    const order = await this.ordersService.getOrderById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ message: '해당 주문이 존재하지 않습니다.' });
    res.locals.order = order;
    next();
  };

  // 주문 완료 처리
  updateOrder = async (req, res) => {
    const { adminId } = res.locals.user;
    const { dinerId } = res.locals.diner;
    if (
      adminId !== res.locals.diner.adminId ||
      dinerId !== res.locals.order.dinerId
    )
      return res.status(401).json({ message: '권한이 없습니다.' });
    if (res.locals.order.status !== 'ORDERED')
      return res.status(400).json({ message: '이미 배달 완료된 주문입니다.' });
    const product = await this.getProduct(res.locals.order.productId)
    const point = res.locals.order.amount*product.price
    await this.ordersService.updateOrder(res.locals.order.orderId,adminId,point);
    res.json({ message: '배달이 완료되었습니다.' });
  };
}
