import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { PlatformModel } from '../../models/platformModel' // Updated model import
import { createPlatformSchema } from '../../schemas/platformSchema' // Updated schema import
import logger from '../../utilities/logger'

export const createPlatform = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createPlatformSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const platform = await PlatformModel.create(value) // Updated model reference
    const response = ResponseData.success(platform)
    logger.info('Platform created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
