import Joi from 'joi'

const variantSchema = Joi.object({
  variantId: Joi.number().integer().optional().allow(''),
  productId: Joi.number().integer().optional().allow(''),
  variantName: Joi.string().max(255).required(),
  variantPrice: Joi.number().positive().required(),
  variantSize: Joi.string().max(100).optional(),
  variantColor: Joi.string().max(100).optional(),
  variantCategory: Joi.string().max(100).optional()
})

export const createProductSchema = Joi.object({
  productName: Joi.string().max(255).required(),
  productImage: Joi.string().optional(),
  productCategory: Joi.string().max(100).allow('').optional(),
  productPrice: Joi.number().positive().required(),
  productStockQuantity: Joi.number().integer().required(),
  variants: Joi.array().items(variantSchema).optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
})

export const updateProductSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  productName: Joi.string().max(255).optional(),
  productImage: Joi.string().optional(),
  productCategory: Joi.string().max(100).allow('').optional(),
  productPrice: Joi.number().positive().optional(),
  variants: Joi.array().items(variantSchema).optional(),
  productStockQuantity: Joi.number().integer().optional(),
  updatedAt: Joi.date().optional()
})

export const deleteProductSchema = Joi.object({
  productId: Joi.number().integer().positive().required()
})

export const findOneProductSchema = Joi.object({
  productId: Joi.number().integer().positive().required()
})

export const findAllProductsSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
