import * as express from 'express'
import { getAllFromCart ,addToCart, deleteOneProductById} from '../Controllers/CartController'
const cartRouter = express.Router()

cartRouter.get('/', (req, res) => {
  getAllFromCart(req, res)
})
cartRouter.post('/', (req, res) => {
  addToCart(req, res)
})
cartRouter.delete('/:id', (req, res) => {
  deleteOneProductById(req, res)
})

export default cartRouter
