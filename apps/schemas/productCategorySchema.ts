import Joi from 'joi'

// Schema for creating a new ProductCategory
export const createProductCategorySchema = Joi.object({
  productCategoryName: Joi.string().max(255).required()
})

// Schema for updating an existing ProductCategory
export const updateProductCategorySchema = Joi.object({
  productCategoryId: Joi.number().integer().positive().required(),
  productCategoryName: Joi.string().max(255).optional()
})

// Schema for deleting a ProductCategory
export const deleteProductCategorySchema = Joi.object({
  productCategoryId: Joi.number().integer().positive().required()
})

// Schema for fetching a single ProductCategory
export const findOneProductCategorySchema = Joi.object({
  productCategoryId: Joi.number().integer().positive().required()
})

// Schema for fetching all ProductCategories with pagination and search support
export const findAllProductCategoriesSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
