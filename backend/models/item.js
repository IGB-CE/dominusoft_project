const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    desc: {
        type: String
    },
    photo: {
        type: String
    },
    price: {
        type: String
    },
    
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;