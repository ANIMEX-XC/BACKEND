import Joi from 'joi'

export const createAddressSchema = Joi.object({
  addressUserId: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID must be a number.',
    'number.positive': 'User ID must be a positive number.'
  }),
  addressName: Joi.string().required().messages({
    'string.empty': 'Address name is required.'
  }),
  addressContact: Joi.string().required().messages({
    'string.empty': 'Address contact is required.'
  }),
  addressDetail: Joi.string().required().messages({
    'string.empty': 'Address detail is required.'
  }),
  addressPostalCode: Joi.string().required().messages({
    'string.empty': 'Postal code is required.'
  }),
  addressProvinsi: Joi.string().required().messages({
    'string.empty': 'Province is required.'
  }),
  addressKabupaten: Joi.string().required().messages({
    'string.empty': 'Kabupaten is required.'
  }),
  addressKecamatan: Joi.string().required().messages({
    'string.empty': 'Kecamatan is required.'
  })
})

export const updateAddressSchema = Joi.object({
  addressId: Joi.number().integer().positive().required().messages({
    'number.base': 'Address ID must be a number.',
    'number.positive': 'Address ID must be a positive number.'
  }),
  addressUserId: Joi.number().integer().positive().optional().messages({
    'number.base': 'User ID must be a number.',
    'number.positive': 'User ID must be a positive number.'
  }),
  addressName: Joi.string().optional().allow('').messages({
    'string.empty': 'Address name cannot be empty.'
  }),
  addressContact: Joi.string().optional().allow('').messages({
    'string.empty': 'Address contact cannot be empty.'
  }),
  addressDetail: Joi.string().optional().allow('').messages({
    'string.empty': 'Address detail cannot be empty.'
  }),
  addressPostalCode: Joi.string().optional().allow('').messages({
    'string.empty': 'Postal code cannot be empty.'
  }),
  addressProvinsi: Joi.string().optional().allow('').messages({
    'string.empty': 'Province cannot be empty.'
  }),
  addressKabupaten: Joi.string().optional().allow('').messages({
    'string.empty': 'Kabupaten cannot be empty.'
  }),
  addressKecamatan: Joi.string().optional().allow('').messages({
    'string.empty': 'Kecamatan cannot be empty.'
  })
})

export const deleteAddressSchema = Joi.object({
  addressId: Joi.number().integer().positive().required().messages({
    'number.base': 'Address ID must be a number.',
    'number.positive': 'Address ID must be a positive number.'
  })
})

export const findOneAddressSchema = Joi.object({
  addressId: Joi.number().integer().positive().required().messages({
    'number.base': 'Address ID must be a number.',
    'number.positive': 'Address ID must be a positive number.'
  })
})

export const findAllAddressesSchema = Joi.object({
  page: Joi.number().integer().positive().optional(),
  size: Joi.number().integer().positive().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
