const Embedding = require('../../../models/embedding');
const embedder = require('./embedder');

function cosine(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
}

async function addDocuments(empresaId, docs) {
  for (const doc of docs) {
    const embedding = await embedder.embed(doc.text);
    await Embedding.findOneAndUpdate(
      { empresaId, docId: doc.id },
      { title: doc.title, text: doc.text, embedding },
      { upsert: true }
    );
  }
}

async function search(empresaId, query, k = 4) {
  const queryEmbedding = await embedder.embed(query);
  const docs = await Embedding.find({ empresaId });
  const scored = docs.map(d => ({
    id: d.docId,
    title: d.title,
    text: d.text,
    score: cosine(queryEmbedding, d.embedding)
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, k);
}

module.exports = { addDocuments, search };
