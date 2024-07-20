const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  original_url: {
    type: String,
  },
  short_url: {
    type: String,
  },
  custom_url: {
    type: String,
  },
  title: {
    type: String,
  },
  qr: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Urls", UrlSchema);
