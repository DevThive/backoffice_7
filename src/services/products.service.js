import { ProductsRepository } from '../repositoryies/products.repository.js';

export class ProductsService {
  productsRepository = new ProductsRepository();

  //메뉴 등록하기
  createProduct = async (title, description, price, imageUrl) => {
    try {
      await this.productsRepository.createProduct(
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

  //메뉴 수정하기
  updateProduct = async (productId, title, description, price, imageUrl) => {
    try {
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
  deleteProduct = async (productId) => {
    await this.productsRepository.deleteProduct(productId);
  };
}
