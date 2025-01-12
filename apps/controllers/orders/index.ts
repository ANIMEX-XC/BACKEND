import { createOrder } from './create'
import { findAllOrder, findDetailOrder } from './find'
import { removeOrder } from './remove'
import { updateOrder } from './update'

export const orderController = {
  create: createOrder,
  findAll: findAllOrder,
  findOne: findDetailOrder,
  remove: removeOrder,
  update: updateOrder
}
