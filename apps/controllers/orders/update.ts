/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { type OrdersAttributes, OrdersModel } from '../../models/orders'
import { type TransactionsAttributes, TransactionsModel } from '../../models/transactions'
import { v4 as uuidv4 } from 'uuid'

export const updateOrder = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as OrdersAttributes

  const emptyField = requestChecker({
    requireList: ['orderId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const order = await OrdersModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        orderId: { [Op.eq]: requestBody.orderId }
      }
    })

    if (order == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: OrdersAttributes | any = {
      ...(requestBody?.orderStatus?.length > 0 && {
        orderStatus: requestBody?.orderStatus
      })
    }

    await OrdersModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        orderId: { [Op.eq]: requestBody.orderId }
      }
    })

    const transactionPayload: TransactionsAttributes | any = {
      transactionId: uuidv4(),
      transactionPrice: order.dataValues.orderProductPrice,
      transactionOrderId: order.dataValues.orderId,
      transactionUserId: req.body?.user?.userId,
      transactionOngkirPrice: order.dataValues?.orderOngkirPrice
    }

    await TransactionsModel.create(transactionPayload)

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
