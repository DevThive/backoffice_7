import express from 'express'
import {DinersController} from '../controllers/diners.controller.js'
import {authMiddleware} from '../middlewares/authMiddleware.js'

const router = express.Router()
const dinersController = new DinersController()

// 식당 등록
router.post('/', dinersController.createDiner)

export default router