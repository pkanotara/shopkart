export const sanitizeUser = (user) => {
  const sanitized = user.toObject();
  delete sanitized.passwordHash;
  delete sanitized.refreshToken;
  delete sanitized.__v;
  return sanitized;
};

export const sanitizeProduct = (product) => {
  const sanitized = product.toObject();
  delete sanitized.__v;
  return sanitized;
};