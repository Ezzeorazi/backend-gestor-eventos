const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    empresaId: { type: String, required: true, index: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
