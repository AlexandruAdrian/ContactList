const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: {
    type: String,
    match: /^[0-9,+]/,
    required: true,
  },
  password: { type: String, required: true, min: 6 },
  joinedAt: { type: Date, default: Date.now },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
