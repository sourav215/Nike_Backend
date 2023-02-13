require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDatabase = require("./config/db");
const authController = require("./controllers/authController");
const clothDataController = require("./controllers/clothDataController");
const ShoeController = require("./controllers/shoeController");
const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController");

const orderController = require("./controllers/order.controller");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Nike ");
});

app.use("/users", authController);
app.use("/clothData", clothDataController);
app.use("/shoeData", ShoeController);
app.use("/products", productController);
app.use("/cart", cartController);
app.use("/orders", orderController);

const PORT = 8080;
app.listen(PORT, () => {
  try {
    connectDatabase();
    console.log("Server is listening...");
  } catch (err) {
    console.log(err);
  }
});
