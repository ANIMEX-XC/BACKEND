import Joi from 'joi'

// Schema for creating a new Company
export const createCompanySchema = Joi.object({
  companyName: Joi.string().max(255).required(),
  companyAddress: Joi.string().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
})

// Schema for updating an existing Company
export const updateCompanySchema = Joi.object({
  companyId: Joi.number().integer().positive().required(),
  companyName: Joi.string().max(255).optional(),
  companyAddress: Joi.string().optional(),
  updatedAt: Joi.date().optional()
})

// Schema for deleting an Company
export const deleteCompanySchema = Joi.object({
  companyId: Joi.number().integer().positive().required()
})

// Schema for fetching a single Company
export const findOneCompanySchema = Joi.object({
  companyId: Joi.number().integer().positive().required()
})

// Schema for fetching all OrderCategories with pagination and search support
export const findAllCompaniesSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
