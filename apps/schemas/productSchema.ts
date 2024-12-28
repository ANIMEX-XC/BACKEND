import Joi from 'joi'

// Schema for creating a new Product
export const createProductSchema = Joi.object({
  productUserId: Joi.number().integer().positive().required(),
  productName: Joi.string().max(255).required(),
  productDescription: Joi.string().required(),
  productCategoryId: Joi.number().integer().positive().required(),
  productPrice: Joi.number().positive().required(),
  productWeight: Joi.number().positive().required(),
  productColors: Joi.string().optional(),
  productSizes: Joi.string().optional(),
  productTransactionType: Joi.valid('Sell', 'Auction', 'Barter', 'PurchaseOrder')
    .default('Sell')
    .required(),
  productImages: Joi.array()
    .items(
      Joi.object({
        productImageUrl: Joi.string().uri().required()
      })
    )
    .required()
})

// Schema for updating an existing Product
export const updateProductSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  productUserId: Joi.number().integer().positive().optional(),
  productName: Joi.string().max(255).optional(),
  productDescription: Joi.string().optional(),
  productCategoryId: Joi.number().integer().positive().optional(),
  productPrice: Joi.number().positive().optional(),
  productWeight: Joi.number().positive().optional(),
  productColors: Joi.string().optional(),
  productSizes: Joi.string().optional(),
  productTransactionType: Joi.valid(
    'Sell',
    'Auction',
    'Barter',
    'PurchaseOrder'
  ).optional(),
  productImages: Joi.array()
    .items(
      Joi.object({
        productImageUrl: Joi.string().uri().required()
      })
    )
    .optional()
})

// Schema for deleting a Product
export const deleteProductSchema = Joi.object({
  productId: Joi.number().integer().positive().required()
})

// Schema for fetching a single Product
export const findOneProductSchema = Joi.object({
  productId: Joi.number().integer().positive().required()
})

// Schema for fetching all Products with pagination and search support
export const findAllProductsSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
