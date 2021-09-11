const mongoose = require('mongoose');

const YetkiliCezaData = mongoose.Schema({
  UserID: String,
  YPuan: Number,
  Ban: Number,
  Jail: Number, 
  Mute: Number,
  Total: Array,
})

module.exports = mongoose.model("YetkiliCezaData", YetkiliCezaData)