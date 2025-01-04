import express from 'express'
import {body, validationResult} from "express-validator"
import {deleteProduct, editProduct, getProductById, getProducts, postProduct} from "../controllers/admin.js"

const validateProduct = [
  body('title')
    .notEmpty()
    .trim()
    .isLength({min: 3})
    .withMessage('Title must be at least 3 characters long.')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('Title can only contain letters, numbers, and spaces.'),

  body('imageUrl')
    .notEmpty()
    .trim()
    .isURL()
    .withMessage('Image URL must be a valid URL.'),

  body('price')
    .notEmpty()
    .isFloat()
    .withMessage('Price must be a valid number.'),

  body('description')
    .notEmpty()
    .trim()
    .isLength({min: 5})
    .withMessage('Description must be at least 5 characters long.')
    .optional(),
];

const handleProductValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  next();
};

const router = express.Router();

router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.post('/products', validateProduct, handleProductValidation, postProduct)
router.put('/products/:id', validateProduct, handleProductValidation, editProduct)
router.delete('/products/:id', deleteProduct)

export default router;