import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { AddressModel } from '../../models/addressModel'
import { createAddressSchema } from '../../schemas/addressSchema'
import logger from '../../utilities/logger'

export const create = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createAddressSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    await AddressModel.create(value)

    const response = ResponseData.success({
      message: 'Address created successfully'
    })
    logger.info('Address created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
