import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductCategoryModel } from '../../models/productCategoryModel'
import { findAllProductCategoriesSchema } from '../../schemas/productCategorySchema'
import logger from '../../utilities/logger'
import { Pagination } from '../../utilities/pagination'
import { Op } from 'sequelize'

export const findAll = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findAllProductCategoriesSchema, req.query)

  if (error) {
    const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const { page: queryPage, size: querySize, search, pagination } = value

    const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)

    const result = await ProductCategoryModel.findAndCountAll({
      where: {
        deleted: 0,
        ...(Boolean(search) && {
          productCategoryName: { [Op.like]: `%${search}%` }
        })
      },
      order: [['productCategoryId', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success(result)
    response.data = page.formatData(result)

    logger.info('Product categories retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
