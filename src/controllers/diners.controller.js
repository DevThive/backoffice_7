import {DinersService} from '../services/diners.service.js'

export class DinersController {
	dinersService = new DinersService()
	
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
}