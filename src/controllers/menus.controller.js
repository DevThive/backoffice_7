import { MenusService } from '../services/menus.service.js';

export class MenusController {
  menusService = new MenusService();

  //메뉴 생성하기
  createMenu = async (req, res, next) => {
    try {
      const { title, description, price } = req.body;
      if (!title)
        return res.status(400).json({ message: '메뉴 이름을 입력해주세요.' });
      if (!description)
        return res.status(400).json({ message: '메뉴 내용을 입력해주세요.' });
      if (!price)
        return res.status(400).json({ message: '메뉴 가격을 입력해주세요.' });

      const newMenu = await this.menusService.createMenu(
        title,
        description,
        price,
      );
      res.status(201).json({ message: '메뉴를 등록하였습니다.' });
    } catch (e) {
      next(e);
    }
  };

  //전체메뉴 조회
  getMenus = async (req, res, next) => {
    try {
      const menus = await this.menusService.getMenus();
      res.json({ menus });
    } catch (e) {
      next(e);
    }
  };

  //특정메뉴 조회
  getMenu = async (req, res, next) => {
    const menuId = parseInt(req.params.menuId);
    if (isNaN(menuId) || menuId <= 0) {
      res.status(400).json({ message: '잘못된 메뉴 ID입니다.' });
      return;
    }
    try {
      const menu = await this.menusService.getMenu(menuId);
      if (!menu) {
        res.status(404).json({ message: '존재하지 않는 메뉴입니다.' });
      } else {
        res.json({ menu });
      }
    } catch (e) {
      next(e);
    }
  };

  //메뉴 수정
  updateMenu = async (req, res, next) => {
    const menuId = parseInt(req.params.menuId);
    try {
      const { title, description, price } = req.body;
      if (!title && !description && !price) {
        res.status(404).json({ message: '수정 내용을 입력해주세요.' });
      }
      if (!menuId) {
        res.status(404).json({ message: '없는 메뉴입니다.' });
      }
      const updatedMenu = await this.menusService.updateMenu(
        menuId,
        title,
        description,
        price,
      );
      res.json({ message: '수정완료', updatedMenu });
    } catch (e) {
      next(e);
    }
  };

  //메뉴 삭제
  deleteMenu = async (req, res, next) => {
    const menuId = parseInt(req.params.menuId);
    await this.menusService.deleteMenu(menuId);
    res.status(200).json({ message: '삭제완료.' });
  };
}
