const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true
    }

   

}, {timestamps: true});

module.exports = mongoose.model("Category", categorySchema);