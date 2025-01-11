import Joi from 'joi'

export const jwtPayloadSchema = Joi.object({
  userId: Joi.number().optional(),
  userRole: Joi.string().optional(),
  userName: Joi.string().optional().allow(''),
  userContact: Joi.string().optional().allow(''),
  iat: Joi.any().optional()
})
