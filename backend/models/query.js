const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
    question: String,
    answer: String,
    website: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Query", QuerySchema);
