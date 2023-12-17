import { ProductsRepository } from '../repositoryies/products.repository.js';

export class ProductsService {
  productsRepository = new ProductsRepository();

  //메뉴 등록하기
  createProduct = async (adminId, title, description, price, imageUrl) => {
    try {
      await this.productsRepository.createProduct(
        adminId,
        title,
        description,
        price,
        imageUrl,
      );
    } catch (e) {
      throw e;
    }
  };

  //모든 메뉴 조회하기
  getProducts = async () => await this.productsRepository.getProducts();

  //특정 메뉴 조회하기
  getProduct = async (productId) => {
    return await this.productsRepository.getProduct(productId);
  };

  //특정 식당의 메뉴조회

  async checkDinerExists(dinerId) {
    try {
      const dinerExists = await this.productsRepository.checkDinerExists(
        dinerId,
      );
      return !!dinerExists;
    } catch (e) {
      throw e;
    }
  }

  getProductsByDiner = async (dinerId) => {
    return await this.productsRepository.getProductsByDiner(dinerId);
  };

  async hasPermission(adminId, productId) {
    try {
      const diner = await this.productsRepository.getDinerByAdminId(adminId);
      const productWithDiner =
        await this.productsRepository.getProductWithDiner(productId, adminId);

      console.log(productWithDiner);

      if (!diner || !productWithDiner || !productWithDiner.Diner) {
        throw new Error('권한이 없습니다.');
      }

      return diner.adminId === productWithDiner.Diner.adminId;
    } catch (e) {
      throw e;
    }
  }
  //메뉴 수정하기
  updateProduct = async (
    adminId,
    productId,
    title,
    description,
    price,
    imageUrl,
  ) => {
    try {
      const hasPermission = await this.hasPermission(adminId, productId);

      if (!hasPermission) {
        throw new Error('권한이 없습니다.');
      }

      await this.productsRepository.updateProduct(
        productId,
        title,
        description,
        price,
        imageUrl,
      );
    } catch (e) {
      throw e;
    }
  };

  //메뉴 삭제하기
  deleteProduct = async (productId, adminId) => {
    await this.productsRepository.deleteProduct(productId, adminId);
  };
}
