import { Router } from 'express'
import { orderControllers } from '../../controllers/orders'

const router = Router()

router.get('/', orderControllers.findAll)
router.get('/detail/:orderId', orderControllers.findOne)
router.post('/', orderControllers.create)
router.patch('/', orderControllers.update)
router.delete('/:orderId', orderControllers.remove)

export default router
