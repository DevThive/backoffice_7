import { DinersService } from '../services/diners.service.js';

export class DinersController {
  dinersService = new DinersService();

  // businessHour 유효성 체크
  isValidTime = (time) => {
    if (isNaN(time)) return false;
    if (time < 0 || time > 4199 || time % 100 > 59) return false;
    return true;
  };
  isValidBusinessHour = (businessHour) => {
    try {
      for (let i = 0; i < 7; ++i)
        if (businessHour[i]) {
          const [openTime, closeTime] = businessHour[i];
          if (!this.isValidTime(openTime) || !this.isValidTime(closeTime))
            return false;
        }
      return true;
    } catch (e) {
      return false;
    }
  };

  // 식당 등록
  createDiner = async (req, res, next) => {
    try {
      const {
        name,
        type,
        address,
        phoneNumber,
        introduction,
        homepage,
        businessHour,
      } = req.body;
      if (!name)
        return res.status(400).json({ message: '매장 이름을 입력해주세요.' });
      if (!address)
        return res.status(400).json({ message: '매장 주소를 입력해주세요.' });
      if (!phoneNumber)
        return res
          .status(400)
          .json({ message: '매장 전화번호를 입력해주세요.' });
      if (!introduction)
        return res.status(400).json({ message: '매장 소개를 입력해주세요.' });
      if (!this.isValidBusinessHour(businessHour))
        return res
          .status(400)
          .json({ message: '영업 시간 형식이 적절하지 않습니다.' });
      const newDiner = await this.dinersService.createDiner(
        name,
        type,
        address,
        phoneNumber,
        introduction,
        homepage,
        businessHour,
      );
      res.status(201).json({ message: '매장을 등록하였습니다.' });
    } catch (e) {
      next(e);
    }
  };

  // 전체 식당 조회
  getDiners = async (req, res) => {
    const diners = await this.dinersService.getDiners();
    res.json({ diners });
  };

  // 특정 식당 찾기
  findDiner = async (req, res, next) => {
    const dinerId = +req.params.dinerId;
    if (isNaN(dinerId))
      return res
        .status(404)
        .json({ message: '해당 매장이 존재하지 않습니다.' });
    const diner = await this.dinersService.getDiner(dinerId);
    if (!diner)
      return res
        .status(404)
        .json({ message: '해당 매장이 존재하지 않습니다.' });
    res.locals.diner = diner;
    next();
  };

  // 특정 식당 조회
  getDiner = async (req, res) => res.json({ diner: res.locals.diner });

  // 식당 정보 수정
  updateDiner = async (req, res, next) => {
    try {
      const {
        name,
        type,
        address,
        phoneNumber,
        introduction,
        homepage,
        businessHour,
      } = req.body;
      if (
        !name &&
        !type &&
        !address &&
        !phoneNumber &&
        !introduction &&
        !homepage
      )
        res.status(400).json({ message: '수정할 정보를 입력해주세요.' });
      if (!this.isValidBusinessHour(businessHour))
        return res
          .status(400)
          .json({ message: '영업 시간 형식이 적절하지 않습니다.' });
      const updatedDiner = await this.dinersService.updateDiner(
        res.locals.diner.dinerId,
        name,
        type,
        address,
        phoneNumber,
        introduction,
        homepage,
        businessHour,
      );
      res
        .status(201)
        .json({ message: '매장 정보를 수정하였습니다.', updatedDiner });
    } catch (e) {
      next(e);
    }
  };

  // 식당 삭제
  deleteDiner = async (req, res, next) => {
    await this.dinersService.deleteDiner(res.locals.diner.dinerId);
    res.status(204).json();
  };
}
