import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { CompanyModel } from '../../models/companyModel'
import { updateCompanySchema } from '../../schemas/companySchema'
import logger from '../../utilities/logger'

export const update = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateCompanySchema, req.body)

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const [updated] = await CompanyModel.update(value, {
      where: { companyId: value.companyId }
    })

    if (!updated) {
      const message = `Company not found with ID: ${value.companyId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success({
      message: 'Company updated successfully'
    })
    logger.info('Company updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
