// ─────────────────────────────────────────────────────────────
// Email templates — 16 Personalidades AI
// ─────────────────────────────────────────────────────────────

const TYPE_NAMES = {
  INTJ:"El Arquitecto", INTP:"El Pensador", ENTJ:"El Comandante", ENTP:"El Innovador",
  INFJ:"El Consejero", INFP:"El Mediador", ENFJ:"El Protagonista", ENFP:"El Activista",
  ISTJ:"El Inspector", ISFJ:"El Protector", ESTJ:"El Director", ESFJ:"El Cónsul",
  ISTP:"El Artesano", ISFP:"El Aventurero", ESTP:"El Emprendedor", ESFP:"El Animador",
};

const TYPE_COLORS = {
  INTJ:"#6C63FF", INTP:"#7C3AED", ENTJ:"#DC2626", ENTP:"#EA580C",
  INFJ:"#7C3AED", INFP:"#2563EB", ENFJ:"#059669", ENFP:"#D97706",
  ISTJ:"#374151", ISFJ:"#065F46", ESTJ:"#1D4ED8", ESFJ:"#BE185D",
  ISTP:"#92400E", ISFP:"#0E7490", ESTP:"#B45309", ESFP:"#C2410C",
};

const TYPE_INSIGHTS = {
  INTJ: "Tu mente construye sistemas donde otros ven caos. Esa capacidad de ver el patrón completo es tu mayor activo — y tu mayor aislante.",
  INTP: "Eres el arquitecto de ideas que nadie más puede construir. Tu trampa: perfeccionar en silencio lo que debería salir al mundo.",
  ENTJ: "Lideras por naturaleza, pero el liderazgo sin conexión emocional crea seguidores, no aliados. Esa es tu frontera de crecimiento.",
  ENTP: "Generas ideas a una velocidad que pocos siguen. El desafío no es la visión — es comprometerte con una sola lo suficiente.",
  INFJ: "Ves a las personas más profundamente de lo que ellas se ven a sí mismas. Eso es un regalo que pocos saben cómo recibir.",
  INFP: "Tu mundo interior es más rico que el exterior. El reto es traer esa riqueza afuera sin perder lo que la hace especial.",
  ENFJ: "Elevas a todos a tu alrededor — pero ¿quién te eleva a ti? Tu patrón de dar más de lo que recibes tiene un costo invisible.",
  ENFP: "Tu energía es contagiosa y tu visión inspiradora. Pero la consistencia es la única diferencia entre potencial y logro.",
  ISTJ: "Eres el pilar silencioso en el que todos se apoyan sin saberlo. Tu lealtad y precisión son raras en este mundo.",
  ISFJ: "Das sin esperar nada a cambio — hasta que ya no puedes más. Aprender a recibir es tu próximo nivel.",
  ESTJ: "Ejecutas con una eficiencia que pocos igualan. Tu punto ciego: lo que no se puede medir también importa.",
  ESFJ: "Creas armonía donde hay caos social. Pero cuando buscas aprobación constante, le das a otros el control de tu estado interno.",
  ISTP: "Resuelves en silencio lo que otros no pueden ni nombrar. Tu independencia es tu fortaleza — y tu barrera para conectar profundo.",
  ISFP: "Vives con una autenticidad que muy pocos se permiten. El mundo necesita más personas que hagan las cosas con esa presencia.",
  ESTP: "Actúas cuando otros analizan. Esa velocidad de respuesta al mundo real es tu ventaja competitiva natural.",
  ESFP: "Traes vida a cualquier espacio. Tu desafío es cultivar la profundidad que hace que esa energía dure más allá del momento.",
};

const baseStyle = `
  font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
  background: #0a0a0a;
  color: #e0e0e0;
  margin: 0; padding: 0;
`;

