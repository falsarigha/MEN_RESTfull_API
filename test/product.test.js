const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHTTP = require('chai-http');
const server = require('../server');

chai.use(chaiHTTP);

describe('/First Test Collection', () => {

    it('test default API welcome route...', (done) =>{

        chai.request(server)
        .get('/api/welcome')
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            const actualVal = res.body.message;
            expect(actualVal).to.be.equal('Welcome to the MEN RESTful API')
            done();
        }); 
    });


    it('should verify that we have 0 product in the DB', (done) =>{
        chai.request(server)
        .get('/api/products')
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.a('array');
            res.body.length.should.be.eql(0);
            done();
        })
        
    }); 
    

    it('should POST a valid product', (done) =>{
        
        let product = {
            name: "test product",
            description: "test product description",
            price : 100,
            inStock: true
        }
        
        
        chai.request(server)
        .post('/api/products')
        .send(product)
        .end((err,res) =>{
            res.should.have.status(201);
            
            done();
        })
        
    }); 


    it('should verify that we have 1 product in the DB', (done) =>{
        chai.request(server)
        .get('/api/products')
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.a('array');
            res.body.length.should.be.eql(1);
            done();
        })
        
    }); 



    it('should test two values....', () => {

        //actual test content in here

        let expectedVal = 5;
        let actualVal = 5;
        
        expect(actualVal).to.be.equal(expectedVal);
    })


})