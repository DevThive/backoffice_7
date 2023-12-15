import { OrdersRepository } from '../repositoryies/orders.repository.js';

export class OrdersService {
  ordersRepository = new OrdersRepository();

  async calculateProductPrice(productId, amount) {
    return await this.ordersRepository.calculateProductPrice(productId, amount);
  }

  async createOrder(user, productId, amount, productPrice) {
    await this.ordersRepository.createOrder(
      user,
      productId,
      amount,
      productPrice,
    );
  }
}
