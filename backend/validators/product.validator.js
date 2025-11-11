import Joi from 'joi';

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(200).required().trim(),
  description: Joi.string().min(10).max(2000).required(),
  price: Joi.number().min(0).required(),
  comparePrice: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).required(),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  category: Joi.string().required(),
  specifications: Joi.object().pattern(Joi.string(), Joi.string()).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  isFeatured: Joi.boolean().optional()
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(3).max(200).trim(),
  description: Joi.string().min(10).max(2000),
  price: Joi.number().min(0),
  comparePrice: Joi.number().min(0),
  stock: Joi.number().min(0),
  images: Joi.array().items(Joi.string().uri()).min(1),
  category: Joi.string(),
  specifications: Joi.object().pattern(Joi.string(), Joi.string()),
  tags: Joi.array().items(Joi.string()),
  isActive: Joi.boolean(),
  isFeatured: Joi.boolean()
}).min(1);

export const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(5).max(500).required()
});