function wrapper(content) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>16 Personalidades AI</title>
</head>
<body style="${baseStyle}">
  <div style="max-width:560px; margin:0 auto; padding:32px 16px;">
    <!-- Logo -->
    <div style="text-align:center; margin-bottom:32px;">
      <span style="font-size:1rem; font-weight:800; letter-spacing:0.08em; color:#6C63FF;">16 PERSONALIDADES AI</span>
    </div>
    ${content}
    <!-- Footer -->
    <div style="margin-top:40px; padding-top:24px; border-top:1px solid #1a1a1a; text-align:center;">
      <p style="color:#333; font-size:0.72rem; margin:0;">
        © 2025 16 Personalidades AI ·
        <a href="https://16personalidades.app" style="color:#444; text-decoration:none;">16personalidades.app</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ── Email 1: Bienvenida (post-registro, free) ──────────────────
export function welcomeEmail({ email, mbtiType }) {
  const name   = TYPE_NAMES[mbtiType]  || mbtiType;
  const color  = TYPE_COLORS[mbtiType] || "#6C63FF";
  const insight = TYPE_INSIGHTS[mbtiType] || "";
  const appUrl = process.env.VITE_APP_URL || "https://16personalidades.app";

  const html = wrapper(`
    <!-- Hero -->
    <div style="background:#111; border:1px solid ${color}44; border-radius:20px; padding:32px 24px; text-align:center; margin-bottom:24px; position:relative; overflow:hidden;">
      <div style="position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,${color},transparent);"></div>
      <div style="font-size:0.65rem; color:#444; letter-spacing:0.2em; margin-bottom:12px; text-transform:uppercase;">Tu tipo de personalidad</div>
      <div style="display:inline-block; background:${color}15; border:2px solid ${color}55; border-radius:14px; padding:6px 24px; margin-bottom:12px;">
        <span style="font-size:2.8rem; font-weight:900; color:${color}; letter-spacing:0.12em;">${mbtiType}</span>
      </div>
      <div style="font-size:1.1rem; font-weight:700; color:#f0f0f0; margin-bottom:8px;">${name}</div>
    </div>

    <!-- Insight -->
    <div style="background:#0f0f0f; border:1px solid #1e1e1e; border-radius:16px; padding:24px; margin-bottom:24px;">
      <div style="font-size:0.65rem; color:#555; letter-spacing:0.15em; margin-bottom:12px;">TU PATRÓN CLAVE</div>
      <p style="color:#ccc; line-height:1.75; margin:0; font-size:0.92rem; font-style:italic;">"${insight}"</p>
    </div>

    <!-- Locked preview -->
    <div style="background:#111; border:1px solid #1a1a1a; border-radius:16px; padding:24px; margin-bottom:28px;">
      <div style="font-size:0.65rem; color:#555; letter-spacing:0.15em; margin-bottom:16px;">LO QUE TE ESPERA DESBLOQUEADO</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${[["🧬","Funciones cognitivas"],["💞","Compatibilidad"],["⚡","Fortalezas"],["🔥","Atracción"],["💼","Carrera"],["🤖","Advisor IA"]].map(([ic,tx]) =>
          `<div style="display:flex;align-items:center;gap:8px;font-size:0.78rem;color:#666;padding:6px 0;">
            <span>${ic}</span><span>${tx}</span>
          </div>`
        ).join("")}
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;">
      <a href="${appUrl}" style="display:inline-block; background:linear-gradient(135deg,${color},#6C63FF); color:#fff; text-decoration:none; border-radius:12px; padding:14px 36px; font-weight:700; font-size:0.95rem; letter-spacing:0.02em;">
        Ver mi análisis completo →
      </a>
      <p style="color:#333; font-size:0.72rem; margin-top:12px;">$19/mes · Cancela cuando quieras</p>
    </div>
  `);

  return {
    to: email,
    subject: `Tu perfil ${mbtiType} — ${name}`,
    html,
  };
}

