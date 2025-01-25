import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductCategoryModel } from '../../models/productCategoryModel'
import { createProductCategorySchema } from '../../schemas/productCategorySchema'
import logger from '../../utilities/logger'

export const create = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createProductCategorySchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    await ProductCategoryModel.create(value)

    const response = ResponseData.success({
      message: 'Product category created successfully'
    })
    logger.info('Product category created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
