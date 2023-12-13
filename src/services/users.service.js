import { UsersRepository } from "../repositoryies/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsersService {
  usersRepository = new UsersRepository();

  signupUser = async (email, nickname, password, confirmpassword) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // email과 nickname Unique로 설정하여서 중복 회원가입 방지

    //이메일 형식
    let regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    //비밀번호 형식
    let pwRef = /^[a-zA-z0-9]{6,12}$/;

    const existsEmail = await this.usersRepository.existsEmail(email);

    // 이메일 닉네임 존재하는지 확인
    if (existsEmail) throw new Error("Email이 이미 사용중입니다.");

    const existsNickname = await this.usersRepository.existsNickname(nickname);
    // 닉네임 중복 확인
    if (existsNickname) throw new Error("Nickname이 이미 사용중입니다.");

    //이메일 형식 확인
    if (!regEmail.test(email))
      throw new Error("Email 형식이 올바르지 않습니다.");

    //패스워드 형식 확인
    if (!pwRef.test(password))
      throw new Error("password형식이 올바르지 않습니다.");

    console.log(password, confirmpassword);

    // confirmpassword 일치 확인
    if (password !== confirmpassword)
      throw new Error("패스워드가 일치하지 않습니다.");

    const users = await this.usersRepository.signupUser(email, nickname, hash);

    return {
      email: users.email,
      nickname: users.nickname,
    };
  };
  // email 중복 확인
  existsEmail = async (email) => {
    const existsEmail = await this.usersRepository.existsEmail(email);

    return existsEmail;
  };
  // 닉네임 중복 확인
  //   existsNickname = async (nickname) => {
  //     const existsNickname = await this.usersRepository.existsNickname(nickname);

  //     return existsNickname;
  //   };

  //로그인

  authLogin = async (email, password) => {
    const loginInfo = await this.usersRepository.authLogin(email);

    if (!loginInfo) {
      throw new Error("등록된 Eamil이 없습니다.");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      loginInfo.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Password를 다시 확인해주세요.");
    }

    const token = jwt.sign(
      {
        userId: loginInfo.userId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );

    //res.header("Authorization", `Bearer ${token}`);

    return token;
  };
}
