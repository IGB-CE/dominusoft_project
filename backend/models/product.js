const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    images: {
        type: Array
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    sizes: {
        type: Array
    },
    date: {
        type: Date
    },
    bestseller: {
        type: Boolean
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;