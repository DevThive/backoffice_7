import { OrdersRepository } from '../repositoryies/orders.repository.js';

export class OrdersService {
  ordersRepository = new OrdersRepository();

  // 식당별 주문 조회
  getOrdersByDiner = async (dinerId) =>
    await this.ordersRepository.getOrdersByDiner(dinerId);

  // 특정 주문 조회
  getOrderById = async (orderId) =>
    await this.ordersRepository.getOrderById(orderId);

  // 주문 완료 처리
  updateOrder = async (orderId) =>
    await this.ordersRepository.updateOrder(orderId);
}
