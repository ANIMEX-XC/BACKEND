import { Router, Request, Response } from 'express'
import { UsersController } from '../../controllers/auth'
import { middleware } from '../../middlewares'
import { myProfileController } from '../../controllers/myProfile'

const router = Router()

router.get('/', middleware.useAuthorization, async (req: Request, res: Response) =>
  UsersController.findAll(req, res)
)

router.get(
  '/detail/:userId',
  middleware.useAuthorization,
  async (req: Request, res: Response) => UsersController.findOne(req, res)
)

router.patch('/', middleware.useAuthorization, async (req: Request, res: Response) =>
  UsersController.update(req, res)
)

router.delete('/', middleware.useAuthorization, async (req: Request, res: Response) =>
  UsersController.remove(req, res)
)

router.post('/login', async (req: Request, res: Response) =>
  UsersController.login(req, res)
)

router.post('/register', async (req: Request, res: Response) =>
  UsersController.register(req, res)
)

router.get(
  '/my-profile',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await myProfileController.find(req, res)
)
router.patch(
  '/my-profile',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await myProfileController.update(req, res)
)

export default router
