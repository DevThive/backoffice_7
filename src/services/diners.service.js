import { DinersRepository } from '../repositoryies/diners.repository.js';

export class DinersService {
  dinersRepository = new DinersRepository();

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
      await this.dinersRepository.createDiner(
        adminId,
        name,
        type,
        address,
        phoneNumber,
        introduction,
        homepage,
        businessHour,
      );
    } catch (e) {
      throw e;
    }
  };

  // 전체 식당 조회
  getDiners = async () => await this.dinersRepository.getDiners();

  // 특정 식당 조회
  getDiner = async (info) => await this.dinersRepository.getDiner(info);

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
      await this.dinersRepository.updateDiner(
        dinerId,
        name,
        type,
        address,
        phoneNumber,
        introduction,
        homepage,
        businessHour,
      );
    } catch (e) {
      throw e;
    }
  };

  // 식당 삭제
  deleteDiner = async (dinerId) =>
    await this.dinersRepository.deleteDiner(dinerId);
}
