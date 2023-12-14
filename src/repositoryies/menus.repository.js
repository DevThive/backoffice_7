import { prisma } from '../utils/prisma/index.js';

export class MenusRepository {
  //메뉴 등록하기
  createMenu = async (title, description, price) => {
    try {
      const createdMenu = await prisma.menus.create({
        data: { title, description, price },
      });
      const menuId = createdMenu.menuId;
      return createdMenu;
    } catch (e) {
      throw e;
    }
  };

  //전체 메뉴 조회하기
  getMenus = async () => await prisma.menus.findMany();

  //특정 메뉴 조회하기
  getMenu = async (menuId) =>
    await prisma.menus.findUnique({
      where: { menuId },
    });

  //메뉴 수정하기
  updateMenu = async (menuId, title, description, price) => {
    try {
      await prisma.menus.update({
        where: { menuId },
        data: { title, description, price },
      });
    } catch (e) {
      throw e;
    }
  };

  //메뉴 삭제하기
  deleteMenu = async (menuId) =>
    await prisma.menus.delete({ where: { menuId } });
}
