const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.ObjectId, required: true },
  phoneNumber: {
    type: String,
    match: /^[0-9,+]/,
    required: true,
  },
});

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;
