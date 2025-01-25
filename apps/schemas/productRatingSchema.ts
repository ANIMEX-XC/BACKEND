import Joi from 'joi'

// Schema for creating a new ProductRating
export const createProductRatingSchema = Joi.object({
  productRatingUserId: Joi.number().integer().positive().required(),
  productRatingProductId: Joi.number().integer().positive().required(),
  productRatingStart: Joi.number().integer().min(1).max(5).required(), // Rating scale, assuming 1-5 stars
  productRatingDescription: Joi.string().allow('').optional()
})

// Schema for updating an existing ProductRating
export const updateProductRatingSchema = Joi.object({
  productRatingId: Joi.number().integer().positive().required(),
  productRatingUserId: Joi.number().integer().positive().optional(),
  productRatingProductId: Joi.number().integer().positive().optional(),
  productRatingStart: Joi.number().integer().min(1).max(5).optional(),
  productRatingDescription: Joi.string().allow('').optional()
})

// Schema for deleting a ProductRating
export const deleteProductRatingSchema = Joi.object({
  productRatingId: Joi.number().integer().positive().required()
})

// Schema for fetching a single ProductRating
export const findOneProductRatingSchema = Joi.object({
  productRatingId: Joi.number().integer().positive().required()
})

// Schema for fetching all ProductRatings with pagination and search support
export const findAllProductRatingsSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
