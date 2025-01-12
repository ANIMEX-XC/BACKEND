import Joi from 'joi'

export const createNotificationSchema = Joi.object({
  notificationId: Joi.number().integer().positive().optional(),
  notificationName: Joi.string().required().messages({
    'string.empty': 'Notification name is required.'
  }),
  notificationMessage: Joi.string().required().messages({
    'string.empty': 'Notification message is required.'
  })
})

export const updateNotificationSchema = Joi.object({
  notificationId: Joi.number().integer().positive().required(),
  notificationName: Joi.string().optional().allow('').messages({
    'string.empty': 'Notification name cannot be empty.'
  }),
  notificationMessage: Joi.string().optional().allow('').messages({
    'string.empty': 'Notification message cannot be empty.'
  })
})

export const deleteNotificationSchema = Joi.object({
  notificationId: Joi.number().integer().positive().required().messages({
    'number.base': 'Notification ID must be a number.',
    'number.positive': 'Notification ID must be a positive number.'
  })
})

export const findOneNotificationSchema = Joi.object({
  notificationId: Joi.number().integer().positive().required().messages({
    'number.base': 'Notification ID must be a number.',
    'number.positive': 'Notification ID must be a positive number.'
  })
})

export const findAllNotificationsSchema = Joi.object({
  page: Joi.number().integer().positive().optional(),
  size: Joi.number().integer().positive().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
