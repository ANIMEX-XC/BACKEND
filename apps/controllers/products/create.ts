import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductModel } from '../../models/productModel'
import { ProductVariantModel } from '../../models/productVariantModel'
import { createProductSchema } from '../../schemas/productSchema'
import logger from '../../utilities/logger'
import { generateUniqueId } from '../../utilities/generateId'

export const createProduct = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createProductSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    value['productCode'] = generateUniqueId()

    const { variants, ...productData } = value

    const product = await ProductModel.create(productData)

    if (variants && Array.isArray(variants)) {
      const variantRecords = variants.map((variant) => ({
        ...variant,
        productId: product.productId
      }))
      await ProductVariantModel.bulkCreate(variantRecords)
    }

    const response = ResponseData.success(product)
    logger.info('Product created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
