import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { NotificationModel } from '../../models/notificationModel'
import { deleteNotificationSchema } from '../../schemas/notificationSchema'
import logger from '../../utilities/logger'

export const remove = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(deleteNotificationSchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await NotificationModel.findOne({
      where: {
        deleted: 0,
        notificationId: value.notificationId
      }
    })

    if (!result) {
      const message = `Notification not found with ID: ${value.notificationId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    result.set('deleted', 1)
    await result.save()

    const response = ResponseData.success({
      message: 'Notification deleted successfully'
    })
    logger.info('Notification deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
