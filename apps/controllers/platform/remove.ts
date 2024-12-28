import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { PlatformModel } from '../../models/platformModel' // Updated model import
import { deletePlatformSchema } from '../../schemas/platformSchema' // Updated schema import
import logger from '../../utilities/logger'

export const removePlatform = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(deletePlatformSchema, req.params) // Updated schema validation

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await PlatformModel.findOne({
      // Updated model reference
      where: {
        platformId: value.platformId // Assuming 'platformId' is the primary key
      }
    })

    if (!result) {
      const message = `Platform not found with ID: ${value.platformId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    await result.destroy()

    const response = ResponseData.success({
      message: 'Platform deleted successfully'
    })
    logger.info('Platform deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
