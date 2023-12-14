import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
<<<<<<< HEAD
=======
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware.js';
>>>>>>> d71c61000aa0613383ad6e776d58e82cc480bc37
import ValidationCheck from '../middlewares/validationMiddleware.js';

const router = express.Router();
const usersController = new UsersController();

// 회원가입
<<<<<<< HEAD
router.post('/', ValidationCheck, usersController.Signup);
router.post('/auth', usersController.Signin);
router.get('/auth/me', authMiddleware, usersController.checkToken); //토큰
=======
router.post('/', ValidationCheck, usersController.userSignup);
router.post('/admin', ValidationCheck, usersController.adminSignup);
router.post('/auth/user', usersController.userSignin);
router.post('/auth/admin', usersController.adminSignin);

router.get('/auth/user/me', authMiddleware, usersController.checkToken);
router.get('/auth/admin/me', authAdminMiddleware, usersController.checkToken);
>>>>>>> d71c61000aa0613383ad6e776d58e82cc480bc37

export default router;
