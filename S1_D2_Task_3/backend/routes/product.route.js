const express = require('express');
const { productModel } = require('../models/product.model');
const { reviewModel } = require('../models/review.model');
const productRouter = express.Router();

// Add a Product 
productRouter.post('/', async (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(500).json({ error: 'Product name or price is missing' });
    }
    try {
        const newProduct = new productModel({ name, price });
        await newProduct.save();
        return res.status(200).json({ message: 'New product created', product: newProduct })
    } catch (err) {
        return res.status(500).json({ error: 'Error occured while creating a product' });
    }
});
// Getting all products
productRouter.get('/', async (req, res) => {
    try {
        const products = await productModel.find().populate('reviews');
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ error: 'Error while fetching all products' });
    }
})

// Getting single products

productRouter.get('/:id', async (req, res) => {
    const productId = req.params.id
    try {
        const product = await productModel.findById(productId).populate('reviews');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        return res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Error in finding the product' });
    }
});
// Update a product
productRouter.patch('/:id', async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true }).populate('reviews');
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product updated', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: 'Error while updating the product' });
    }
});

productRouter.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await productModel.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error while deleting the product' });
    }
});

productRouter.post('/:id/reviews', async (req, res) => {
    const productId = req.params.id;
    const { userId, description } = req.body;
    if (!userId || !description) {
        return res.status(500).json({ error: 'User id or description is missing' });
    }
    try {
        const newReview = new reviewModel({ userId, description })
        const savedReview = await newReview.save();
        if (!savedReview) {
            return res.status(500).json({ error: 'Error while saving the review' });
        }
        const product = await productModel.findByIdAndUpdate(
            productId,
            { $push: { reviews: savedReview._id } },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(201).json({ message: 'Review added to the product', review: savedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error while adding a review to the product' });
    }
});

productRouter.delete('/:productId/reviews/:reviewId', async (req, res) => {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const index = product.reviews.indexOf(reviewId);
        if (index > -1) {
            product.reviews.splice(index, 1);
        }
        await reviewModel.findByIdAndRemove(reviewId);
        await product.save();
        res.status(200).json({ message: 'Review deleted from the product' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error while deleting the review from the product' });
    }
});

module.exports = {
    productRouter
}



