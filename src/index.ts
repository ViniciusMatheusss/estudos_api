import express from 'express';
import mongoose from 'mongoose';


import { router } from './router.js';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);

    app.listen(port, () => {
      console.log(`server is running em http://localhost:${port}`);
    });

  })
  .catch(() => console.log('Erro ao conectar no mongodb'));



