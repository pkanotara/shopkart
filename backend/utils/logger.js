export const logger = {
  info: (message, data = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`ℹ️  [INFO] ${message}`, data);
    }
  },
  
  error: (message, error = {}) => {
    console.error(`❌ [ERROR] ${message}`, error);
  },
  
  warn: (message, data = {}) => {
    console.warn(`⚠️  [WARN] ${message}`, data);
  },
  
  success: (message, data = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ [SUCCESS] ${message}`, data);
    }
  }
};