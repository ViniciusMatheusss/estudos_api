import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';

import { router } from './router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb://127.0.0.1:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use('/upload', express.static(path.resolve(__dirname, "..", 'upload')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);

    app.listen(port, () => {
      console.log(`✅ Server is running em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no MongoDB:', err);
  });
