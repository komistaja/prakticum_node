const mongoose = require('mongoose');

exports.userSchema = mongoose.Schema({
  username: String,
  password: String
});