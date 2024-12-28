import Joi from 'joi'

// Schema for creating a new platform
export const createPlatformSchema = Joi.object({
  platformName: Joi.string().max(255).required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
})

// Schema for updating an existing platform
export const updatePlatformSchema = Joi.object({
  platformId: Joi.number().integer().positive().required(),
  platformName: Joi.string().max(255).optional(),
  updatedAt: Joi.date().optional()
})

// Schema for deleting an platform
export const deletePlatformSchema = Joi.object({
  platformId: Joi.number().integer().positive().required()
})

// Schema for fetching a single platform
export const findOnePlatformSchema = Joi.object({
  platformId: Joi.number().integer().positive().required()
})

// Schema for fetching all OrderCategories with pagination and search support
export const findAllPlatformSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
