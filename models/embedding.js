const mongoose = require('mongoose');

const embeddingSchema = new mongoose.Schema(
  {
    empresaId: { type: String, required: true, index: true },
    docId: { type: String, required: true },
    title: { type: String },
    text: { type: String, required: true },
    embedding: { type: [Number], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Embedding', embeddingSchema);
