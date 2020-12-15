// A web app to maintain book records
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");      //parses incoming request bodies to hand it over to the middlewares
const cookieParser = require('cookie-parser');  //to  parse cookie from request body
const expressValidator = require("express-validator");      //to validate user input
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();     //To get values from environment variables of this program (.env file)
// const multer  = require('multer');  //handle multipart encoded data from html forms
// const gridFsStorage = require('multer-gridfs-storage');     //storage engine for multer to upload files directly to mongoDb
// const grid = require('gridfs-stream');      //handles chunking of data
// const methodOverride = require('method-override')       //


//import routes
const categoryRoutes = require("./routes/category");
const bookRoutes = require("./routes/books");


//app
const app = express();

//connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("\n[*] DATABASE CONNECTED\n"))
.catch((err) => console.error("[*] unable to connect to database\n[*] Run mongo_repair bash script in home directory"))

mongoose.connection.on("error", function(error) {
    console.log(error)
});
  
mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database.")
});

//connect to cloud database
// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("Books").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


//middlewares
app.use(morgan('dev'));     //morgan middleware
app.use(bodyParser.json());     //body parser middleware in json format


//defining routes
//category routes
app.use('/api',categoryRoutes)  //creating a new category routes

//book routes
app.use('/api',bookRoutes)   //creating a new book routes

//signin route

//port to listen on
const port = process.env.PORT || 8000;      //port to run server on

//listener
app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
});