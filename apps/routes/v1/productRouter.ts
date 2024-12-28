import { Router } from 'express'
import { productControllers } from '../../controllers/products'

const router = Router()

router.get('/', productControllers.findAll)
router.get('/detail/:productId', productControllers.findOne)
router.post('/', productControllers.create)
router.patch('/', productControllers.update)
router.delete('/:productId', productControllers.remove)

export default router
