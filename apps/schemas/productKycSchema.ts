import Joi from 'joi'

// Schema for creating a new UserKyc
export const createUserKycSchema = Joi.object({
  userKycUserId: Joi.number().integer().positive().required(),
  userKycKtpImage: Joi.string().uri().required(),
  userKycSelfieImage: Joi.string().uri().required(),
  userKycRealName: Joi.string().max(255).required(),
  userKycAddress: Joi.string().required(),
  userKycDateOfBirth: Joi.date().iso().required() // Expecting ISO date format (YYYY-MM-DD)
})

// Schema for updating an existing UserKyc
export const updateUserKycSchema = Joi.object({
  userKycId: Joi.number().integer().positive().required(),
  userKycUserId: Joi.number().integer().positive().optional(),
  userKycKtpImage: Joi.string().uri().optional(),
  userKycSelfieImage: Joi.string().uri().optional(),
  userKycRealName: Joi.string().max(255).optional(),
  userKycAddress: Joi.string().optional(),
  userKycDateOfBirth: Joi.date().iso().optional()
})

// Schema for deleting a UserKyc
export const deleteUserKycSchema = Joi.object({
  userKycId: Joi.number().integer().positive().required()
})

// Schema for fetching a single UserKyc
export const findOneUserKycSchema = Joi.object({
  userKycId: Joi.number().integer().positive().required()
})

// Schema for fetching all UserKyc records with pagination and search support
export const findAllUserKycSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
