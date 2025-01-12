/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { orderController } from '../../controllers/orders'

export const orderRoutes = (app: Express) => {
  const router = express.Router()
  app.use('/api/v1/orders', middleware.useAuthorization, router)

  router.get(
    '/',
    async (req: Request, res: Response) => await orderController.findAll(req, res)
  )
  router.get(
    '/detail/:orderId',
    async (req: Request, res: Response) => await orderController.findOne(req, res)
  )
  router.post(
    '/',
    async (req: Request, res: Response) => await orderController.create(req, res)
  )
  router.patch(
    '/',
    async (req: Request, res: Response) => await orderController.update(req, res)
  )
  router.delete(
    '/',
    async (req: Request, res: Response) => await orderController.remove(req, res)
  )
}
