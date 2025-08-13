const OpenAI = require('openai');

module.exports = function () {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'test' });
  return {
    name: 'summarizeRecords',
    description: 'Genera un resumen corto de registros de clientes/ventas/productos',
    schema: {
      type: 'object',
      properties: {
        records: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              text: { type: 'string' }
            },
            required: ['text']
          }
        }
      },
      required: ['records']
    },
    async execute({ records }) {
      const content = records.map(r => `${r.title || ''}: ${r.text}`).join('\n');
      const res = await client.chat.completions.create({
        model: process.env.LLM_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Resumí brevemente en español.' },
          { role: 'user', content }
        ],
        temperature: 0.2
      });
      return { summary: res.choices[0].message.content };
    }
  };
};
