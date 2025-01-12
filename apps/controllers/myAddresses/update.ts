import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { MyAddressesModel, type MyAddressesAttributes } from '../../models/myAddress'

export const updateMyAddress = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as MyAddressesAttributes

  const emptyField = requestChecker({
    requireList: ['myAddressId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await MyAddressesModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        myAddressId: { [Op.eq]: requestBody.myAddressId }
      }
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: MyAddressesAttributes | any = {
      ...(requestBody.myAddressName.length > 0 && {
        myAddressName: requestBody.myAddressName
      }),
      ...(requestBody.myAddressKontak.length > 0 && {
        myAddressKontak: requestBody.myAddressKontak
      }),
      ...(requestBody.myAddressDetail.length > 0 && {
        myAddressDetail: requestBody.myAddressDetail
      }),
      ...(requestBody.myAddressPostalCode.length > 0 && {
        myAddressPostalCode: requestBody.myAddressPostalCode
      }),
      ...(requestBody.myAddressProvinsi.length > 0 && {
        myAddressProvinsi: requestBody.myAddressProvinsi
      }),
      ...(requestBody.myAddressKabupaten.length > 0 && {
        myAddressKabupaten: requestBody.myAddressKabupaten
      }),
      ...(requestBody.myAddressKecamatan.length > 0 && {
        myAddressKecamatan: requestBody.myAddressKecamatan
      })
    }

    await MyAddressesModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        myAddressId: { [Op.eq]: requestBody.myAddressId }
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
