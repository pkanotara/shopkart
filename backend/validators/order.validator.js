import Joi from 'joi';

export const createOrderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required()
    })
  ).min(1).required(),
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().default('India')
  }).required()
});

export const updateOrderStatusSchema = Joi.object({
  orderStatus: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').required(),
  trackingNumber: Joi.string().optional(),
  notes: Joi.string().max(500).optional()
});