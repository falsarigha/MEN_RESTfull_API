//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//swagger deps
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs")

//setup swagger
const swaggerDefinition = yaml.load("./swagger.yaml");
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDefinition)); 

//import routes
const productRoutes = require("./routes/product.js");
const authRoutes = require("./routes/auth");

require("dotenv-flow").config();

//parse requeste of content type JSON
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Handle CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// connecting to the DB
mongoose.connect
(
    process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    
).catch(error => console.log("Error connecting to MongoDB: " + error));

mongoose.connection.once('open', () => {
    console.log('Connected successfully to MongoDB')
})


// routes
app.get("/api/welcome", (req,res) =>{
    res.status(200).send({message: "Welcome to the MEN RESTful API"});
})


// post, put, delete --> CRUD
app.use("/api/products", productRoutes) // to apply verifyToken middleware to all route lets specify here
app.use("/api/user", authRoutes)


const PORT = process.env.PORT || 4000;

//Start server
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
})

module.exports = app;