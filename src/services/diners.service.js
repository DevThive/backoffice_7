import {DinersRepository} from '../repositoryies/diners.repository.js'

export class DinersService {
	dinersRepository = new DinersRepository()
	
	// 식당 등록
	createDiner = async (name,type,address,phoneNumber,introduction,homepage) => {
		try{
			await this.dinersRepository.createDiner(name,type,address,phoneNumber,introduction,homepage)
		}catch(e){throw e}
	}
	
	// 전체 식당 조회
	getDiners = async () => await this.dinersRepository.getDiners()
	
	// 특정 식당 조회
	getDiner = async(dinerId) => await this.dinersRepository.getDiner(dinerId)
	
	// 식당 정보 수정
	updateDiner = async (dinerId,name,type,address,phoneNumber,introduction,homepage) => {
		try{
			await this.dinersRepository.updateDiner(dinerId,name,type,address,phoneNumber,introduction,homepage)
		}catch(e){throw e}
	}
	
	// 식당 삭제
	deleteDiner = async(dinerId) => await this.dinersRepository.deleteDiner(dinerId)
}