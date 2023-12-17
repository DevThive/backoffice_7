import { UsersService } from '../services/users.service.js';
import { sendEmail } from '../server/email.js';

import resBody from '../server/resBody.js';

export class UsersController {
  usersService = new UsersService();

  //eamil 인증 구현
  emailSend = async (req, res, next) => {
    try {
      const { email, auth } = req.body;
      sendEmail(email, auth);

      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  userSignup = async (req, res, next) => {
    try {
      const {
        email,
        nickname,
        password,
        confirmpassword,
        address,
        phoneNumber,
      } = req.body;

      const users = await this.usersService.signupUser(
        email,
        nickname,
        password,
        confirmpassword,
        address,
        phoneNumber,
      );

      return res
        .status(200)
        .json({ message: '회원가입이 완료되었습니다.', data: users });
    } catch (err) {
      next(err);
    }
  };

  adminSignup = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmpassword, address, marketNum } =
        req.body;

      const admin = await this.usersService.signupAdmin(
        email,
        nickname,
        password,
        confirmpassword,
        address,
        marketNum,
      );

      return res
        .status(200)
        .json({ message: '(사장님) 회원가입이 되었습니다.', data: admin });
    } catch (err) {
      next(err);
    }
  };

  userSignin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userLogin = await this.usersService.userLogin(email, password);

      res.cookie('Authorization', 'Bearer ' + userLogin);
      res.header('Authorization', `Bearer ${userLogin}`);
      return res.status(200).json({
        message: '사용자 로그인입니다.',
        token: `Bearer ${userLogin}`,
      });
    } catch (err) {
      next(err);
    }
  };

  adminSignin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const adminLogin = await this.usersService.adminLogin(email, password);

      res.cookie('Authorization', 'Bearer ' + adminLogin);
      res.header('Authorization', `Bearer ${adminLogin}`);
      return res.status(200).json({
        message: '사장님 로그인입니다.',
        token: adminLogin,
      });
    } catch (err) {
      next(err);
    }
  };

  usercheckToken = async (req, res, next) => {
    try {
      const { email, nickname, adminId } = res.locals.user;

      return res.status(200).json({
        message: '토큰이 정상적입니다.',
        data: { email, nickname, adminId },
      });
    } catch (err) {
      next(err);
    }
  };

  admincheckToken = async (req, res, next) => {
    try {
      const { email, nickname, adminId } = res.locals.admin;

      return res.status(200).json({
        message: '토큰이 정상적입니다.',
        data: { email, nickname, adminId },
      });
    } catch (err) {
      next(err);
    }
  };

  userLogout = async (req, res, next) => {
    try {
      res.clearCookie('Authorization');
      return res.status(200).json({ ...resBody(true, '로그아웃 되었습니다.') });
    } catch (err) {
      next(err);
    }
  };
}
