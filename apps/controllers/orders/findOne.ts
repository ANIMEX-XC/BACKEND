import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { OrdersModel } from '../../models/orderModel'
import { findOneOrderSchema } from '../../schemas/orderSchema'
import logger from '../../utilities/logger'

export const findOne = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findOneOrderSchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await OrdersModel.findOne({
      where: {
        deleted: 0,
        orderId: value.orderId
      }
    })

    if (!result) {
      const message = `Order not found with ID: ${value.orderId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success(result)
    logger.info('Order found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
