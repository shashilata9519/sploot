const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    user_id:{type: mongoose.Types.ObjectId, required: true,ref:"users"},
    title : { type: String },
    description: { type: String},
});

module.exports = mongoose.model("articles", articleSchema);
