import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

// ── Rate limit config ────────────────────────────────────────────
const DAILY_LIMIT   = 50;   // mensajes de usuario por 24h (solo role:'user')
const MAX_MSG_LEN   = 2000; // caracteres por mensaje
const MAX_HISTORY   = 20;   // mensajes de historial enviados a Claude

// ── Supabase admin client (server-side only) ─────────────────────
// Uses SERVICE_ROLE key — bypasses RLS, never exposed to the browser.
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ── MBTI type data for system prompt ────────────────────────────
const TYPE_DATA = {
  ENFJ: { stack: "Fe → Ni → Se → Ti", apego: "Ansioso-Seguro",    lenguajes: ["Palabras de Afirmación","Tiempo de Calidad","Actos de Servicio"] },
  INFJ: { stack: "Ni → Fe → Ti → Se", apego: "Ansioso-Seguro",    lenguajes: ["Tiempo de Calidad","Palabras de Afirmación","Actos de Servicio"] },
  INFP: { stack: "Fi → Ne → Si → Te", apego: "Temeroso-Evitativo", lenguajes: ["Palabras de Afirmación","Tiempo de Calidad","Actos de Servicio"] },
  ENFP: { stack: "Ne → Fi → Te → Si", apego: "Ansioso-Seguro",    lenguajes: ["Palabras de Afirmación","Tiempo de Calidad","Actos de Servicio"] },
  INTJ: { stack: "Ni → Te → Fi → Se", apego: "Evitativo-Seguro",  lenguajes: ["Actos de Servicio","Tiempo de Calidad","Palabras de Afirmación"] },
  INTP: { stack: "Ti → Ne → Si → Fe", apego: "Evitativo",          lenguajes: ["Tiempo de Calidad","Palabras de Afirmación","Actos de Servicio"] },
  ENTJ: { stack: "Te → Ni → Se → Fi", apego: "Seguro-Evitativo",  lenguajes: ["Actos de Servicio","Palabras de Afirmación","Tiempo de Calidad"] },
  ENTP: { stack: "Ne → Ti → Fe → Si", apego: "Evitativo",          lenguajes: ["Palabras de Afirmación","Tiempo de Calidad","Actos de Servicio"] },
  ISTJ: { stack: "Si → Te → Fi → Ne", apego: "Seguro",             lenguajes: ["Actos de Servicio","Palabras de Afirmación","Tiempo de Calidad"] },
  ISFJ: { stack: "Si → Fe → Ti → Ne", apego: "Ansioso",            lenguajes: ["Actos de Servicio","Palabras de Afirmación","Tiempo de Calidad"] },
  ESTJ: { stack: "Te → Si → Ne → Fi", apego: "Seguro",             lenguajes: ["Actos de Servicio","Palabras de Afirmación","Tiempo de Calidad"] },
  ESFJ: { stack: "Fe → Si → Ne → Ti", apego: "Ansioso",            lenguajes: ["Palabras de Afirmación","Actos de Servicio","Tiempo de Calidad"] },
  ISTP: { stack: "Ti → Se → Ni → Fe", apego: "Evitativo",          lenguajes: ["Actos de Servicio","Tiempo de Calidad","Contacto Físico"] },
  ISFP: { stack: "Fi → Se → Ni → Te", apego: "Temeroso-Evitativo", lenguajes: ["Contacto Físico","Actos de Servicio","Tiempo de Calidad"] },
  ESTP: { stack: "Se → Ti → Fe → Ni", apego: "Evitativo-Seguro",  lenguajes: ["Contacto Físico","Palabras de Afirmación","Tiempo de Calidad"] },
  ESFP: { stack: "Se → Fi → Te → Ni", apego: "Ansioso-Seguro",    lenguajes: ["Palabras de Afirmación","Contacto Físico","Tiempo de Calidad"] },
};

