import { type Response, type Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { validateRequest } from '../../utilities/validateRequest'
import { userRegistrationSchema } from '../../schemas/userSchema'
import { ResponseData } from '../../utilities/response'
import { type UserAttributes, UserModel } from '../../models/userModel'
import { hashPassword } from '../../utilities/scure_password'
import logger from '../../utilities/logger'

export const userRegister = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(userRegistrationSchema, req.body)

  if (error) {
    const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  const { userName, userPassword } = value as UserAttributes

  try {
    const existingUser = await UserModel.findOne({
      raw: true,
      where: {
        deleted: { [Op.eq]: 0 },
        userName: { [Op.eq]: userName }
      }
    })

    if (existingUser) {
      const message = `Username ${existingUser.userName} is already registered. Please use another one.`
      logger.info(`Registration attempt failed: ${message}`)
      return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
    }

    const hashedPassword = hashPassword(userPassword)
    const newUser = {
      ...value,
      userPassword: hashedPassword
    }

    await UserModel.create(newUser)
    logger.info(`User ${userName} registered successfully`)

    return res
      .status(StatusCodes.CREATED)
      .json(ResponseData.success({ message: 'Registration successful' }))
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
