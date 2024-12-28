import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { SaleModel } from '../../models/saleModel'
import { deleteSaleSchema } from '../../schemas/saleSchema'
import logger from '../../utilities/logger'

export const removeSale = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(deleteSaleSchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await SaleModel.findOne({
      where: {
        deleted: 0,
        saleId: value.saleId
      }
    })

    if (!result) {
      const message = `Sale not found with ID: ${value.saleId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    result.deleted = 1
    void result.save()

    const response = ResponseData.success({ message: 'Sale deleted successfully' })
    logger.info('Sale deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
