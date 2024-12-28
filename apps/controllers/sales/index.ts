import { createSale } from './create'
import { findAllSales } from './findAll'
import { findOneSale } from './findOne'
import { removeSale } from './remove'
import { updateSale } from './update'

export const saleControllers = {
  findAll: findAllSales,
  findOne: findOneSale,
  create: createSale,
  update: updateSale,
  remove: removeSale
}
