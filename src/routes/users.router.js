import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware.js';
import ValidationCheck from '../middlewares/validationMiddleware.js';

const router = express.Router();
const usersController = new UsersController();

// 회원가입
router.post('/', ValidationCheck, usersController.userSignup);
router.post('/admin', ValidationCheck, usersController.adminSignup);
router.post('/auth/user', usersController.userSignin);
router.post('/auth/admin', usersController.adminSignin);

router.get('/auth/user/me', authMiddleware, usersController.usercheckToken);
router.get(
  '/auth/admin/me',
  authAdminMiddleware,
  usersController.admincheckToken,
);
router.post('/logout', usersController.userLogout);
export default router;
