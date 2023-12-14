import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  getDiner = async (adminId) => {
    try {
      // adminId를 이용하여 데이터베이스에서 diner 정보 조회
      const diner = await prisma.diners.findFirst({
        where: { adminId },
      });

      return diner;
    } catch (error) {
      // 에러 처리 로직 추가
      throw error;
    }
  };

  //메뉴 등록하기
  createProduct = async (adminId, title, description, price, imageUrl) => {
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
      const diner = await this.getDiner(adminId);
      if (!diner) {
        throw new Error('해당 식당을 찾을 수 없습니다.');
      }
      const createdProduct = await prisma.products.create({
        data: {
          title,
          description,
          price,
          imageUrl,
          adminId: adminId,
          Diner: {
            connect: {
              adminId: adminId,
            },
          },
        },
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

  getDiner = async (adminId) => {
    try {
      const diner = await prisma.diners.findFirst({
        where: { adminId },
      });
      return diner;
    } catch (error) {
      throw error;
    }
  };

  getDinerByAdminId = async (adminId) => {
    try {
      const diner = await prisma.diners.findFirst({
        where: { adminId },
      });
      return diner;
    } catch (error) {
      throw error;
    }
  };

  getProductWithDiner = async (productId, adminId) => {
    try {
      const product = await prisma.products.findUnique({
        where: { productId },
        include: {
          Diner: {
            select: {
              adminId: true,
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

  //메뉴 수정하기
  updateProduct = async (
    productId,
    title,
    description,
    price,
    imageUrl, // 클라이언트에서 전달한 imageUrl 값이 여기에 정상적으로 전달되는지 확인해보세요.
    adminId,
  ) => {
    try {
      const existingProduct = await prisma.products.findUnique({
        where: { productId },
        include: { Diner: true },
      });
      if (!existingProduct || !existingProduct.Diner) {
        throw new Error('해당 메뉴를 찾을 수 없습니다.');
      }

      // 여기서 dinerId를 이용하여 해당 메뉴가 속한 식당을 찾고,
      // adminId와 비교하여 일치하지 않으면 에러를 throw합니다.
      const diner = await this.getDinerByAdminId(adminId);
      const dinerId = diner.adminId;

      if (!diner) {
        throw new Error('해당 식당을 찾을 수 없습니다.');
      }

      if (existingProduct.Diner.adminId !== dinerId) {
        throw new Error('권한이 없습니다.');
      }

      // 변경하고자 하는 필드들을 data에 명시
      const updatedProduct = await prisma.products.update({
        where: { productId },
        data: {
          title,
          description,
          price,
          imageUrl,
        },
      });

      console.log('Updated Product:', updatedProduct);

      return updatedProduct;
    } catch (e) {
      throw e;
    }
  };
  //메뉴 삭제하기
  deleteProduct = async (productId, adminId) => {
    try {
      const existingProduct = await prisma.products.findUnique({
        where: { productId },
        include: { Diner: true },
      });
      const diner = await this.getDinerByAdminId(adminId);

      if (!diner) {
        throw new Error('해당 식당을 찾을 수 없습니다.');
      }

      if (!existingProduct || !existingProduct.Diner) {
        throw new Error('해당 메뉴를 찾을 수 없습니다.');
      }

      if (existingProduct.Diner.adminId !== diner.adminId) {
        throw new Error('권한이 없습니다.');
      }

      await prisma.products.delete({ where: { productId } });
    } catch (e) {
      throw e;
    }
  };
}
