import { Express, Request, Response } from 'express'
import { index } from '../../controllers'
import uploadFileRoutes from './uploadFileRouter'
import userRoutes from './userRouter'
import productRoutes from './productRouter'
import productCategoryRoutes from './productCategoryRouter'
import orderRoutes from './orderRouter'
import notificationRoutes from './notificationRouter'
import addressRoutes from './addressRouter'

export const appRouterV1 = (app: Express): void => {
  app.get(`/api/v1`, async (req: Request, res: Response) => await index(req, res))
  app.use(`/api/v1/files`, uploadFileRoutes)
  app.use(`/api/v1/users`, userRoutes)
  app.use(`/api/v1/products`, productRoutes)
  app.use(`/api/v1/products/categories`, productCategoryRoutes)
  app.use(`/api/v1/orders`, orderRoutes)
  app.use(`/api/v1/notifications`, notificationRoutes)
  app.use(`/api/v1/addresses`, addressRoutes)
}
