import csrf from 'csurf';
import { Router } from 'express';

const csrfProtection = csrf({ cookie: true });
const router = Router();

router.use(csrfProtection);

router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

router.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({
      error: 'Invalid CSRF token',
      message: 'Form submission failed. Please try again.'
    });
  } else {
    next(err);
  }
});

export default router;