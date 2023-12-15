import { prisma } from '../utils/prisma/index.js';

export class OrdersRepository {
  async getProductPrice(productId) {
    const product =
      await prisma.$queryRaw`SELECT price FROM products WHERE productId = ${productId}`;

    if (!product || !product.length) {
      throw new Error('해당 상품이 존재하지 않습니다.');
    }

    return product[0].price;
  }
  async updatePoint(user, deductedPoint) {
    await prisma.$executeRaw`UPDATE users SET point = point - ${deductedPoint} WHERE userId = ${user.userId}`;
  }

  async createOrder(user, productId, amount, dinerId) {
    await prisma.$executeRaw`
      INSERT INTO orders (amount, dinerId, userId, productId, status)
      VALUES (${amount}, ${dinerId}, ${user.userId}, ${productId}, 'ORDERED')
    `;
  }
}
