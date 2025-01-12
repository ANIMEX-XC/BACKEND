import { createMyAddress } from './create'
import { findMyAddress } from './find'
import { removeMyAddress } from './remove'
import { updateMyAddress } from './update'

export const myAddressController = {
  create: createMyAddress,
  find: findMyAddress,
  remove: removeMyAddress,
  update: updateMyAddress
}
