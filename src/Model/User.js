const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String ,unique:true},
  password: { type: String },
  age:{type:Number} 
});

module.exports = mongoose.model("users", userSchema);
