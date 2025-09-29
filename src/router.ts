import path from 'node:path';
import { fileURLToPath } from 'url';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories.js';
import { createCategory } from './app/useCases/categories/createCategory.js';
import { listProducts } from './app/useCases/products/listProducts.js';
import { createProduct } from './app/useCases/products/createProduct.js';


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
router.get('/categories/:categoryId/products', (req, res) => {
  res.send('OK');
});

//List orders
router.get('/orders', (req, res) => {
  res.send('OK');
});

//Creat order
router.post('/orders', (req, res) => {
  res.send('OK');
});

//Change order status
router.patch('/orders/:orderId', (req, res) => {
  res.send('OK');
});

//Delete/cancel order
router.delete('/orders/:orderId', (req, res) => {
  res.send('OK');
});
