import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { UserModel } from '../../models/user'
import { SaleModel } from '../../models/saleModel'
import { SaleItemModel } from '../../models/saleItemModel'
import { ProductModel } from '../../models/productModel'
import { CompanyModel } from '../../models/companyModel'
import { PlatformModel } from '../../models/platformModel'

export const findTotal = async (req: any, res: Response): Promise<any> => {
  try {
    const totalTransaction = await SaleModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalItemSales = await SaleItemModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalSuperAdmin = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        userRole: { [Op.eq]: 'superAdmin' }
      }
    })

    const totalAdmin = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        userRole: { [Op.eq]: 'admin' }
      }
    })

    const totalUser = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        userRole: { [Op.eq]: 'user' }
      }
    })

    const totalProduct = await ProductModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalPerusahaan = await CompanyModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })
    const totalPlatform = await PlatformModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const response = ResponseData.success({
      totalTransaction,
      totalItemSales,
      totalSuperAdmin,
      totalAdmin,
      totalUser,
      totalProduct,
      totalPerusahaan,
      totalPlatform
    })

    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
