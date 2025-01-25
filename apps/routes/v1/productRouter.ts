import { Router } from 'express'
import { productControllers } from '../../controllers/product'
import { middleware } from '../../middlewares'

const router = Router()

router.get('/', productControllers.findAll)
router.get('/detail/:productId', productControllers.findOne)

router.get('/users/', middleware.useAuthorization, productControllers.findAll)
router.get(
  '/users/detail/:productId',
  middleware.useAuthorization,
  productControllers.findOne
)
router.post('/', middleware.useAuthorization, productControllers.create)
router.patch('/', middleware.useAuthorization, productControllers.update)
router.delete('/:productId', middleware.useAuthorization, productControllers.remove)

export default router
