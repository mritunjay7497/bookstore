//middle ware to do CRUD operation on a category
const Category = require("../models/category");
const {errorHandler} = require("../helpers/dbErrorHandler");


exports.create = (req,res) => {
    const category = new Category(req.body);
    category.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.send({ data });
    });
};