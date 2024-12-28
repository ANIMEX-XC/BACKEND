import Joi from 'joi'

export const findAllSaleSchema = Joi.object({
  page: Joi.number().integer().default(0),
  size: Joi.number().integer().default(10),
  search: Joi.string().allow('').optional(),
  salePlatformName: Joi.string().allow('').optional(),
  pagination: Joi.boolean().allow('').optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})

export const createSaleSchema = Joi.object({
  saleTotalAmount: Joi.number().positive().required(),
  saleTax: Joi.number().optional(),
  saleDiscount: Joi.number().optional(),
  saleDeliveryCost: Joi.number().optional(),
  salePaymentMethod: Joi.string().required(),
  salePlatformName: Joi.string().required(),
  saleDeliverCompanyName: Joi.string().required(),
  saleDeliverCompanyAddress: Joi.string().required(),
  salePo: Joi.string().optional().allow(''),
  saleItems: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().required(),
        saleItemQuantity: Joi.number().integer().positive().required(),
        saleItemPrice: Joi.number().positive().required(),
        saleItemSubtotal: Joi.number().positive().required()
      })
    )
    .required()
})

export const updateSaleSchema = Joi.object({
  saleId: Joi.number().integer().positive().required(),
  saleTotalAmount: Joi.number().positive().optional(),
  saleTax: Joi.number().positive().optional(),
  saleDiscount: Joi.number().positive().optional(),
  saleDeliveryCost: Joi.number().positive().optional(),
  salePaymentMethod: Joi.string().optional(),
  salePlatformName: Joi.string().optional(),
  saleDeliverCompanyName: Joi.string().optional(),
  saleOrderStatus: Joi.string()
    .valid('waiting', 'process', 'cancel', 'done')
    .optional()
    .allow(''),
  saleDeliverCompanyAddress: Joi.string().optional(),
  saleItems: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().optional(),
        saleItemQuantity: Joi.number().integer().positive().optional(),
        saleItemPrice: Joi.number().positive().optional(),
        saleItemSubtotal: Joi.number().positive().optional()
      })
    )
    .optional()
})

export const findOneSaleSchema = Joi.object({
  saleId: Joi.number().integer().positive().required()
})

export const deleteSaleSchema = Joi.object({
  saleId: Joi.number().integer().positive().required()
})
