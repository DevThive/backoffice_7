import { MenusRepository } from '../repositoryies/menus.repository.js';

export class MenusService {
  menusRepository = new MenusRepository();

  //메뉴 등록하기
  createMenu = async (title, description, price) => {
    try {
      await this.menusRepository.createMenu(title, description, price);
    } catch (e) {
      throw e;
    }
  };

  //모든 메뉴 조회하기
  getMenus = async () => await this.menusRepository.getMenus();

  //특정 메뉴 조회하기
  getMenu = async (menuId) => {
    return await this.menusRepository.getMenu(menuId);
  };

  //메뉴 수정하기
  updateMenu = async (menuId, title, description, price) => {
    try {
      await this.menusRepository.updateMenu(menuId, title, description, price);
    } catch (e) {
      throw e;
    }
  };
  //메뉴 삭제하기
  deleteMenu = async (menuId) => {
    await this.menusRepository.deleteMenu(menuId);
  };
}
