import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import ValidationCheck from '../middlewares/validationMiddleware.js';

const router = express.Router();
const usersController = new UsersController();

// 회원가입
router.post('/', ValidationCheck, usersController.Signup);
router.post('/auth', usersController.Signin);
router.get('/auth/me', authMiddleware, usersController.checkToken); //토큰

export default router;
