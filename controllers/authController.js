const express = require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const authController = express.Router();

const generateToken = (user) => {
  const { _id, email } = user;
  let token = jwt.sign({ _id, email }, config.JWT_SECRET_KEY);

  return token;
};

authController.post("/signup", async (req, res) => {
  try {
    let { firstName, lastName, email, password, gender } = req.body;
    
    if (!firstName || !email || !password || !gender) {
      return res
        .status(500)
        .json({ status: "Failed", message: "Incomplete Data" });
    }

    let user = await UserModel.findOne({ email: email });

    if (user) {
      return res.status(500).json({
        status: "Failed",
        message:
          "User with email already exists. Please try with different email",
      });
    }
    password = bcrypt.hashSync(password);

    user = await UserModel.create({
      firstName,
      lastName,
      email,
      gender,
      password,
    });
    res.send("user successfully created");

    // bcrypt.hash(password, 8, async function (err, hash) {
    //   const users = new UserModel({
    //     firstName,
    //     lastName,
    //     email,
    //     password: hash,
    //     gender,
    //   });

    //   await users.save();
    //   res.send("user successfully created");
    // });
  } catch (err) {
    // console.log(err);
    return res
      .status(500)
      .json({ status: "Failed", message: "Something went wrong" });
  }
});

authController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .json({ status: "failed", message: "Please check your email" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(500)
        .json({ status: "failed", message: "Please check your password" });
    }
    const token = generateToken(user);

    const { _id } = user;
    return res.send({ message: "Login Successful", token: token });

  } catch (err) {
    return res
      .status(500)
      .json({ status: "failed", message: "Please check your password" });
  }

  // const hash = user.password;
  // const userId = user._id;
  // bcrypt.compare(password, hash, function (err, result) {
  //   if (result) {
  //     var token = jwt.sign({ email, userId }, "secret");
  //     return res.send({ message: "login success", token: token });
  //   } else {
  //     return res
  //       .status(500)
  //       .json({ status: "failed", message: "Please check your password" });
  //   }
  // });
});

module.exports = authController;
