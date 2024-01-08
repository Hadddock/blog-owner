const mongoose = require("moongse");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, minlength: 3, maxLength: 64 },
  password: { type: String, required: true, minLength: 8 },
  admin: { type: Boolean, default: false },
});