function buildSystemPrompt(mbtiType) {
  const data = TYPE_DATA[mbtiType] || {};
  return `Eres un advisor especializado en psicología MBTI. Tu rol: consejero directo, estratégico y sin filtros sobre habilidades sociales, atracción, relaciones y desarrollo personal.

PERFIL DEL USUARIO:
- Tipo MBTI: ${mbtiType}
- Stack cognitivo: ${data.stack || 'N/A'}
- Estilo de apego: ${data.apego || 'N/A'}
- Lenguajes del amor (top 3): ${(data.lenguajes || []).join(', ')}

PRINCIPIOS DE RESPUESTA:
1. Todo consejo debe estar anclado en el tipo ${mbtiType} — nunca des consejos genéricos.
2. Habla directamente. Sin rodeos, sin frases motivacionales vacías.
3. Si el usuario describe una situación social o de atracción, analiza cómo su tipo opera en esa dinámica y da el consejo concreto.
4. Usa el stack cognitivo (${data.stack}) cuando sea relevante para explicar el patrón.
5. FORMATO OBLIGATORIO: Máximo 150 palabras por respuesta. Sin headers (##). Sin separadores (---). Sin listas largas. Prosa directa en 2-3 párrafos cortos. SIEMPRE termina la última oración completamente.
6. Cuando sea relevante, usa el estilo de apego (${data.apego}) para contextualizar patrones relacionales.
7. El usuario tiene interés en relaciones, dating, habilidades sociales y desarrollo personal. Nivel avanzado — no expliques lo básico.
8. CIERRE OBLIGATORIO: Termina SIEMPRE con una pregunta de seguimiento personalizada o una sugerencia de próximo paso concreta. La pregunta debe fluir naturalmente del tema — nunca forzada.

DOMINIO DE EXPERTISE:
- Habilidades sociales específicas para ${mbtiType}
- Atracción: qué funciona y qué destruye el atractivo para este tipo
- Relaciones: patrones de apego, compatibilidad, dinámica de pareja
- Trabajo, liderazgo e interacción social desde la psicología del tipo
- Desarrollo personal anclado en las funciones cognitivas del tipo`;
}

// ── Main handler ─────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── CAPA 1: Autenticación JWT ────────────────────────────────
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado. Inicia sesión para usar el Advisor.' });
  }

  const token = authHeader.slice(7);
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: 'Sesión expirada. Recarga la página.' });
  }

  // ── CAPA 2: Rate limiting ─────────────────────────────────────
  // Cuenta solo mensajes del usuario (role:'user') en las últimas 24h
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count, error: countError } = await supabaseAdmin
    .from('advisor_messages')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('role', 'user')
    .gte('created_at', since);

  if (!countError && typeof count === 'number' && count >= DAILY_LIMIT) {
    const resetAt = new Date(Date.now() + (24 * 60 * 60 * 1000 - (Date.now() - new Date(since).getTime()))).toISOString();
    return res.status(429).json({
      error: `Límite diario alcanzado (${DAILY_LIMIT} mensajes). El contador se restablece cada 24 horas.`,
      limit: DAILY_LIMIT,
      used: count,
    });
  }

  // ── Validar payload ───────────────────────────────────────────
  const { mbtiType, messages } = req.body;

  if (!mbtiType || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }

  if (!TYPE_DATA[mbtiType]) {
    return res.status(400).json({ error: 'Tipo MBTI inválido' });
  }

  // Sanitize: trim messages array, truncate oversized content
  const recentMessages = messages
    .slice(-MAX_HISTORY)
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: typeof m.content === 'string'
        ? m.content.slice(0, MAX_MSG_LEN)
        : '',
    }))
    .filter(m => m.content.length > 0);

  if (recentMessages.length === 0) {
    return res.status(400).json({ error: 'No hay mensajes válidos' });
  }

  // ── Llamada a Claude ──────────────────────────────────────────
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 700,
      system: buildSystemPrompt(mbtiType),
      messages: recentMessages,
    });

    const reply = response.content[0]?.text || '';
    return res.json({ reply });
  } catch (err) {
    console.error('Claude API error:', err.message);
    return res.status(500).json({ error: 'Error al conectar con la IA. Intenta de nuevo.' });
  }
}
