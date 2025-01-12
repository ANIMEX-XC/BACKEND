/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { notificationController } from '../../controllers/notifications'
import { middleware } from '../../middlewares'

export const notificationRoutes = (app: Express) => {
  const router = express.Router()
  app.use('/api/v1/notifications', middleware.useAuthorization, router)

  router.get(
    '/',
    async (req: Request, res: Response) => await notificationController.findAll(req, res)
  )
  router.get(
    '/detail/:notificationId',
    async (req: Request, res: Response) => await notificationController.findOne(req, res)
  )
  router.post(
    '/',
    async (req: Request, res: Response) => await notificationController.create(req, res)
  )
  router.patch(
    '/',
    async (req: Request, res: Response) => await notificationController.update(req, res)
  )
  router.patch(
    '/push-token',
    async (req: Request, res: Response) =>
      await notificationController.updatePushToken(req, res)
  )
  router.delete(
    '/',
    async (req: Request, res: Response) => await notificationController.remove(req, res)
  )
}
