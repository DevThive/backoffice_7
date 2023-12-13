import {prisma} from '../utils/prisma/index.js'

export class DinersRepository {
	// 식당 등록
	createDiner = async (name,type,address,phoneNumber,introduction,homepage) => {
		try{
			await prisma.diners.create({data:{name,type,address,phoneNumber,introduction,homepage}})
		}catch(e){throw e}
	}
	
	// 전체 식당 조회
	getDiners = async () => await prisma.diners.findMany()
	
	// 특정 식당 조회
	getDiner = async (dinerId) => await prisma.diners.findUnique({where:{dinerId}})
	
	// 식당 정보 수정
	updateDiner = async (dinerId,name,type,address,phoneNumber,introduction,homepage) => {
		try{
			await prisma.diners.update({where:{dinerId},data:{name,type,address,phoneNumber,introduction,homepage}})
		}catch(e){throw e}
	}
	
	// 식당 삭제
	deleteDiner = async (dinerId) => await prisma.diners.delete({where:{dinerId}})
}