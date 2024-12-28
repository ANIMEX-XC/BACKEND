import { Router } from 'express'
import { statisticController } from '../../controllers/statistic'

const router = Router()

router.get('/total', statisticController.findTotal)
router.get('/chart', statisticController.findChart)

export default router
