import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { SaleItemModel } from '../../models/saleItemModel'
import { ProductModel } from '../../models/productModel'
import { SaleModel } from '../../models/saleModel'
import logger from '../../utilities/logger'
import { Pagination } from '../../utilities/pagination'
import { validateRequest } from '../../utilities/validateRequest'
import { findStatisticSchema } from '../../schemas/statisticSchema'

// Helper function to calculate date ranges
const getDateRange = (filterType: string) => {
  const now = new Date()
  let startDate: Date
  let endDate: Date = new Date()

  switch (filterType) {
    case 'day':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    case 'week':
      startDate = new Date(now)
      startDate.setDate(now.getDate() - now.getDay()) // Start of the week (Sunday)
      break
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1) // Start of the month
      break
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1) // Start of the year
      break
    default:
      startDate = new Date(0) // Default: all data
  }

  return { startDate, endDate }
}

export const findChart = async (req: any, res: Response): Promise<any> => {
  const { error, value } = validateRequest(findStatisticSchema, req.query)

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
      endDate,
      filterType // New query parameter for filtering
    } = value

    const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)

    // Calculate date range based on filterType
    const { startDate: filterStartDate, endDate: filterEndDate } = getDateRange(
      filterType ?? ''
    )

    const dateFilter = filterType
      ? {
          createdAt: {
            [Op.between]: [filterStartDate, filterEndDate]
          }
        }
      : startDate && endDate
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
            'saleItemQuantity',
            'saleItemPrice',
            'saleItemSubtotal'
          ],
          include: [
            {
              model: ProductModel,
              as: 'product',
              attributes: ['productName']
            }
          ]
        }
      ],
      attributes: ['createdAt', 'saleTotalAmount'],
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
