import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductModel } from '../../models/productModel'
import { createProductSchema } from '../../schemas/productSchema'
import { ProductImageModel } from '../../models/productImageModel'
import logger from '../../utilities/logger'

export const create = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createProductSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const product = await ProductModel.create({
      ...value,
      productUserId: value.jwtPayload.userId
    })

    console.log(value)

    if (value.productImages && value.productImages.length > 0) {
      const productImages = value.productImages.map((image: any) => ({
        ...image,
        productImageProductId: product.productId
      }))
      await ProductImageModel.bulkCreate(productImages)
    }

    const response = ResponseData.success({ message: 'Product created successfully' })
    logger.info('Product created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
