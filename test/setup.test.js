process.env.NODE_ENV = 'test';

const Product = require('../models/product');
const User = require('../models/user');

//ensure to work in a clean database before and after a test 

before((done) =>{
    Product.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    done();
});

after((done) =>{
    Product.deleteMany({}, function(err) {}); 
    User.deleteMany({}, function(err) {});
    done();
});