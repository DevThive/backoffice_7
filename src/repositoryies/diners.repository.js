import {prisma} from '../utils/prisma/index.js'

export class DinersRepository {
	createDiner = async (name,type,address,phoneNumber,introduction,homepage) => {
		try{
			await prisma.diners.create({data:{name,type,address,phoneNumber,introduction,homepage}})
		}catch(e){throw e}
	}
}