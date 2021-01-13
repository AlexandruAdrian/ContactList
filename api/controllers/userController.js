const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

const userRegister = async (req, res, next) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const err = new Error(result.errors[0].msg);
      err.status = 422;
      next(err);
      return;
    }
    const { name, phoneNumber, password } = req.body;

    const foundUser = await User.findOne({ phoneNumber });
    if (foundUser) {
      return res.status(409).json({
        message: "Phone number already in use",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, phoneNumber, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      phoneNumber: newUser.phoneNumber,
    });
  } catch (err) {
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const PRIVATE_KEY = process.env.SECRET;
    const { phoneNumber, password } = req.body;

    const foundUser = await User.findOne({ phoneNumber });
    if (!foundUser) {
      return res.status(404).json({
        message: "Wrong phone number or password",
      });
    }

    const matchPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchPassword) {
      return res.status(403).json({
        message: "Wrong phone number or password",
      });
    }

    const token = jwt.sign({ _id: foundUser._id }, PRIVATE_KEY, {
      expiresIn: "28d",
    });

    return res.status(200).json(token);
  } catch (err) {
    next(err);
  }
};

const userInfo = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const foundUser = await User.findOne({ _id: userId });

    if (!foundUser) {
      return res.sendStatus(404);
    }

    return res.status(200).json({
      name: foundUser.name,
      phoneNumber: foundUser.phoneNumber,
      joinedAt: foundUser.joinedAt,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userRegister,
  userLogin,
  userInfo,
};
