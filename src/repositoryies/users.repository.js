import { prisma } from "../utils/prisma/index.js";
export class UsersRepository {
  signupUser = async (email, nickname, hash) => {
    const signupUser = await prisma.users.create({
      data: {
        email,
        nickname,
        password: hash,
      },
    });
    return signupUser;
  };

  //email 중복 확인
  existsEmail = async (email) => {
    const existsEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return existsEmail;
  };

  // nickname 중복 확인
  existsNickname = async (nickname) => {
    const existsNickname = await prisma.users.findUnique({
      where: {
        nickname,
      },
    });
    return existsNickname;
  };

  // login
  authLogin = async (email) => {
    const authLogin = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return authLogin;
  };
}
