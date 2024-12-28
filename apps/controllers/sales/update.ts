import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { SaleModel } from '../../models/saleModel'
import { updateSaleSchema } from '../../schemas/saleSchema'
import logger from '../../utilities/logger'
// import { SaleItemModel } from '../../models/saleItemModel'

export const updateSale = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateSaleSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const [updated] = await SaleModel.update(value, {
      where: { deleted: 0, saleId: value.saleId }
    })

    if (!updated) {
      const message = `Sale not found with ID: ${value.saleId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    // const sale = await SaleModel.findByPk(value.saleId, {
    //   include: [
    //     {
    //       model: SaleItemModel,
    //       as: 'salesItems'
    //     }
    //   ]
    // })

    const response = ResponseData.success(updateSale)
    logger.info('Sale updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
