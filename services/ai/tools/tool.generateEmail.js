module.exports = function () {
  return {
    name: 'generateEmail',
    description: 'Redactar un correo electrónico en español',
    schema: {
      type: 'object',
      properties: {
        toName: { type: 'string' },
        tone: { type: 'string', enum: ['formal', 'informal', 'neutral'] },
        topic: { type: 'string' },
        context: { type: 'string' }
      },
      required: ['topic']
    },
    async execute({ toName, tone = 'neutral', topic, context }) {
      const saludo = toName ? `Hola ${toName},` : 'Hola,';
      const cuerpo = context ? `${context}\n\n` : '';
      const despedida = tone === 'formal' ? 'Saludos cordiales,' : 'Saludos,';
      return {
        subject: topic,
        body: `${saludo}\n\n${cuerpo}${despedida}\nNimbus Assistant`
      };
    }
  };
};
