import express from 'express'
import {addCart, addOrder, deleteCart, getCart, getOrders, getProductById, getProducts} from "../controllers/shop.js"
import {authenticate} from '../middleware/auth.js';

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.get('/cart', authenticate, getCart)
router.post('/cart', authenticate, addCart)
router.delete('/cart/:id', authenticate, deleteCart)
router.get('/orders', authenticate, getOrders)
router.post('/orders', authenticate, addOrder)

export default router;