// ── Email 2: Bienvenida premium (post-pago) ────────────────────
export function premiumWelcomeEmail({ email, mbtiType }) {
  const name  = TYPE_NAMES[mbtiType]  || mbtiType;
  const color = TYPE_COLORS[mbtiType] || "#6C63FF";
  const appUrl = process.env.VITE_APP_URL || "https://16personalidades.app";

  const html = wrapper(`
    <!-- Badge membership -->
    <div style="text-align:center; margin-bottom:28px;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:#6C63FF18; border:1px solid #6C63FF44; border-radius:20px; padding:6px 16px;">
        <span style="color:#A78BFA; font-size:0.75rem; font-weight:700; letter-spacing:0.08em;">✦ MEMBERSHIP ACTIVA</span>
      </div>
    </div>

    <!-- Hero -->
    <div style="background:#111; border:1px solid ${color}44; border-radius:20px; padding:32px 24px; text-align:center; margin-bottom:24px; position:relative; overflow:hidden;">
      <div style="position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,${color},transparent);"></div>
      <div style="font-size:0.65rem; color:#444; letter-spacing:0.2em; margin-bottom:12px; text-transform:uppercase;">Acceso completo desbloqueado</div>
      <div style="display:inline-block; background:${color}15; border:2px solid ${color}55; border-radius:14px; padding:6px 24px; margin-bottom:12px;">
        <span style="font-size:2.8rem; font-weight:900; color:${color}; letter-spacing:0.12em;">${mbtiType}</span>
      </div>
      <div style="font-size:1.1rem; font-weight:700; color:#f0f0f0;">${name}</div>
    </div>

    <!-- Lo que tienen -->
    <div style="background:#0f0f0f; border:1px solid #1e1e1e; border-radius:16px; padding:24px; margin-bottom:24px;">
      <div style="font-size:0.65rem; color:#555; letter-spacing:0.15em; margin-bottom:16px;">TIENES ACCESO A TODO ESTO</div>
      ${[
        ["🧬","Psicología profunda","Funciones cognitivas y stack completo"],
        ["💞","Vínculos","Apego, lenguajes del amor y patrones relacionales"],
        ["⚡","Fortalezas","Tus activos personales y puntos de sabotaje"],
        ["🔥","Atracción","Qué te hace magnético/a y cómo conectas"],
        ["💼","Profesional","Carrera, liderazgo y entorno ideal"],
        ["🤖","Advisor IA","Pregunta lo que quieras sobre tu tipo"],
      ].map(([ic,title,desc]) =>
        `<div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid #111;">
          <span style="font-size:1.1rem;">${ic}</span>
          <div>
            <div style="color:#e0e0e0;font-weight:600;font-size:0.85rem;">${title}</div>
            <div style="color:#555;font-size:0.75rem;margin-top:2px;">${desc}</div>
          </div>
        </div>`
      ).join("")}
    </div>

    <!-- Tip Advisor -->
    <div style="background:#111; border:1px solid #6C63FF33; border-radius:16px; padding:20px 24px; margin-bottom:28px;">
      <div style="font-size:0.65rem; color:#6C63FF; letter-spacing:0.15em; margin-bottom:8px;">TIP: ADVISOR IA</div>
      <p style="color:#bbb; font-size:0.85rem; line-height:1.7; margin:0;">
        El Advisor conoce tu tipo a fondo. Prueba preguntarle: <em style="color:#888;">"¿Cuál es mi mayor punto ciego en relaciones?"</em> o <em style="color:#888;">"¿Cómo proceso el conflicto comparado con un ${mbtiType[0]==='I'?'E':'I'}${mbtiType.slice(1)}?"</em>
      </p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;">
      <a href="${appUrl}" style="display:inline-block; background:linear-gradient(135deg,${color},#6C63FF); color:#fff; text-decoration:none; border-radius:12px; padding:14px 36px; font-weight:700; font-size:0.95rem; letter-spacing:0.02em;">
        Ir a mi análisis →
      </a>
    </div>
  `);

  return {
    to: email,
    subject: `Bienvenido/a al análisis completo ${mbtiType} ✦`,
    html,
  };
}
