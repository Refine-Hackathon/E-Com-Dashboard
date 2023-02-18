import { Request, Response } from 'express'
import { ProductModel } from '../Models/ProductModel'
import {db} from '../index'

export const getProductByCategory = (req: Request, res: Response) => {
  const { category } = req.params;
  console.log(category);
  const query =
    'SELECT * from products where category = ' +"'" +category +"'"+ ';';
  db.query(query, (err, result2) => {
    if (err) {
      console.log(err);
      return res.status(500).send([]);
    }
    console.log(result2);
    return res.status(200).json(result2);
  });
};
export const getProductByID = (req: Request, res: Response) => {
  const { id } = req.params;
 
  const query =
    'select * from products where  prdt_id=' + "'"+id +"'" +";"
  db.query(query, (err, result2) => {
    if (err) {
      console.log(err);
      return res.status(500).send([]);
    }
    console.log(result2);
    return res.status(200).json(result2);
  });
};
