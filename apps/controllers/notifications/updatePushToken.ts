import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'

import { UserModel, type UserAttributes } from '../../models/user'

export const updatePushToken = async (req: any, res: Response): Promise<any> => {
  const requestBody: UserAttributes = req.body

  try {
    const newData: UserAttributes | any = {
      ...(requestBody.userFcmId.length > 0 && {
        userFcmId: requestBody.userFcmId
      })
    }

    console.log(req.body.user)

    await UserModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: req.body?.user?.userId }
      }
    })

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
