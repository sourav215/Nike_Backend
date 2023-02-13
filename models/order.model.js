const mongoose = require("mongoose");
const crypto = require("crypto");

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const reqArray = { type: Array, required: true };

const OrderSchema = new mongoose.Schema(
  {
    productId: String,
    orderId: reqString,
    title: reqString,
    gender: String,
    description: reqString,
    category: reqString,
    price: reqNumber,
    oldprice: reqNumber,
    count: Number,
    size: reqArray,
    color: reqString,
    rating: reqNumber,
    img: reqArray,
    userId: reqString,
  },
  {
    versionKey: false,
  }
);

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
