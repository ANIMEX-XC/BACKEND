import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { MyAddressesModel } from '../../models/myAddress'

export const findMyAddress = async (req: any, res: Response): Promise<any> => {
  try {
    const result = await MyAddressesModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
