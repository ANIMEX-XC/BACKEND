import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { CONSOLE } from '../../utilities/log'
import { type OrdersAttributes, OrdersModel } from '../../models/orders'
import { ProductModel } from '../../models/products'
import { UserModel } from '../../models/user'
import { AddressesModel } from '../../models/address'

export const findAllOrder = async (req: any, res: Response): Promise<any> => {
  try {
    const user = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: req.body?.user?.userId
      }
    })

    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const result = await OrdersModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(user?.dataValues.userRole === 'user') && {
          orderUserId: { [Op.eq]: req.body?.user?.userId },
          orderStatus: {
            [Op.notIn]: ['done']
          }
        }),
        ...(Boolean(req.query?.orderStatus) && {
          orderStatus: { [Op.eq]: req.query.orderStatus }
        })
      },
      include: [
        {
          model: UserModel,
          where: {
            deleted: { [Op.eq]: 0 }
          },
          attributes: ['userName']
        },
        {
          model: ProductModel,
          where: {
            ...(Boolean(req.query.search) && {
              [Op.or]: [{ productName: { [Op.like]: `%${req.query.search}%` } }]
            })
          },
          attributes: [
            'productId',
            'productName',
            'productImages',
            'productDiscount',
            'productTotalSale',
            'productStock',
            'productColors',
            'productSizes'
          ]
        }
      ],
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.default
    response.data = page.data(result)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findDetailOrder = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as OrdersAttributes

  const emptyField = requestChecker({
    requireList: ['orderId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await OrdersModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        orderId: { [Op.eq]: requestParams.orderId }
      },
      include: [
        {
          model: ProductModel
        },
        {
          model: AddressesModel
        },
        {
          model: UserModel,
          where: {
            deleted: { [Op.eq]: 0 }
          },
          attributes: ['userName', 'userEmail', 'userWhatsAppNumber', 'userCoin']
        }
      ]
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
