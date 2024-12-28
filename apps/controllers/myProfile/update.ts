import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { UserModel, type UserAttributes } from '../../models/user'
import { APP_CONFIGS } from '../../configs'

export const updateMyProfile = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes

  try {
    if ('userPassword' in requestBody) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      requestBody.userPassword = require('crypto')
        .createHash('sha1')
        .update(requestBody.userPassword + APP_CONFIGS.secret.passwordEncryption)
        .digest('hex')
    }

    const newData: UserAttributes | any = {
      ...(requestBody.userName?.length > 0 && {
        userName: requestBody.userName
      }),
      ...(requestBody.userPassword?.length > 0 && {
        userPassword: requestBody.userPassword
      }),
      ...(requestBody.userRole?.length > 0 && {
        userRole: requestBody.userRole
      })
    }

    await UserModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: req.body?.user?.userId }
      }
    })

    const response = ResponseData.success({ message: 'success' })

    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
