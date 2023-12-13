import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { MenusController } from '../controllers/menus.controller.js';

const router = express.Router();
const menusController = new MenusController();

//메뉴 생성
router.post('/', menusController.createMenu);

//메뉴 조회
router.get('/', menusController.getMenus);

//특정 메뉴조회
router.get('/:menuId', menusController.getMenu);

//메뉴 수정
router.put('/:menuId', menusController.updateMenu);
export default router;
