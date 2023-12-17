import { OrdersRepository } from '../repositoryies/userorders.repository.js';

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

  async checkDinerExists(dinerId) {
    try {
      const dinerExists = await this.ordersRepository.checkDinerExists(dinerId);
      return !!dinerExists;
    } catch (e) {
      throw e;
    }
  }

  getProductsByDiner = async (dinerId) => {
    return await this.ordersRepository.getProductsByDiner(dinerId);
  };

  async hasPermission(dinerId, productId) {
    try {
      const diner = await this.productsRepository.getDinerByDinerId(dinerId);
      const productWithDiner = await this.ordersRepository.getProductWithDiner(
        productId,
        dinerId,
      );

      console.log(productWithDiner);

      if (!diner || !productWithDiner || !productWithDiner.Diner) {
        throw new Error('권한이 없습니다.');
      }

      return diner.adminId === productWithDiner.Diner.adminId;
    } catch (e) {
      throw e;
    }
  }
}
