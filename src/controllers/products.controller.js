import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  productsService = new ProductsService();

  //메뉴 생성하기
  createProduct = async (req, res, next) => {
    try {
      const adminId = res.locals.user.adminId;
      const { title, description, price, imageUrl } = req.body;
      if (!title)
        return res.status(400).json({ message: '메뉴 이름을 입력해주세요.' });
      if (!description)
        return res.status(400).json({ message: '메뉴 내용을 입력해주세요.' });
      if (!price)
        return res.status(400).json({ message: '메뉴 가격을 입력해주세요.' });
      if (!imageUrl)
        return res.status(400).json({ message: '메뉴 이미지를 넣어주세요.' });

      const newProduct = await this.productsService.createProduct(
        adminId,
        title,
        description,
        price,
        imageUrl,
      );
      res.status(201).json({ message: '메뉴를 등록하였습니다.' });
    } catch (e) {
      next(e);
    }
  };

  //전체메뉴 조회
  getProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.getProducts();
      if (!products) {
        res.status(404).json({ message: '메뉴가 존재하지 않습니다.' });
      }
      res.json({ products });
    } catch (e) {
      next(e);
    }
  };

  //특정메뉴 조회
  getProduct = async (req, res, next) => {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId) || productId <= 0) {
      res.status(400).json({ message: '잘못된 메뉴 ID입니다.' });
      return;
    }
    try {
      const product = await this.productsService.getProduct(productId);
      if (!product) {
        res.status(404).json({ message: '존재하지 않는 메뉴입니다.' });
      } else {
        res.json({ product });
      }
    } catch (e) {
      next(e);
    }
  };

  // 특정 식당의 메뉴 조회
  getProductsByDiner = async (req, res, next) => {
    try {
      const dinerId = +req.params.dinerId;
      const dinerExists = await this.productsService.checkDinerExists(dinerId);
      if (!dinerExists) {
        // 식당이 없을 경우
        res.status(404).json({ message: '해당 식당이 존재하지 않습니다.' });
        return;
      }

      const diner = await this.productsService.getProductsByDiner(dinerId);
      if (!diner || diner.length === 0) {
        // 식당 정보가 없을 경우
        res.status(404).json({ message: '해당 식당의 메뉴가 없습니다.' });
        return;
      }
      res.json({ diner });
    } catch (e) {
      next(e);
    }
  };

  //메뉴 수정
  updateProduct = async (req, res, next) => {
    const productId = parseInt(req.params.productId);
    try {
      const { title, description, price, imageUrl } = req.body;
      if (!title && !description && !price && !imageUrl) {
        res.status(404).json({ message: '수정 내용을 입력해주세요.' });
      }
      if (!productId) {
        res.status(404).json({ message: '없는 메뉴입니다.' });
      }
      const adminId = res.locals.user.adminId;
      const updatedProduct = await this.productsService.updateProduct(
        adminId,
        productId,
        title,
        description,
        price,
        imageUrl,
      );
      res.json({ message: '수정완료', updatedProduct });
    } catch (e) {
      next(e);
    }
  };

  //메뉴 삭제
  deleteProduct = async (req, res, next) => {
    const adminId = res.locals.user.adminId;
    const productId = parseInt(req.params.productId);
    await this.productsService.deleteProduct(productId, adminId);
    res.status(200).json({ message: '삭제완료.' });
  };
}
