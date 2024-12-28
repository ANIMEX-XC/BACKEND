import { Router } from 'express'
import { productCategoryControllers } from '../../controllers/productCategory'

const router = Router()

router.get('/', productCategoryControllers.findAll)
router.get('/detail/:productCategoryId', productCategoryControllers.findOne)
router.post('/', productCategoryControllers.create)
router.patch('/', productCategoryControllers.update)
router.delete('/:productCategoryId', productCategoryControllers.remove)

export default router
