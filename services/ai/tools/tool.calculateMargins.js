module.exports = function () {
  return {
    name: 'calculateMargins',
    description: 'Calcular margen de ganancia',
    schema: {
      type: 'object',
      properties: {
        cost: { type: 'number' },
        price: { type: 'number' },
        taxesPct: { type: 'number' },
        feesPct: { type: 'number' }
      },
      required: ['cost', 'price']
    },
    async execute({ cost, price, taxesPct = 0, feesPct = 0 }) {
      const taxes = price * (taxesPct / 100);
      const fees = price * (feesPct / 100);
      const marginAbs = price - cost - taxes - fees;
      const marginPct = (marginAbs / price) * 100;
      return {
        marginAbs,
        marginPct,
        breakdown: { price, cost, taxes, fees }
      };
    }
  };
};
