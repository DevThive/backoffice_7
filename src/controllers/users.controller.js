import { UsersService } from "../services/users.service.js";

export class UsersController {
  usersService = new UsersService();
  Signup = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmpassword } = req.body;

      const users = await this.usersService.signupUser(
        email,
        nickname,
        password,
        confirmpassword
      );

      return res
        .status(200)
        .json({ message: "회원가입이 완료되었습니다.", data: users });
    } catch (err) {
      next(err);
    }
  };

  Signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const authLogin = await this.usersService.authLogin(email, password);

      return res.status(200).json({ token: `Bearer ${authLogin}` });
    } catch (err) {
      next(err);
    }
  };

  checkToken = async (req, res, next) => {
    try {
      const { email, nickname } = res.locals.user;

      return res.status(200).json({
        message: "토큰이 정상적입니다.",
        data: { email, nickname },
      });
    } catch (err) {
      next(err);
    }
  };
}
