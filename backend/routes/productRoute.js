const express = require("express");
const productModel = require("../models/product.js")
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const app = express();

// Konfigurime per multer 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
let upload = multer({ storage, fileFilter })

// Express route for multiple file uploads
app.post("/addProduct", upload.array("images", 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send("No photos uploaded.");
        }

        // Extract filenames
        const photoFilenames = req.files.map(file => file.filename);

        // Create new item with multiple photos
        const newItem = new productModel({
            ...req.body,
            photos: photoFilenames, // Save filenames in an array
        });

        console.log(newItem);
        await newItem.save();
        res.status(200).json(newItem);
    } catch (err) {
        console.error("Not added Item", err);
        res.status(500).send("Not added Item");
    }
});

// Read => Leximi/afishmi i informacioneve nga DB
//te gjitha info, info per nje elemente
app.get("/getProducts", async (req, res) => {
    try {
        const products = await productModel.find({})
        console.log(products)
        res.status(200).send(products)
    } catch (error) {
        console.log("Not read products", err)
        res.status(500).send("Not read products");
    }
})

//Lexim vetem nje
app.get("/getProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const product = await productModel.findById({ _id: productId })
        console.log(product)
        res.status(200).send(product)
    } catch (error) {
        console.log("Not read products", err)
        res.status(500).send("Not read products");
    }
})

// Update => ndryshimi i informacioneve

// Delete => fshirja
app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const itemId = req.params.id
        const item = await productModel.deleteOne({ _id: itemId })
        console.log("Product deleted")
        res.status(200).send("Product deleted")
    } catch (error) {
        console.log("Not deleted product", err)
        res.status(500).send("Not deleted product");
    }
})

module.exports = app