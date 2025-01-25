import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductCategoryModel } from '../../models/productCategoryModel'
import { updateProductCategorySchema } from '../../schemas/productCategorySchema'
import logger from '../../utilities/logger'

export const update = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateProductCategorySchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const [updated] = await ProductCategoryModel.update(value, {
      where: { productCategoryId: value.productCategoryId }
    })

    if (!updated) {
      const message = `Product category not found with ID: ${value.productCategoryId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success({
      message: 'Product category updated successfully'
    })
    logger.info('Product category updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
