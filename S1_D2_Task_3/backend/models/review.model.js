const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  cDate: { type: Date, default: Date.now },
  uDate: { type: Date, default: Date.now },
});

const reviewModel= mongoose.model('review', reviewSchema);
module.exports={
    reviewModel
}

