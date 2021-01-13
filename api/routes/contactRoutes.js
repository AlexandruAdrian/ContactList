const express = require("express");
const contactController = require("../controllers/contactController");
const isAuthorized = require("../middlewares/authorization");
const { body, param } = require("express-validator");
const { isObjectIdValid } = require("../validators");

const contactRoutes = () => {
  const router = express.Router();

  router.post(
    "/",
    isAuthorized,
    [
      body("name", "Name field is required").trim().not().isEmpty(),
      body("phoneNumber", "Phone number field is required")
        .trim()
        .not()
        .isEmpty(),
      body("phoneNumber", "Invalid phone number").isNumeric(),
    ],
    contactController.createContact
  );
  router.delete(
    "/:id",
    isAuthorized,
    param("id").custom((id) => isObjectIdValid(id)),
    contactController.deleteContact
  );
  router.put(
    "/:id",
    isAuthorized,
    [
      body("name", "Name field is required").trim().not().isEmpty(),
      body("phoneNumber", "Phone number field is required")
        .trim()
        .not()
        .isEmpty(),
      body("phoneNumber", "Invalid phone number").isNumeric(),
      param("id").custom((id) => isObjectIdValid(id)),
    ],
    contactController.updateContact
  );
  router.get(
    "/:id",
    isAuthorized,
    param("id").custom((id) => isObjectIdValid(id)),
    contactController.getContact
  );
  router.get("/", isAuthorized, contactController.getContacts);

  return router;
};

module.exports = contactRoutes();
