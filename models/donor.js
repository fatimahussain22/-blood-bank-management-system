const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    bloodGroup: String,
    city: String,
    phone: String
});

module.exports = mongoose.model("Donor", donorSchema);







