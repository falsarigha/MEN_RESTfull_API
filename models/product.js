const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let productSchema = new Schema(
{
    //definition of our product in the DB
    name: String, // String is shorthand for {type: String}
    description: String,
    price: Number,
    inStock: Boolean    
}
);

module.exports = mongoose.model("product", productSchema);