import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductModel } from '../../models/productModel'
import { updateProductSchema } from '../../schemas/productSchema'
import logger from '../../utilities/logger'

export const update = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateProductSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const [updated] = await ProductModel.update(value, {
      where: { productId: value.productId }
    })

    if (!updated) {
      const message = `Product not found with ID: ${value.productId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success({
      message: 'Product updated successfully'
    })
    logger.info('Product updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
