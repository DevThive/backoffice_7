import { prisma } from '../utils/prisma/index.js';

export class OrdersRepository {
  async getProductPrice(productId) {
    const product = await prisma.products.findUnique({
      where: { productId },
      select: { price: true },
    });

    if (!product) {
      throw new Error('해당 상품이 존재하지 않습니다.');
    }

    return product.price;
  }
  async updatePoint(user, deductedPoint) {
    await prisma.users.update({
      where: { userId: user.userId },
      data: {
        point: {
          decrement: deductedPoint,
        },
      },
    });
  }

  async calculateProductPrice(productId, amount) {
    const product = await prisma.products.findUnique({
      where: { productId },
      select: { price: true },
    });
    if (!product) {
      throw new Error('해당 상품이 존재하지 않습니다.');
    }
    const productPrice = parseFloat(product.price.replace('원', '')) * amount;

    return productPrice;
  }

  async createOrder(user, productId, amount, dinerId) {
    const dinerExists = await this.checkDinerExists(dinerId);
    if (!dinerExists) {
      throw new Error('해당 식당이 존재하지 않습니다.');
    }
    const productPrice = await this.calculateProductPrice(productId, amount);
    const product = await prisma.products.findUnique({
      where: { productId },
      select: { dinerId: true },
    });

    if (!product) {
      throw new Error('해당 제품이 존재하지 않습니다.');
    }
    const userWithPoint = await prisma.users.findUnique({
      where: { userId: user.userId },
      select: { point: true },
    });
    const userPoint = userWithPoint?.point ?? 0;
    console.log(userWithPoint);
    console.log(productPrice);
    if (userPoint < productPrice) {
      throw new Error('포인트가 부족하여 주문을 생성할 수 없습니다.');
    }

    const transaction = await prisma.$transaction([
      // 주문 생성
      prisma.orders.create({
        data: {
          amount,
          dinerId: product.dinerId,
          userId: user.userId,
          productId,
          status: 'ORDERED',
        },
      }),
      // 사용자 포인트 차감
      prisma.users.update({
        where: { userId: user.userId },
        data: {
          point: {
            decrement: productPrice,
          },
        },
      }),
    ]);

    // 트랜잭션 성공 시 반환
    return transaction[0];
  }

  getProductsByDiner = async (dinerId) => {
    try {
      const products = await prisma.products.findMany({
        where: { dinerId },
      });
      return products;
    } catch (error) {
      throw error;
    }
  };

  // 식당 dinerId가 존재하나 확인
  checkDinerExists = async (dinerId) => {
    try {
      const diner = await prisma.diners.findUnique({
        where: { dinerId },
      });

      return !!diner;
    } catch (error) {
      throw error;
    }
  };
  getDinerByDinerId = async (dinerId) => {
    try {
      const diner = await prisma.diners.findUnique({
        where: { dinerId },
      });
      return diner;
    } catch (error) {
      throw error;
    }
  };

  getProductWithDiner = async (productId, dinerId) => {
    try {
      const product = await prisma.products.findUnique({
        where: { productId },
        include: {
          Diner: {
            select: {
              dinerId: true,
            },
          },
        },
      });

      if (!product || product.dinerId !== product.adminId) {
        throw new Error('해당 메뉴를 찾을 수 없거나 권한이 없습니다.');
      }

      return product;
    } catch (error) {
      throw error;
    }
  };
}
