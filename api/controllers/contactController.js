const Contact = require("../models/contactModel");
const { validationResult } = require("express-validator");

const createContact = async (req, res, next) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const err = new Error(result.errors[0].msg);
      err.status = 422;
      next(err);
      return;
    }

    const { name, phoneNumber } = req.body;
    const userId = req.user._id;
    const foundContact = await Contact.findOne({
      userId,
      phoneNumber,
    });

    if (foundContact) {
      return res.status(409).json({
        message: "A contact with this phone number already exists",
      });
    }

    const newContact = new Contact({ name, userId, phoneNumber });
    await newContact.save();

    return res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      let err;
      if (result.errors[0].msg.includes("Invalid")) {
        err = new Error("Resource not found");
        err.status = 404;
      } else {
        err = new Error(result.errors[0].msg);
        err.status = 422;
      }

      next(err);
      return;
    }

    const { id } = req.params;
    const foundContact = await Contact.findOne({ _id: id });

    if (foundContact) {
      await Contact.deleteOne({ _id: id });
      return res.sendStatus(204);
    }

    return res.send(404).json({
      error: "Resource not found",
    });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      let err;
      if (result.errors[0].msg === "Invalid value") {
        err = new Error("Resource not found");
        err.status = 404;
      } else {
        err = new Error(result.errors[0].msg);
        err.status = 422;
      }

      next(err);
      return;
    }

    const { id } = req.params;
    const userId = req.user._id;
    const { name, phoneNumber } = req.body;

    const foundContact = await Contact.findOne({
      _id: id,
      userId,
    });

    if (foundContact) {
      await Contact.updateOne(
        {
          _id: id,
        },
        {
          name,
          phoneNumber,
        }
      );

      return res.sendStatus(200);
    }

    return res.status(404).json({
      error: "Resource not found",
    });
  } catch (err) {
    next(err);
  }
};

const getContact = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const err = new Error("Resource not found");
      err.status = 404;
      next(err);
      return;
    }

    const { id } = req.params;
    const userId = req.user._id;
    const foundContact = await Contact.findOne({ _id: id, userId });

    if (foundContact) {
      return res.status(200).json({
        id: foundContact.id,
        name: foundContact.name,
        phoneNumber: foundContact.phoneNumber,
      });
    }

    return res.status(404).json({
      error: "Resource not found",
    });
  } catch (err) {
    next(err);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contacts = await Contact.find({ userId });

    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createContact,
  deleteContact,
  updateContact,
  getContact,
  getContacts,
};
