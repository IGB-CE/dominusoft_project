// let http = require('http');
// // import http from 'http'
// http.createServer(function (req, res) {
// res.writeHead(200, { 'Content-Type': 'text/html' });
// res.end('<h1>Hello World!</h1>');
// }).listen(5000, 'localhost', () => { console.log('Server is created'); })

let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let session = require("express-session");
let contactRoute = require("./routes/contactRoute.js")
let itemRoute = require("./routes/itemRoute.js")
let productRoute = require("./routes/productRoute.js")
const path = require("path");
let app = express();

app.use(
    cors(
        {
            credentials: true,
            origin: "http://localhost:3000",
            exposedHeaders: ["set-cookie"],
        }))
app.use(session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))
app.use(express.json({ limit: "1000mb", extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));

// lidhja me databaze
mongoose.connect("mongodb+srv://iglibraho77:0ofX4bH6hkWBLtI3@cluster0.1qpke.mongodb.net/mernTest?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Error", err));

app.use(contactRoute);
app.use(itemRoute);
app.use(productRoute);

app.use("/send", (req, res) => {
    res.send("Hello!");
})

app.listen(5000, (req, res) => {
    console.log("Server start!");
})