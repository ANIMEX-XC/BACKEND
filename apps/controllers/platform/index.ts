import { createPlatform } from './create'
import { findAllPlatforms } from './findAll'
import { findPlatform } from './findOne'
import { removePlatform } from './remove'
import { updatePlatform } from './update'

export const platformControllers = {
  findAll: findAllPlatforms,
  findOne: findPlatform,
  create: createPlatform,
  update: updatePlatform,
  remove: removePlatform
}
