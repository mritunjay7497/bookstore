//routes for /api/category
const express = require("express");
const router = express.Router();

//import create to make new category
const { create } = require("../controllers/category");

//new category route
router.post("/category/create/",create);


module.exports = router;