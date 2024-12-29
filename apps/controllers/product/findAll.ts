import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductModel } from '../../models/productModel'
import { findAllProductsSchema } from '../../schemas/productSchema'
import logger from '../../utilities/logger'
import { Pagination } from '../../utilities/pagination'
import { Op } from 'sequelize'
import { ProductImageModel } from '../../models/productImageModel'
import { ProductRatingModel } from '../../models/productRatingModel'
import { UserModel } from '../../models/user'

export const findAll = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findAllProductsSchema, req.query)

  if (error) {
    const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const { page: queryPage, size: querySize, search, pagination } = value

    const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)

    const result = await ProductModel.findAndCountAll({
      where: {
        deleted: 0,
        ...(Boolean(search) && {
          productName: { [Op.like]: `%${search}%` }
        })
      },
      include: [
        { model: ProductImageModel, as: 'images', attributes: ['productImageUrl'] },
        {
          model: ProductRatingModel,
          as: 'ratings',
          include: [{ model: UserModel, as: 'user', attributes: ['userName'] }]
        },
        { model: UserModel, as: 'user', attributes: ['userName', 'userLevel'] }
      ],
      order: [['productId', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success(result)
    response.data = page.formatData(result)

    logger.info('Products retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
