const express = require("express");
const router = express.Router();

//import create to make new category
//middleware for book id
const { create,read,update,remove,bookByName } = require("../controllers/book");

//product schema from models/product
const book = require("../models/book");

//new category route
//CRUD Operations
router.get("/book/:bookName",read);	// Get the book in pdf format
router.post("/book/create",create);	// send the book metadata to the server
router.post("/book/upload",update);	// update the metadata of the book
router.post("/book/delete",remove); //remove the book from the server

/*
Deleting the book only deletes it's index from the database. The actual pdf file is still there on the cloud server.
This is done to ensure that one only needs to re-create the index of the PDF while uploading the book 
*/ 


//route param for book ID
router.param("bookName",bookByName)

module.exports = router;