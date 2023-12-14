import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  //메뉴 등록하기
  createProduct = async (title, description, price, imageUrl) => {
    try {
      //매장내 동일메뉴 불가
      const existingProduct = await prisma.products.findFirst({
        where: {
          title: title,
        },
      });
      if (existingProduct) {
        throw new Error('이미 존재하는 메뉴입니다.');
      }
      const createdProduct = await prisma.products.create({
        data: { title, description, price, imageUrl },
      });
      const productId = createdProduct.productId;
      return createdProduct;
    } catch (e) {
      throw e;
    }
  };

  //전체 메뉴 조회하기
  getProducts = async () => await prisma.products.findMany();

  //특정 메뉴 조회하기
  getProduct = async (productId) =>
    await prisma.products.findUnique({
      where: { productId },
    });

  //메뉴 수정하기
  updateProduct = async (productId, title, description, price, imageUrl) => {
    try {
      await prisma.products.update({
        where: { productId },
        data: { title, description, price, imageUrl },
      });
    } catch (e) {
      throw e;
    }
  };

  //메뉴 삭제하기
  deleteProduct = async (productId) =>
    await prisma.products.delete({ where: { productId } });
}
