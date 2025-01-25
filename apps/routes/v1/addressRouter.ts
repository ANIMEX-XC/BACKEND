import { Router } from 'express'
import { addressControllers } from '../../controllers/address'

const router = Router()

router.get('/', addressControllers.findAll)
router.get('/detail/:addressId', addressControllers.findOne)
router.post('/', addressControllers.create)
router.patch('/', addressControllers.update)
router.delete('/:addressId', addressControllers.remove)

export default router
