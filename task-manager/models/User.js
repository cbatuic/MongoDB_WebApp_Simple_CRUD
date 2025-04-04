// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    done: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
