const { z } = require('zod');
const logger = require('../services/logger');
const { chatWithTools } = require('../services/ai/llmClient');
const generateEmail = require('../services/ai/tools/tool.generateEmail');
const calculateMargins = require('../services/ai/tools/tool.calculateMargins');
const createQuoteTool = require('../services/ai/tools/tool.createQuote');
const searchNearby = require('../services/ai/tools/tool.searchNearby');
const summarizeRecords = require('../services/ai/tools/tool.summarizeRecords');
const ragClient = require('../services/ai/rag/ragClient');

const SYSTEM_PROMPT =
  'Sos Nimbus Assistant. Respondé breve y accionable. Usá herramientas cuando corresponda. Nunca expongas secretos. Siempre respetá empresaId.';

async function chat(req, res) {
  const schema = z.object({
    messages: z.array(z.object({ role: z.string(), content: z.string() })),
    toolsAllowed: z.array(z.string()).optional()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Datos inválidos' });
  const { messages, toolsAllowed } = parsed.data;
  const empresaId = req.usuario?.empresaId;
  const role = req.usuario?.role;

  const tenantSummary = `Empresa ${empresaId}`;
  const last = messages[messages.length - 1]?.content || '';
  let ragDocs = [];
  try {
    ragDocs = await ragClient.search(empresaId, last, 4);
  } catch (e) {
    logger.warn(e, 'Error en RAG');
  }
  if (tenantSummary) {
    messages.unshift({ role: 'system', content: `Tenant: ${tenantSummary}` });
  }
  if (ragDocs.length) {
    messages.push({
      role: 'system',
      content: `Docs relevantes:\n${ragDocs.map(d => d.text).join('\n')}`
    });
  }

  const allowed = new Set(toolsAllowed || []);
  const tools = [];
  const addTool = (name, tool) => {
    if (!toolsAllowed || allowed.has(name)) tools.push(tool);
  };
  addTool('generateEmail', generateEmail());
  addTool('calculateMargins', calculateMargins());
  if (!toolsAllowed || allowed.has('createQuote')) {
    tools.push(createQuoteTool({ empresaId, role }));
  }
  addTool('searchNearby', searchNearby());
  addTool('summarizeRecords', summarizeRecords());

  try {
    const resp = await chatWithTools({ messages, tools, systemPrompt: SYSTEM_PROMPT });
    res.json(resp);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Error en chat' });
  }
}

async function embed(req, res) {
  const schema = z.object({
    docs: z.array(z.object({ id: z.string(), title: z.string().optional(), text: z.string() }))
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Datos inválidos' });
  if (req.usuario?.role !== 'admin') return res.status(403).json({ error: 'No autorizado' });
  const empresaId = req.usuario?.empresaId;
  try {
    await ragClient.addDocuments(empresaId, parsed.data.docs);
    res.json({ ok: true });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Error al generar embeddings' });
  }
}

module.exports = { chat, embed };
