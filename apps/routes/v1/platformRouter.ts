import { Router } from 'express'
import { platformControllers } from '../../controllers/platform'

const router = Router()

router.get('/', platformControllers.findAll)
router.get('/detail/:platformId', platformControllers.findOne)
router.post('/', platformControllers.create)
router.patch('/', platformControllers.update)
router.delete('/:platformId', platformControllers.remove)

export default router
