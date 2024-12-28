import { Router } from 'express'
import { companyControllers } from '../../controllers/company'

const router = Router()

router.get('/', companyControllers.findAll)
router.get('/detail/:companyId', companyControllers.findOne)
router.post('/', companyControllers.create)
router.patch('/', companyControllers.update)
router.delete('/:companyId', companyControllers.remove)

export default router
