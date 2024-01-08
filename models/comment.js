const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  date_created: { type: Date },
  message: { type: String, required: true, maxLength: 60000 },
});

module.exports = mongoose.model("Comment", CommentSchema);
