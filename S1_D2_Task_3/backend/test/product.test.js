const {expect} = require('chai');
const request = require('supertest');
const app = require('../index.js'); 

describe('Product Routes',()=>{
  const testProduct = {
    name: 'Test Product',
    price: 99.99,
  };

  let productId;

  it('should create a new product', (done) => {
    request(app)
      .post('/api/products')
      .send(testProduct)
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('New product created');
        expect(res.body.product).to.have.property('_id');
        productId = res.body.product._id;
        done();
      });
  });

  it('should get all products', (done) => {
    request(app)
      .get('/api/products')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.products).to.be.an('array');
        done();
      });
  });

  it('should get a single product by ID', (done) => {
    request(app)
      .get(`/api/products/${productId}`)
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.product).to.have.property('_id', productId);
        done();
      });
  });

  it('should update a product by ID', (done) => {
    request(app)
      .patch(`/api/products/${productId}`)
      .send({ price: 129.99 }) // Update the price
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.message).to.equal('Product updated');
        expect(res.body.product).to.have.property('price', 129.99);
        done();
      });
  });

  it('should delete a product by ID', (done) => {
    request(app)
      .delete(`/api/products/${productId}`)
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.message).to.equal('Product deleted');
        done();
      });
  });
});
describe('Review Routes', () => {
  let productId;
  let reviewId;
  before((done) => {
    request(app)
      .post('/api/products')
      .send({ name: 'Test Product', price: 99.99 })
      .end((err, res) => {
        productId = res.body.product._id;
        done();
      });
  });

  it('should create a new review for a product', (done) => {
    request(app)
      .post(`/api/products/${productId}/reviews`)
      .send({ userId: 'user123', description: 'Great product!' })
      .expect(201)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.message).to.equal('Review added to the product');
        expect(res.body.review).to.have.property('_id');
        reviewId = res.body.review._id;
        done();
      });
  });

  it('should delete a review from a product', (done) => {
    request(app)
      .delete(`/api/products/${productId}/reviews/${reviewId}`)
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.message).to.equal('Review deleted from the product');
        done();
      });
  });

  it('should handle errors when creating a review without required data', (done) => {
    request(app)
      .post(`/api/products/${productId}/reviews`)
      .send({ userId: 'user123' }) // Missing 'description'
      .expect(500)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.error).to.equal('User id or description is missing');
        done();
      });
  });
});
