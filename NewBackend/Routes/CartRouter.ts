import * as express from 'express'
import { addToCart,viewCart } from '../Controllers/CartController'
const cartRouter = express.Router()

cartRouter.post('/', (req, res) => {
  addToCart(req, res)
})

cartRouter.get('/:uid' , (req,res) => {
  viewCart(req,res);
})

export default cartRouter
