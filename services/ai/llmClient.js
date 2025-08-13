const OpenAI = require('openai');
const logger = require('../logger');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'test' });

async function chatWithTools({ messages, tools = [], systemPrompt, temperature = 0.7 }) {
  const allMessages = [{ role: 'system', content: systemPrompt }, ...messages];
  const toolDefs = tools.map(t => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description,
      parameters: t.schema
    }
  }));

  const executed = [];
  for (let i = 0; i < 5; i++) {
    const response = await client.chat.completions.create({
      model: process.env.LLM_MODEL || 'gpt-4o-mini',
      messages: allMessages,
      tools: toolDefs.length ? toolDefs : undefined,
      temperature
    });

    const msg = response.choices[0].message;
    if (msg.tool_calls && msg.tool_calls.length) {
      for (const call of msg.tool_calls) {
        const tool = tools.find(t => t.name === call.function.name);
        if (!tool) continue;
        try {
          const args = JSON.parse(call.function.arguments || '{}');
          const result = await tool.execute(args);
          executed.push({ name: tool.name, args, result });
          allMessages.push(msg);
          allMessages.push({ role: 'tool', name: tool.name, content: JSON.stringify(result) });
        } catch (err) {
          logger.error(err, `Error executing tool ${tool.name}`);
          allMessages.push({ role: 'tool', name: tool.name, content: 'Error ejecutando la herramienta' });
        }
      }
    } else {
      allMessages.push(msg);
      return { messages: allMessages, toolCalls: executed, result: msg.content };
    }
  }
  return { messages: allMessages, toolCalls: executed };
}

module.exports = { chatWithTools };
