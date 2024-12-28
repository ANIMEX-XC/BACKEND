import Joi from 'joi'

export const findStatisticSchema = Joi.object({
  page: Joi.number().integer().default(0),
  size: Joi.number().integer().default(10),
  search: Joi.string().allow('').optional(),
  salePlatformName: Joi.string().allow('').optional(),
  pagination: Joi.boolean().allow('').optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional(),
  filterType: Joi.string().allow('').optional()
})
