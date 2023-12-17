import { UsersRepository } from '../repositoryies/users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersService {
  usersRepository = new UsersRepository();

  signupUser = async (
    email,
    nickname,
    password,
    confirmpassword,
    address,
    phoneNumber,
  ) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    //핸드폰 번호 유효성 검사

    // email과 nickname Unique로 설정하여서 중복 회원가입 방지
    // let phoneRef =

    //이메일 형식
    let regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    //비밀번호 형식
    let pwRef = /^[a-zA-z0-9]{6,12}$/;

    const existsEmail = await this.usersRepository.existsEmail(email);

    // 이메일 닉네임 존재하는지 확인
    if (existsEmail) throw new Error('Email이 이미 사용중입니다.');

    const existsNickname = await this.usersRepository.existsNickname(nickname);
    // 닉네임 중복 확인
    if (existsNickname) throw new Error('Nickname이 이미 사용중입니다.');

    //이메일 형식 확인
    if (!regEmail.test(email))
      throw new Error('Email 형식이 올바르지 않습니다.');

    //패스워드 형식 확인
    if (!pwRef.test(password))
      throw new Error('password형식이 올바르지 않습니다.');

    console.log(password, confirmpassword);

    // confirmpassword 일치 확인
    if (password !== confirmpassword)
      throw new Error('패스워드가 일치하지 않습니다.');

    const users = await this.usersRepository.signupUser(
      email,
      nickname,
      hash,
      address,
      phoneNumber,
    );

    return {
      email: users.email,
      nickname: users.nickname,
      type: users.type,
    };
  };

  //사장님 회원가입 (Admin Signup)
  signupAdmin = async (
    email,
    nickname,
    password,
    confirmpassword,
    address,
    marketNum,
  ) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    //핸드폰 번호 유효성 검사

    // email과 nickname Unique로 설정하여서 중복 회원가입 방지
    // let phoneRef =

    //이메일 형식
    let regEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    //비밀번호 형식
    let pwRef = /^[a-zA-z0-9]{6,12}$/;

    const existsEmail = await this.usersRepository.existsAdminEmail(email);

    // 이메일 닉네임 존재하는지 확인
    if (existsEmail) throw new Error('Email이 이미 사용중입니다.');

    const existsNickname = await this.usersRepository.existsAdminNickname(
      nickname,
    );
    // 닉네임 중복 확인
    if (existsNickname) throw new Error('Nickname이 이미 사용중입니다.');

    //이메일 형식 확인
    if (!regEmail.test(email))
      throw new Error('Email 형식이 올바르지 않습니다.');

    //패스워드 형식 확인
    if (!pwRef.test(password))
      throw new Error('password형식이 올바르지 않습니다.');

    console.log(password, confirmpassword);

    // confirmpassword 일치 확인
    if (password !== confirmpassword)
      throw new Error('패스워드가 일치하지 않습니다.');

    const users = await this.usersRepository.signupAdmin(
      email,
      nickname,
      hash,
      address,
      marketNum,
    );

    return {
      email: users.email,
      nickname: users.nickname,
      type: users.type,
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

  userLogin = async (email, password) => {
    const loginInfo = await this.usersRepository.userLogin(email);

    if (!loginInfo) {
      throw new Error('등록된 Eamil이 없습니다.');
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      loginInfo.password,
    );

    if (!isPasswordCorrect) {
      throw new Error('Password를 다시 확인해주세요.');
    }

    const token = jwt.sign(
      {
        userId: loginInfo.userId,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '12h',
      },
    );

    //res.header("Authorization", `Bearer ${token}`);

    return token;
  };

  adminLogin = async (email, password) => {
    const adminInfo = await this.usersRepository.adminLogin(email);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      adminInfo.password,
    );

    if (!isPasswordCorrect) {
      throw new Error('Password를 다시 확인해주세요.');
    }

    const token = jwt.sign(
      {
        adminId: adminInfo.adminId,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '12h',
      },
    );

    //res.header("Authorization", `Bearer ${token}`);

    return token;
  };

  editUser = async (userId, nickname, address, phoneNumber) => {
    const userInfo = await this.usersRepository.editUser(userId);
  };
}
