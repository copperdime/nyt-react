const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Articles = mongoose.model("Articles", articlesSchema);

module.exports = Articles;
