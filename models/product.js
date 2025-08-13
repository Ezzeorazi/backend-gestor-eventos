const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    empresaId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
