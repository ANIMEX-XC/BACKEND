import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { ProductModel } from '../../models/productModel'
import { ProductVariantModel } from '../../models/productVariantModel'
import { updateProductSchema } from '../../schemas/productSchema'
import logger from '../../utilities/logger'

export const updateProduct = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateProductSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const { productId, variants, ...productData } = value

    // Update the main product details
    const [updated] = await ProductModel.update(productData, {
      where: { deleted: 0, productId }
    })

    if (!updated) {
      const message = `Product not found with ID: ${productId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    // Handle variants if provided
    if (variants && Array.isArray(variants)) {
      const existingVariants = await ProductVariantModel.findAll({
        where: { productId }
      })

      // Delete variants not included in the update
      const variantIdsToKeep = variants.map((v) => v.variantId).filter(Boolean)
      await ProductVariantModel.destroy({
        where: {
          productId,
          variantId: { $notIn: variantIdsToKeep }
        }
      })

      // Update or create variants
      for (const variant of variants) {
        if (variant.variantId) {
          // Update existing variant
          await ProductVariantModel.update(variant, {
            where: { variantId: variant.variantId }
          })
        } else {
          // Create new variant
          await ProductVariantModel.create({ ...variant, productId })
        }
      }
    }

    const response = ResponseData.success({ message: 'Product updated successfully' })
    logger.info('Product updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
