import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { SaleModel } from '../../models/saleModel'
import { findAllSaleSchema } from '../../schemas/saleSchema'
import logger from '../../utilities/logger'
import { SaleItemModel } from '../../models/saleItemModel'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { ProductModel } from '../../models/productModel'

export const findAllSales = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findAllSaleSchema, req.query)

  if (error) {
    const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const {
      page: queryPage,
      size: querySize,
      search,
      pagination,
      salePlatformName,
      startDate,
      endDate
    } = value

    const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)

    const dateFilter =
      startDate && endDate
        ? {
            createdAt: {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            }
          }
        : {}

    const result = await SaleModel.findAndCountAll({
      where: {
        deleted: 0,
        ...(Boolean(salePlatformName) && {
          salePlatformName: salePlatformName
        }),
        ...(Boolean(search) && {
          [Op.or]: [{ salePaymentMethod: { [Op.like]: `%${search}%` } }]
        }),
        ...dateFilter
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
                'productStockQuantity'
              ]
            }
          ]
        }
      ],

      attributes: [
        'createdAt',
        'saleTotalAmount',
        'saleId',
        'salePaymentMethod',
        'saleCode',
        'saleDeliverCompanyName',
        'saleDeliverCompanyAddress',
        'salePlatformName',
        'salePo',
        'saleOrderStatus'
      ],

      order: [['saleId', 'desc']],
      ...(pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success(page.formatData(result))
    logger.info('Sales retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
