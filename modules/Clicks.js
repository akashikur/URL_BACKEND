const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClickSchema = new Schema({
  city: {
    type: String,
  },
  device: {
    type: String,
  },
  country: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  url_id: {
    type: Schema.Types.ObjectId,
    ref: "Urls",
    require: true,
  },
});

module.exports = mongoose.model("Clicks", ClickSchema);
