import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductModel } from '../../models/productModel'
import { findOneProductSchema } from '../../schemas/productSchema'
import logger from '../../utilities/logger'
import { ProductVariantModel } from '../../models/productVariantModel'

export const findProduct = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findOneProductSchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await ProductModel.findOne({
      where: {
        deleted: 0,
        productId: value.productId
      },
      include: [
        {
          model: ProductVariantModel,
          as: 'variants',
          attributes: [
            'variantId',
            'productId',
            'variantName',
            'variantPrice',
            'variantSize',
            'variantColor',
            'variantCategory'
          ]
        }
      ]
    })

    if (!result) {
      const message = `Product not found with ID: ${value.productId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success(result)
    logger.info('Product found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
