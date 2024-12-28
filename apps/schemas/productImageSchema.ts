import Joi from 'joi'

// Schema for creating a new ProductImage
export const createProductImageSchema = Joi.object({
  productImageProductId: Joi.number().integer().positive().required(),
  productImageUrl: Joi.string().uri().required()
})

// Schema for updating an existing ProductImage
export const updateProductImageSchema = Joi.object({
  productImageId: Joi.number().integer().positive().required(),
  productImageProductId: Joi.number().integer().positive().optional(),
  productImageUrl: Joi.string().uri().optional(),
  updatedAt: Joi.date().optional()
})

// Schema for deleting a ProductImage
export const deleteProductImageSchema = Joi.object({
  productImageId: Joi.number().integer().positive().required()
})

// Schema for fetching a single ProductImage
export const findOneProductImageSchema = Joi.object({
  productImageId: Joi.number().integer().positive().required()
})

// Schema for fetching all ProductImages with pagination and search support
export const findAllProductImagesSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
