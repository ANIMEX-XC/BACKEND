import Joi from 'joi'

export const createOrderSchema = Joi.object({
  orderId: Joi.number().integer().positive().required(),
  orderUserBuyerId: Joi.number().integer().positive().required(),
  orderUserOwnerId: Joi.number().integer().positive().required(),
  orderProductId: Joi.number().integer().positive().required(),
  orderProductPrice: Joi.number().positive().required(),
  orderTotalProductPrice: Joi.number().positive().required(),
  orderOngkirPrice: Joi.number().positive().required(),
  orderTotalItem: Joi.number().integer().positive().required(),
  orderStatus: Joi.string()
    .valid('waiting', 'process', 'delivery', 'done', 'cancel')
    .required()
})

export const updateOrderSchema = Joi.object({
  orderId: Joi.number().integer().positive().required(),
  orderUserBuyerId: Joi.number().integer().positive().optional().allow(''),
  orderUserOwnerId: Joi.number().integer().positive().optional().allow(''),
  orderProductId: Joi.number().integer().positive().optional().allow(''),
  orderProductPrice: Joi.number().positive().optional().allow(''),
  orderTotalProductPrice: Joi.number().positive().optional().allow(''),
  orderOngkirPrice: Joi.number().positive().optional().allow(''),
  orderTotalItem: Joi.number().integer().positive().optional().allow(''),
  orderStatus: Joi.string()
    .valid('waiting', 'process', 'delivery', 'done', 'cancel')
    .optional()
    .allow('')
})

export const deleteOrderSchema = Joi.object({
  orderId: Joi.number().integer().positive().required()
})

export const findOneOrderSchema = Joi.object({
  orderId: Joi.number().integer().positive().required()
})

export const findAllOrdersSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
