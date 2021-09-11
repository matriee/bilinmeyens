const mongoose = require('mongoose');

const CezaData = mongoose.Schema({
  UserID: String,
  Puan: Number,
  Ban: Number,
  Jail: Number, 
  Mute: Number,
  Sicil: Array,
})

module.exports = mongoose.model("CezaData", CezaData)