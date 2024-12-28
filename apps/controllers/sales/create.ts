import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { SaleModel } from '../../models/saleModel'
import { SaleItemModel } from '../../models/saleItemModel'
import { createSaleSchema } from '../../schemas/saleSchema'
import logger from '../../utilities/logger'
import { generateUniqueId } from '../../utilities/generateId'

export const createSale = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createSaleSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const { salesItems, ...saleData } = value
    const saleCode = generateUniqueId()
    const sale = await SaleModel.create(
      { ...saleData, saleCode: generateUniqueId(), userId: 1 },
      {
        include: [
          {
            model: SaleItemModel,
            as: 'saleItems'
          }
        ]
      }
    )

    if (salesItems && salesItems.length) {
      await Promise.all(
        salesItems.map((item: any) =>
          SaleItemModel.create({
            ...item,
            saleId: sale.saleId
          })
        )
      )
    }

    const response = ResponseData.success(sale)
    logger.info('Sale created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
