import { create } from './create'
import { findAll } from './findAll'
import { findOne } from './findOne'
import { remove } from './remove'
import { update } from './update'

export const companyControllers = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  remove: remove
}
