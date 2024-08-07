const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["sent", "draft"], default: "draft" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", EmailSchema);
