import type { Request, Response } from 'express';

import { Product } from '../../models/Product.js';

export async function createProduct(req: Request, res: Response) {

  try{
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    console.log ({
      name,
      description,
      price: Number (price),
      category,
      ingredients: JSON.parse(ingredients),
    });

   //await Product.create({
    //name,
    //description,
    //price: Number (price),
    //category,
  // });
  }catch (error) {
    console.log(error);
    res.sendStatus(500)
  }

}
