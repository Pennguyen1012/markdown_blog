//import mongoose
const { default: mongoose } = require("mongoose");



const articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//create table on database
module.exports = mongoose.model('Article', articlesSchema)
