import { Router } from 'express'
import { notificationControllers } from '../../controllers/notifications'

const router = Router()

router.get('/', notificationControllers.findAll)
router.get('/detail/:notificationId', notificationControllers.findOne)
router.post('/', notificationControllers.create)
router.patch('/', notificationControllers.update)
router.delete('/:notificationId', notificationControllers.remove)

export default router
