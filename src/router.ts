import path from 'node:path';
import { fileURLToPath } from 'url';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories.js';
import { createCategory } from './app/useCases/categories/createCategory.js';
import { listProducts } from './app/useCases/products/listProducts.js';
import { createProduct } from './app/useCases/products/createProduct.js';
import { listProductsByCategories } from './app/useCases/categories/listProductsByCategories.js';
import { listOrders } from './app/useCases/orders/listOrders.js';
import { createOrder } from './app/useCases/orders/createOrder.js';
import { changeOrderSatus } from './app/useCases/orders/changeOrderSatus.js';


export const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", 'upload'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()} --${file.originalname}`);
    },
  }),
});

//List categories
router.get('/categories', listCategories);

//Create category
router.post('/categories', createCategory);

//List products
router.get('/products', listProducts);

//Create product
router.post('/products', upload.single('image'), createProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategories);

//List orders
router.get('/orders', listOrders);

//Creat order
router.post('/orders', createOrder);

//Change order status
router.patch('/orders/:orderId', changeOrderSatus);

//Delete/cancel order
router.delete('/orders/:orderId', (req, res) => {
  res.send('OK');
});
