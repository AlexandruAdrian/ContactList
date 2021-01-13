const express = require("express");
const userController = require("../controllers/userController");
const isAuthorized = require("../middlewares/authorization");
const { body } = require("express-validator");

const userRoutes = () => {
  const router = express.Router();

  router.post(
    "/register",
    [
      body("name", "Name field is required").trim().not().isEmpty(),
      body("phoneNumber", "Phone number field is required")
        .trim()
        .not()
        .isEmpty(),
      body("phoneNumber", "Invalid phone number").isNumeric(),
      body("password", "Password field is required").trim().not().isEmpty(),
      body(
        "password",
        "Password must be between 6-100 characters long"
      ).isLength({ min: 6, max: 100 }),
    ],
    userController.userRegister
  );

  router.post("/login", userController.userLogin);
  router.get("/me", isAuthorized, userController.userInfo);

  return router;
};

module.exports = userRoutes();
