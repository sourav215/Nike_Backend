const router = require("express").Router();
const crypto = require("crypto");
const authentication = require("../middlewares/authentication");
const CartModel = require("../models/CartModel");
const Order = require("../models/order.model");

router.post("/", authentication, async (req, res) => {
  try {
    const cart = await CartModel.find({ userId: req.body.userId });
    if(!cart){
       return res.send("There are no products");
    }
    const paymentId = crypto.randomUUID();
    cart.map((ele) => {
      const {
        _id,
        productId,
        title,
        gender,
        description,
        category,
        price,
        oldprice,
        count,
        size,
        color,
        rating,
        img,
        userId,
      } = ele;

      const NewOrder = new Order({
        productId,
        title,
        gender,
        description,
        category,
        price,
        oldprice,
        count,
        size,
        color,
        rating,
        img,
        userId,
        orderId: paymentId,
      });
      NewOrder.save();
    });

    await CartModel.deleteMany({ userId: req.body.userId });

    const latestOrder = await Order.find({ userId: req.body.userId });

    res.send({
      orderId: paymentId,
      data: latestOrder,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

router.get("/", authentication, async (req, res) => {
  try {
    const allorders = await Order.find({ userId: req.body.userId });
    res.send(allorders);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
