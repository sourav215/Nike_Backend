const express = require("express")
const ClothModel = require("../models/clothDataModel")
const ProductModel = require("../models/ProductModel")
 
 


const clothDataController = express.Router()


clothDataController.get("/", async(req,res)=>{
 
 const cloths = await ProductModel.find({category:"Cloths"})
 // console.log("cloths",cloths)
 res.send(cloths)
})

module.exports= clothDataController;