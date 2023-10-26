const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cDate: { type: Date, default: Date.now },
  uDate: { type: Date, default: Date.now },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const productModel=mongoose.model('product',productSchema);
module.exports={
    productModel
}