const router = require("express").Router();
const product = require("../models/product");
const { verifyToken } = require("../validation");

//CRUD operations
// /api/products/

//Create product--post
router.post("/", verifyToken, (req, res) =>{

    data = req.body;

    product.insertMany(data) // insert one or many item
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Read all products--get
router.get("/", (req, res) =>{
    product.find() //allow to get all product
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Read all products = in stock--get
//change the order if you encoutered en error because the route are much alike
router.get("/instock", (req, res) =>{
    product.find({ inStock: true}) //allow to get product inStock true
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Read specific product--get
router.get("/:id", (req, res) =>{
    product.findById(req.params.id) //allow to get product by id
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send({message: err.message}); })
});

//Update specific product--put
router.put("/:id", verifyToken, (req, res) =>{

    const id = req.params.id

    product.findByIdAndUpdate(id, req.body) //allow to update product by id
    .then(data => {
        if(!data){
            res.status(404).send({message: "Cannot Update product with id= " +id +
            " Maybe product was not found!"})
        }else{
            res.send({message: "Product was succesfully updated."})
        }
    })
    .catch(err => {res.status(500).send({message: "Error updating product with id= "+ id}); })
});

//Delete specific product--delete
router.delete("/:id", verifyToken, (req, res) =>{

    const id = req.params.id

    product.findByIdAndDelete(id) //allow to remove product by id
    .then(data => {
        if(!data){
            res.status(404).send({message: "Cannot delete product with id= " +id +
            " Maybe product was not found!"})
        }else{
            res.send({message: "Product was succesfully deleted."})
        }
    })
    .catch(err => {res.status(500).send({message: "Error deleting product with id= "+ id}); })
});

module.exports = router;