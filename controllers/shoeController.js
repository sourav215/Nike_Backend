const express = require("express")
const ProductModel = require("../models/ProductModel")
const ShoeModel = require("../models/shoeDataModel")
 
 


const ShoeController = express.Router()


ShoeController.get("/", async(req,res)=>{

 const shoes = await ProductModel.findOne({category:"Shoes"})
 
 res.send([shoes])
})

module.exports = ShoeController;