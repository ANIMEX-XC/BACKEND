import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductCategoryModel } from '../../models/productCategoryModel'
import { deleteProductCategorySchema } from '../../schemas/productCategorySchema'
import logger from '../../utilities/logger'

export const remove = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(deleteProductCategorySchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await ProductCategoryModel.findOne({
      where: {
        productCategoryId: value.productCategoryId
      }
    })

    if (!result) {
      const message = `Product category not found with ID: ${value.productCategoryId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    result.deleted = 1
    await result.save()

    const response = ResponseData.success({
      message: 'Product category deleted successfully'
    })
    logger.info('Product category deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
