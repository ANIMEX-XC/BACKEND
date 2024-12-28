import { Router } from 'express'
import { saleControllers } from '../../controllers/sales'

const router = Router()

router.get('/', saleControllers.findAll)
router.get('/detail/:saleId', saleControllers.findOne)
router.post('/', saleControllers.create)
router.patch('/', saleControllers.update)
router.delete('/:saleId', saleControllers.remove)

export default router
