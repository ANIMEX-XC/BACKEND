import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { SaleModel } from '../../models/saleModel'
import { SaleItemModel } from '../../models/saleItemModel'
import { findOneSaleSchema } from '../../schemas/saleSchema'
import logger from '../../utilities/logger'
import { ProductModel } from '../../models/productModel'

export const findOneSale = async (req: any, res: Response): Promise<Response> => {
  console.log(req.params)
  const { error, value } = validateRequest(findOneSaleSchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const sale = await SaleModel.findOne({
      where: {
        deleted: 0,
        saleId: value.saleId
      },
      include: [
        {
          model: SaleItemModel,
          as: 'saleItems',
          attributes: [
            'createdAt',
            'saleItemId',
            'saleId',
            'productId',
            'saleItemQuantity',
            'saleItemPrice',
            'saleItemSubtotal'
          ],
          include: [
            {
              model: ProductModel,
              as: 'product',
              attributes: [
                'productName',
                'productCategory',
                'productPrice',
                'productStockQuantity',
                'productCode'
              ]
            }
          ]
        }
      ],
      attributes: [
        'createdAt',
        'saleId',
        'saleTotalAmount',
        'salePaymentMethod',
        'saleCode',
        'saleDeliverCompanyName',
        'saleDeliverCompanyAddress'
      ]
    })

    if (!sale) {
      const message = `Sale not found with ID: ${value.saleId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success(sale)
    logger.info('Sale found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
