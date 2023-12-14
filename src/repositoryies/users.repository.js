import { prisma } from '../utils/prisma/index.js';
export class UsersRepository {
  //user signup
  signupUser = async (email, nickname, hash, address, phoneNumber) => {
    const signupUser = await prisma.users.create({
      data: {
        email,
        nickname,
        password: hash,
        address: address,
        phoneNumber: phoneNumber,
      },
    });
    return signupUser;
  };

  //admin signup
  signupAdmin = async (email, nickname, hash, address, marketNum) => {
    const signupAdmin = await prisma.admin.create({
      data: {
        email,
        nickname,
        password: hash,
        address: address,
        marketNum: marketNum,
      },
    });
    return signupAdmin;
  };

  // user email 중복 확인
  existsEmail = async (email) => {
    const existsEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return existsEmail;
  };

  // user nickname 중복 확인
  existsNickname = async (nickname) => {
    const existsNickname = await prisma.users.findUnique({
      where: {
        nickname,
      },
    });
    return existsNickname;
  };

  // admin email 중복 확인
  existsAdminEmail = async (email) => {
    const existsAdminEmail = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    return existsAdminEmail;
  };

  // admin nickname 중복 확인
  existsAdminNickname = async (nickname) => {
    const existsAdminNickname = await prisma.admin.findUnique({
      where: {
        nickname,
      },
    });
    return existsAdminNickname;
  };

  // user login
  userLogin = async (email) => {
    const userLogin = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return userLogin;
  };

  // admin login
  adminLogin = async (email) => {
    const adminLogin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    return adminLogin;
  };
}
