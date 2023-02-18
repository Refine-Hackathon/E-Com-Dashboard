import * as express from 'express'
import {
  getProductByID,
  getProductByCategory,
} from '../Controllers/ProductController';
const productRouter = express.Router()


productRouter.get('/:category', (req, res) => {
  getProductByCategory(req, res)
})
productRouter.get('/id/:id', (req, res) => {
  getProductByID(req, res);
});


export default productRouter


