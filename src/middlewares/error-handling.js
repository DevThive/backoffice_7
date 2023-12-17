import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function (err, req, res, next) {
  // Prisma에서 발생한 에러인지 확인
  if (err instanceof prisma.PrismaClientKnownRequestError) {
    console.error('Prisma 에러:', err);

    // Prisma에서 발생한 특정 에러에 대한 메시지를 클라이언트에게 전달할 수 있습니다.
    if (err.code === 'P2002') {
      return res
        .status(400)
        .json({ errorMessage: '중복된 데이터가 이미 존재합니다.' });
    }

    // 기타 Prisma 에러에 대한 처리
    return res
      .status(500)
      .json({ errorMessage: '데이터베이스 에러가 발생했습니다.' });
  }

  // 일반적인 서버 내부 에러 처리
  console.error('일반적인 에러:', err);
  res.status(500).json({ errorMessage: '서버 내부에 에러가 발생했습니다.' });
}

// export default function (err, req, res, next) {
//   console.log(err);

//   res.status(500).json({ errorMessage: "서버 내부 에러가 발생했습니다." });
// }
