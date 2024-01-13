const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date_created: { type: Date },
  message: { type: String, required: true, maxLength: 60000, minLength: 1 },
  title: { type: String, required: true, maxLength: 10000, minLength: 1 },
  publish_date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Post", PostSchema);
