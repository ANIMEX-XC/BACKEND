import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { v4 as uuidv4 } from 'uuid'
import { MyAddressesModel, type MyAddressesAttributes } from '../../models/myAddress'
import { Op } from 'sequelize'

export const createMyAddress = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as MyAddressesAttributes

  const emptyField = requestChecker({
    requireList: [
      'myAddressName',
      'myAddressKontak',
      'myAddressDetail',
      'myAddressPostalCode',
      'myAddressProvinsi',
      'myAddressKabupaten',
      'myAddressKecamatan'
    ],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const myAddress = await MyAddressesModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    if (myAddress != null) {
      void myAddress.destroy()
    }

    requestBody.myAddressId = uuidv4()
    await MyAddressesModel.create(requestBody)

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
