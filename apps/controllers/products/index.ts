import { createProduct } from './create'
import { findAllProducts } from './findAll'
import { findProduct } from './findOne'
import { removeProduct } from './remove'
import { updateProduct } from './update'

export const productControllers = {
  findAll: findAllProducts,
  findOne: findProduct,
  create: createProduct,
  update: updateProduct,
  remove: removeProduct
}
