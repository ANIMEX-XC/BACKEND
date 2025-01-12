import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { AddressModel } from '../../models/addressModel'
import { updateAddressSchema } from '../../schemas/addressSchema'
import logger from '../../utilities/logger'

export const update = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateAddressSchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const [updated] = await AddressModel.update(value, {
      where: { deleted: 0, addressId: value.addressId }
    })

    if (!updated) {
      const message = `Address not found with ID: ${value.addressId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success({
      message: 'Address updated successfully'
    })
    logger.info('Address updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
