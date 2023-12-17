import { prisma } from '../utils/prisma/index.js';

export class OrdersRepository {
  // 식당별 주문 조회
  getOrdersByDiner = async (dinerId) =>
    await prisma.orders.findMany({ where: { dinerId } });

  // 특정 주문 조회
  getOrderById = async (orderId) =>
    await prisma.orders.findUnique({ where: { orderId } });

  // 주문 완료 처리
  // 사장 계정으로 포인트 추가하기
  updateOrder = async (orderId) =>
    await prisma.orders.update({
      where: { orderId },
      data: { status: 'DELIVERED' },
    });
}
