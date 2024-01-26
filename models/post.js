const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date_created: { type: Date },
  edit_date: { type: Date },
  message: { type: String, required: true, maxLength: 60000, minLength: 1 },
  title: { type: String, required: true, maxLength: 10000, minLength: 1 },
  published: { type: Boolean, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
