import * as express from 'express'
import { addToCart, } from '../Controllers/CartController'
const cartRouter = express.Router()

cartRouter.post('/', (req, res) => {
  addToCart(req, res)
})


export default cartRouter
