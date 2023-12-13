import { prisma } from '../utils/prisma/index.js';

export class DinersRepository {
  // 식당 등록
  createDiner = async (
    adminId,
    name,
    type,
    address,
    phoneNumber,
    introduction,
    homepage,
    businessHour,
  ) => {
    try {
      await prisma.$transaction(async (tx) => {
        const createdDiner = await tx.diners.create({
          data: {
            adminId,
            name,
            type,
            address,
            phoneNumber,
            introduction,
            homepage,
          },
        });
        const dinerId = createdDiner.dinerId;
        await tx.businessHours.createMany({
          data: [0, 1, 2, 3, 4, 5, 6]
            .filter((i) => businessHour[i])
            .map((i) => {
              return {
                dinerId,
                dayOfWeek: i,
                openTime: businessHour[i][0],
                closeTime: businessHour[i][1],
              };
            }),
        });
        return createdDiner;
      });
    } catch (e) {
      throw e;
    }
  };

  // 전체 식당 조회
  getDiners = async () => await prisma.diners.findMany();

  // 특정 식당 조회
  getDiner = async (info) =>
    await prisma.diners.findUnique({
      where: info,
      include: { BusinessHours: true },
    });

  // 식당 정보 수정
  updateDiner = async (
    dinerId,
    name,
    type,
    address,
    phoneNumber,
    introduction,
    homepage,
    businessHour,
  ) => {
    try {
      await prisma.$transaction([
        prisma.diners.update({
          where: { dinerId },
          data: { name, type, address, phoneNumber, introduction, homepage },
        }),
        ...[0, 1, 2, 3, 4, 5, 6]
          .filter((i) => businessHour[i] || businessHour[i] === null)
          .map((i) => {
            if (!businessHour[i])
              return prisma.$queryRaw`delete from businessHours where dinerId=${dinerId} and dayOfWeek=${i}`;
            const [openTime, closeTime] = businessHour[i];
            console.log(i, openTime, closeTime);
            return prisma.businessHours.upsert({
              where: { dinerId_dayOfWeek: { dinerId, dayOfWeek: i } },
              update: { openTime, closeTime },
              create: { dinerId, dayOfWeek: i, openTime, closeTime },
            });
          }),
      ]);
    } catch (e) {
      throw e;
    }
  };

  // 식당 삭제
  deleteDiner = async (dinerId) =>
    await prisma.diners.delete({ where: { dinerId } });
}
