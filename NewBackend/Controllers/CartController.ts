import { Request, Response } from 'express'
import { CartModel } from '../Models/ProductModel'
export const getAllFromCart = (req: Request, res: Response) => {
  CartModel.find()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => res.send(err))
}


export const addToCart = (req: Request, res: Response) => {
const newProduct = new CartModel(req.body)
newProduct
  .save()
  .then((response) => {
    res.send('Product Added ' + response)
  })
  .catch((err) => {
    console.log(err)
    res.status(400).send('Failed Error: ' + err)
  })

}

export const deleteOneProductById = (req:Request,res:Response)=>{

  CartModel.findOneAndDelete({id:req.params.id}).then((data)=>{
   return data?.toString()
  }).then((data)=>{


     console.log("Res" +data);
    res.send("Deleted "+data);
  }).catch((err)=>{
    res.send(err)
  })

}