import xss from 'xss';
import { escape } from 'validator';

export const sanitizeInput = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeInput(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = sanitizeInput(obj[key]);
      return acc;
    }, {});
  }

  if (typeof obj === 'string') {
    return xss(escape(obj));
  }

  return obj;
};

export const sanitizeMiddleware = (req, res, next) => {
  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  req.params = sanitizeInput(req.params);
  next();
};