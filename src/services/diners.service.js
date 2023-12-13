import {DinersRepository} from '../repositoryies/diners.repository.js'

export class DinersService {
	dinersRepository = new DinersRepository()
	
	createDiner = async (name,type,address,phoneNumber,introduction,homepage) => {
		try{
			await this.dinersRepository.createDiner(name,type,address,phoneNumber,introduction,homepage)
		}catch(e){throw e}
	}
}