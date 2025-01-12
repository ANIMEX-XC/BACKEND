import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { v4 as uuidv4 } from 'uuid'
import { OrdersModel, type OrdersAttributes } from '../../models/orders'
import { ProductModel } from '../../models/products'
import { Op } from 'sequelize'
import { AddressesModel } from '../../models/address'
import { CartsModel } from '../../models/carts'

export const createOrder = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as OrdersAttributes

  const emptyField = requestChecker({
    requireList: ['orderProductId', 'orderOngkirPrice'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const address = await AddressesModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        addressUserId: { [Op.eq]: req.body?.user?.userId }
      }
    })

    if (address == null) {
      const message =
        'alamat pengiriman tidak ditemukan! pastikan anda sudah menambahkan detail alamat pengiriman'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const product = await ProductModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        productId: { [Op.eq]: requestBody.orderProductId }
      }
    })

    if (product == null) {
      const message = 'product not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    requestBody.orderTotalProductPrice =
      product?.productPrice + requestBody.orderOngkirPrice

    requestBody.orderUserId = req.body?.user?.userId
    requestBody.orderId = uuidv4()
    await OrdersModel.create(requestBody)

    await CartsModel.destroy({
      where: {
        deleted: { [Op.eq]: 0 },
        cartProductId: requestBody.orderProductId
      }
    })

    const response = ResponseData.default
    const result = { message: 'success' }
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
