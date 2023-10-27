const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); // Import your Express app
const expect = chai.expect;
chai.use(chaiHttp);
describe('Product POST API', () => {
    it('should create a new product when POST /api/products', (done) => {
        chai.request(app)
        .post('/api/products')
        .send({ name: 'Test Product', price: 9.99 })
        .end((err, res) => {
          expect(res).to.have.status(200); // Check for a successful creation status
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'New product created');
          expect(res.body).to.have.property('product');
          expect(res.body.product).to.have.property('name', 'Test Product');
          expect(res.body.product).to.have.property('price', 9.99);
        });
        done();
    });
    it('should list products when GET /api/products', (done) => {
        chai.request(app)
        .get('/api/products')
        .end((err, res) => {
          expect(res).to.have.status(200); // Check for a successful creation status
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('products');
          expect(res.body.products).to.be.an('array')
        });
        done();
    });

  });