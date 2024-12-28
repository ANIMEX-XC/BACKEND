import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { PlatformModel } from '../../models/platformModel' // Updated model import
import { findAllPlatformSchema } from '../../schemas/platformSchema' // Updated schema import
import logger from '../../utilities/logger'
import { Pagination } from '../../utilities/pagination'
import { Op } from 'sequelize'

export const findAllPlatforms = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findAllPlatformSchema, req.query) // Updated schema validation

  if (error) {
    const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const { page: queryPage, size: querySize, search, pagination } = value

    const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)

    const result = await PlatformModel.findAndCountAll({
      // Updated model reference
      where: {
        ...(Boolean(req.query.search) && {
          platformName: { [Op.like]: `%${search}%` } // Assuming 'platformName' is a column, update if necessary
        })
      },
      order: [['platformId', 'desc']], // Assuming 'platformId' is the primary key
      ...(pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success(result)
    response.data = page.formatData(result)

    logger.info('Platforms retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
