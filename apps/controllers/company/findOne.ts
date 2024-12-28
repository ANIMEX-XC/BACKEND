import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { CompanyModel } from '../../models/companyModel'
import { findOneCompanySchema } from '../../schemas/companySchema'
import logger from '../../utilities/logger'

export const findOne = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findOneCompanySchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await CompanyModel.findOne({
      where: {
        companyId: value.companyId
      }
    })

    if (!result) {
      const message = `Company not found with ID: ${value.companyId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success(result)
    logger.info('Company found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
