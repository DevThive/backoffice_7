import { UsersService } from '../services/users.service.js';

export class UsersController {
  usersService = new UsersService();
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
<<<<<<< HEAD
=======
        address,
        phoneNumber,
>>>>>>> d71c61000aa0613383ad6e776d58e82cc480bc37
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

      res.header('Authorization', `Bearer ${adminLogin}`);
      return res.status(200).json({
        message: '사장님 로그인입니다.',
        token: `Bearer ${adminLogin}`,
      });
    } catch (err) {
      next(err);
    }
  };

  checkToken = async (req, res, next) => {
    try {
      const { email, nickname } = res.locals.user;

      return res.status(200).json({
        message: '토큰이 정상적입니다.',
        data: { email, nickname },
      });
    } catch (err) {
      next(err);
    }
  };
}
