import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview
} from '../controllers/product.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isVendorOrAdmin } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import {
  createProductSchema,
  updateProductSchema,
  reviewSchema
} from '../validators/product.validator.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post(
  '/',
  protect,
  isVendorOrAdmin,
  validate(createProductSchema),
  createProduct
);

router.put(
  '/:id',
  protect,
  isVendorOrAdmin,
  validate(updateProductSchema),
  updateProduct
);

router.delete('/:id', protect, isVendorOrAdmin, deleteProduct);

router.post('/:id/reviews', protect, validate(reviewSchema), addReview);

export default router;