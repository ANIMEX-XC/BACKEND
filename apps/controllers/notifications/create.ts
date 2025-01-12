/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { v4 as uuidv4 } from 'uuid'
import {
  NotificationModel,
  type NotificationAttributes
} from '../../models/notifications'
import { Expo } from 'expo-server-sdk'
import { Op } from 'sequelize'
import { UserModel } from '../../models/user'

export const createNotification = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as NotificationAttributes

  const emptyField = requestChecker({
    requireList: ['notificationName', 'notificationMessage'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const users = await UserModel.findAll({
      where: {
        deleted: { [Op.eq]: 0 }
      },
      attributes: ['userFcmId']
    })

    for (let i = 0; users.length > i; i++) {
      if (users[i].userFcmId !== null) {
        void sendNotification({
          expoPushToken: users[i].userFcmId,
          data: {
            title: requestBody.notificationName,
            body: requestBody.notificationMessage
          }
        })
      }
    }

    requestBody.notificationId = uuidv4()
    await NotificationModel.create(requestBody)

    const response = ResponseData.default
    const result = { message: 'success' }
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

interface NotificationMessage {
  title: string
  body: string
}

const sendNotification = async ({
  expoPushToken,
  data
}: {
  expoPushToken: string
  data: NotificationMessage
}) => {
  const expo = new Expo({ accessToken: process.env.ACCESS_TOKEN, useFcmV1: false })

  const chunks = expo.chunkPushNotifications([{ to: expoPushToken, ...data }])
  const tickets = []

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      tickets.push(...ticketChunk)
    } catch (error) {
      console.error(error)
    }
  }

  let response = ''

  for (const ticket of tickets) {
    if (ticket.status === 'error') {
      if (ticket.details != null && ticket.details.error === 'DeviceNotRegistered') {
        response = 'DeviceNotRegistered'
      }
    }

    if (ticket.status === 'ok') {
      response = ticket.id
    }
  }

  return response
}
