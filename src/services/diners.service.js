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
	readDiners = async () => await this.dinersRepository.readDiners()
	
	// 특정 식당 조회
	readDiner = async(dinerId) => await this.dinersRepository.readDiner(dinerId)
}