const mongoose = require('mongoose');

exports.counterSchema = mongoose.Schema({
  _id: String,
  seq: String
});