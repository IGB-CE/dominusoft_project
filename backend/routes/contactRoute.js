const express = require("express");
const contactModel = require("../models/contact.js");

const app = express()

// Krijoni (Kaloni info nga front tek back)
// Perdoret metoda post
app.post('/addContact', async(req,res)=>{
    try{
        console.log(req.body)
        //ka marr info nga frontend
        const newContact = new contactModel(req.body)
        //ruajtja e informacionit
        await newContact.save()
        res.status(200).send(newContact)
    }catch(err){
        console.log("Contact not saved ", err)
        res.status(500).send("Contact not saved ", err)
    }
})

module.exports = app