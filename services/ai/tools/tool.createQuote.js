const Quote = require('../../../models/quote');
const Product = require('../../../models/product');

module.exports = function ({ empresaId, role }) {
  return {
    name: 'createQuote',
    description: 'Crear un presupuesto y asociarlo a la empresa',
    schema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              quantity: { type: 'number' }
            },
            required: ['productId', 'quantity']
          }
        },
        taxesPct: { type: 'number' },
        feesPct: { type: 'number' }
      },
      required: ['items']
    },
    async execute({ items, taxesPct = 0, feesPct = 0 }) {
      if (!['ventas', 'admin'].includes(role)) {
        throw new Error('No autorizado');
      }
      const productIds = items.map(i => i.productId);
      const products = await Product.find({ _id: { $in: productIds }, empresaId });
      if (products.length !== items.length) {
        throw new Error('Producto inválido');
      }
      let subtotal = 0;
      const quoteItems = items.map(it => {
        const product = products.find(p => p.id == it.productId);
        const line = product.price * it.quantity;
        subtotal += line;
        return { productId: product._id, quantity: it.quantity, price: product.price };
      });
      const taxes = subtotal * (taxesPct / 100);
      const fees = subtotal * (feesPct / 100);
      const total = subtotal + taxes + fees;
      const quote = await Quote.create({ empresaId, items: quoteItems, total });
      return { presupuestoId: quote._id.toString(), total };
    }
  };
};
