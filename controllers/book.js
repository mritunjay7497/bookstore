const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Book = require("../models/book");
const {errorHandler} = require("../helpers/dbErrorHandler");
const router = require('../routes/category');

exports.bookByName = (req,res,next,name) => {
    Book.find({name:name}).exec((err,book) => {
        if(err || book.length == 0 ){
            return res.status(400).json({
                error: "No such books found"
            });
        };
        req.book = book;
        next();
    });
    
};

//fetch book from book id
exports.read = (req,res) => {
    // req.book.image = '';
    return res.json({
        book: req.book
    });
};

//middleware to create new book
exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };

        //check for all required fields
        const {name,description,price,category,quantity,author,publication,link} = fields;
        const {image} = files
        if(!name || !description || !price || !category || !quantity || !author || !image ||!publication ||!link){
            return res.status(400).json({
                error: "All fields are mandatory",
            });
        };

        

        let book = new Book(fields)

        if(files.image) {
            // console.log("FILES PHOTO: ", files.image)
            //max upload size  = 1 MB
            if(files.image.size > 1000000){
                return res.status(400).json({
                    error: "Image size too big. Max allowed size is 1 MB"
                });
            };
            book.image.data  = fs.readFileSync(files.image.path)
            book.image.contentType = files.image.type
        }


        book.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            };
            res.json({ result })
        })

    })
};


exports.remove = (req,res) => {
    let book = req.book;
    book.remove((err,deletedbook) => {
        if(err){
            return res.status(400).json({
                error: "book can't be deleted"
            });
        };
        res.json({
            "message": "following book was removed",
            deletedbook
        });
    });
};

//Update book
//Update the metadat of the book
//The actual, for now, is fetched from drive. 'Coz we aren't rich enough to pay off the hefty amount to the cloud storage("SMILES IN PAIN")
exports.update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };

        //check for all required fields
        const {name,description,price,category,quantity,shipping} = fields;
        const {image} = files
        if(!name || !description || !price || !category || !quantity || !shipping || !image ||!link){
            return res.status(400).json({
                error: "All fields are mandatory",
            });
        };

        

        let book = req.book;
        book = _.extend(book,fields);

        if(files.image) {
            // console.log("FILES PHOTO: ", files.image)
            //max upload size  = 1 MB
            if(files.image.size > 1000000){
                return res.status(400).json({
                    error: "Image size too big. Max allowed size is 1 MB"
                });
            };
            book.image.data  = fs.readFileSync(files.image.path)
            book.image.contentType = files.image.type
        }


        book.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            };
            res.json({ result })
        })

    })
};
