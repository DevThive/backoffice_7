import {DinersService} from '../services/diners.service.js'

export class DinersController {
	dinersService = new DinersService()
	
	// 식당 등록
	createDiner = async (req,res,next) => {
		try{
			const {name, type, address, phoneNumber, introduction, homepage} = req.body
			if(!name) return res.status(400).json({message: "매장 이름을 입력해주세요."})
			if(!address) return res.status(400).json({message: "매장 주소를 입력해주세요."})
			if(!phoneNumber) return res.status(400).json({message: "매장 전화번호를 입력해주세요."})
			if(!introduction) return res.status(400).json({message: "매장 소개를 입력해주세요."})
			const newDiner = await this.dinersService.createDiner(name,type,address,phoneNumber,introduction,homepage)
			res.status(201).json({message:"매장을 등록하였습니다."})
		}catch(e){next(e)}
	}
	
	// 전체 식당 조회
	readDiners = async (req,res,next) => {
		const diners = await this.dinersService.readDiners()
		res.json({diners})
	}
	
	// 특정 식당 조회
	readDiner = async (req,res,next) => {
		const dinerId = +req.params.dinerId
		if(isNaN(dinerId)) return res.status(404).json({message: "해당 매장이 존재하지 않습니다."})
		const diner = await this.dinersService.readDiner(dinerId)
		if(!diner) return res.status(404).json({message: "해당 매장이 존재하지 않습니다."})
		res.json({diner})
	}	
}