import * as mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  wishListed: { type: Boolean, default: false },
})
const CartSchema = new mongoose.Schema({
  id: { type: Number, unique: false },

  title: {type:String, required: true},
  price: {type:Number, required: true},
  description: {type:String, required: true},
  image: {type:String, required: true},
  wishListed: {type:Boolean, required: false},
})


export const ProductModel = mongoose.model('Products', ProductSchema)
export const CartModel = mongoose.model('Cart', CartSchema)
