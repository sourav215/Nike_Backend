const express = require("express");
const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");
const authentication = require('../middlewares/authentication')

const cartController = express.Router();

cartController.get("/",authentication, async(req, res) => {
  
 const cart = await CartModel.find({userId: req.body.userId})
 res.send(cart)
});

cartController.post("/",authentication, async(req, res) => {
  const { id, userId } = req.body;
 
  const cart = await CartModel.findOne({ userId,productId:id})
  // console.log(cart);
  
 
  if(cart){
    const incCart = await CartModel.findOneAndUpdate({_id:cart._id, userId},  { count: Number(cart.count)+1 })
  const update =  await CartModel.findOneAndUpdate({_id:cart._id, userId},  { price: Number(cart.price)+Number(cart.oldprice) })
   
  res.send(update)

 
  }
else {
 
//  console.log("userId", userId);
   const products = await ProductModel.findOne({ _id: id });
   
   const {
    _id,
    title,
    gender,
    description,
    category,
    price,
   
    size,
    color,
    rating,
    img
   } = products;
   
   const CartProduct = new CartModel({
    productId: _id,
    title,
    gender,
    description,
    category,
    price,
    oldprice:price,
    count:1,
    size,
    color,
    rating,
    img,
    userId
  });
  // console.log("userId sou: ", userId);
 
  CartProduct.save();
  res.send(CartProduct);
 }
});

 

cartController.post("/count",authentication, async(req, res) => {
  const { id,type, userId } = req.body;
  const cart = await CartModel.findOne({_id:id, userId})
   if(type==="inc"){
 const incCart = await CartModel.findOneAndUpdate({_id:id, userId},  { count: Number(cart.count)+1 })
   await CartModel.findOneAndUpdate({_id:id, userId},  { price: Number(cart.price)+Number(cart.oldprice) })
    const updatedCart = await CartModel.find({userId})
    return   res.send(updatedCart);
   } else if(type==="dec"){
    const decCart = await CartModel.findOneAndUpdate({_id:id,userId},  { count: Number(cart.count)-1 })
    await CartModel.findOneAndUpdate({_id:id, userId},  { price: Number(cart.price)-Number(cart.oldprice) })
    const updatedCart = await CartModel.find({userId})
    return   res.send(updatedCart);
   }
 
})


cartController.delete("/delete/:id",authentication, async(req,res)=>{
  const { id } = req.params;
 const userId = req.body.userId;
   await CartModel.deleteOne({_id:id,userId})
  const updatedCart = await CartModel.find({userId})
  return   res.send(updatedCart);
})
module.exports = cartController;
