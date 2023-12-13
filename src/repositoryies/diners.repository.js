import {prisma} from '../utils/prisma/index.js'

export class DinersRepository {
	// 식당 등록
	createDiner = async (name,type,address,phoneNumber,introduction,homepage) => {
		try{
			await prisma.diners.create({data:{name,type,address,phoneNumber,introduction,homepage}})
		}catch(e){throw e}
	}
	
	// 전체 식당 조회
	readDiners = async () => await prisma.diners.findMany()
	// 특정 식당 조회
	readDiner = async (dinerId) => await prisma.diners.findUnique({where:{dinerId}})
}