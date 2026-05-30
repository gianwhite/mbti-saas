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

// ── Email Nurture 1: 24h — Relaciones y patrones ──────────────
const NURTURE_24_DATA = {
  INTJ: {
    subject: "INTJ: el patrón que sabotea tus relaciones más prometedoras",
    headline: "Tu mayor fortaleza en relaciones también es tu mayor trampa",
    body: `Los INTJ construyen estándares tan altos que pocas personas los cruzan. Eso no es un problema de compatibilidad — es un mecanismo de protección disfrazado de selectividad.\n\nEn relaciones, tu patrón es este: te abres lentamente, inviertes profundo, y cuando la otra persona no sostiene el nivel, el cierre emocional es inmediato y casi irreversible.\n\nLo que tu análisis completo revela: el tipo de persona que activa tu lado emocional sin activar tus defensas, y cómo reconocerlo antes de que pase.`,
    unlock: "Ver mi mapa de compatibilidad completo",
  },
  INTP: {
    subject: "INTP: por qué desconectas justo cuando más te necesitan",
    headline: "Tu cerebro te protege — pero tiene un costo en tus vínculos",
    body: `Los INTP tienen una respuesta automática al conflicto emocional: el análisis. En vez de sentir, explican. En vez de estar presentes, diagnostican.\n\nEso no es frialdad — es tu sistema nervioso buscando terreno seguro. El problema es que la persona frente a ti interpreta esa distancia como desinterés.\n\nTu análisis completo incluye: el lenguaje del amor que realmente necesitas (no el que crees), y los tipos con quienes esa distancia se convierte en complicidad.`,
    unlock: "Ver cómo conecto profundo siendo INTP",
  },
  ENTJ: {
    subject: "ENTJ: el precio de liderar también en el amor",
    headline: "Diriges reuniones con 50 personas. ¿Por qué las relaciones íntimas se te complican?",
    body: `Los ENTJ en relaciones tienen un patrón predecible: optimizan. La conversación, la dinámica, el crecimiento de la pareja. Lo hacen con buenas intenciones — y el efecto es que la otra persona se siente evaluada, no amada.\n\nTu mayor punto ciego no es la dureza. Es que no sabes recibir sin analizar si lo que recibes cumple con tu estándar.\n\nTu análisis completo revela: con qué tipos el ENTJ baja la guardia de verdad, y qué activa en ti el deseo de quedarte.`,
    unlock: "Ver mi análisis relacional completo",
  },
  ENTP: {
    subject: "ENTP: el patrón que repites en relaciones sin darte cuenta",
    headline: "Eres irresistible al inicio. ¿Qué pasa después de los 3 meses?",
    body: `Los ENTP seducen con ideas, con energía, con la sensación de que contigo el mundo es más interesante. El problema es que esa misma energía necesita novedad constante — y las relaciones estables eventualmente dejan de ser nuevas.\n\nEl patrón: intensidad inicial → conexión profunda → sensación de estancamiento → buscar estímulo fuera o desconectarse.\n\nTu análisis completo incluye: qué tipo de persona te mantiene en modo de exploración sin que la relación se vuelva predecible, y cómo crear profundidad sin perder libertad.`,
    unlock: "Ver mi patrón de atracción real",
  },
  INFJ: {
    subject: "INFJ: el costo de ver a todos mejor de lo que son",
    headline: "Ves el potencial de las personas. Eso te hace generoso/a — y vulnerable",
    body: `Los INFJ tienen una capacidad casi sobrenatural para ver el mejor yo de otras personas — incluso antes de que esa persona lo vea en sí misma. Eso los convierte en compañeros transformadores.\n\nTambién los hace propensos a relaciones asimétricas: dan visión, contención, profundidad. La otra persona recibe más de lo que da.\n\nTu análisis completo revela: las señales de que una relación está drenándote antes de que llegues al "door slam", y los tipos que naturalmente igualan tu nivel de intensidad.`,
    unlock: "Ver con quién me equilibro realmente",
  },
  INFP: {
    subject: "INFP: por qué te enamoras de potencial, no de realidad",
    headline: "Tu amor más profundo ha sido con alguien que nunca terminó de aparecer",
    body: `Los INFP construyen vínculos con la versión ideal de la persona — la que vislumbran en momentos específicos. Cuando la realidad no sostiene esa imagen, el desencanto es total.\n\nNo es que seas demasiado idealista. Es que tu forma de amar requiere que la otra persona también sea auténtica contigo — y eso es escaso.\n\nTu análisis completo incluye: el tipo de persona que activa tu apertura emocional sin activar tus mecanismos de defensa, y por qué ciertas combinaciones de tipos generan dependencia emocional en los INFP.`,
    unlock: "Ver mi mapa de compatibilidad emocional",
  },
  ENFJ: {
    subject: "ENFJ: el agotamiento que nadie ve porque siempre luces bien",
    headline: "Das tanto que parece fácil. No lo es.",
    body: `Los ENFJ son los mejores en leer lo que los demás necesitan — y darlo, antes de que lo pidan. Esa capacidad es auténtica. Y tiene un costo invisible: terminas en relaciones donde eres el sostén emocional permanente.\n\nTu patrón en relaciones: cuidas, elevas, anticipas necesidades. Y esperas en silencio que alguien haga lo mismo contigo. Cuando no pasa, no lo dices — solo te distancias gradualmente.\n\nTu análisis completo revela: con qué tipos el ENFJ recibe sin tener que pedirlo, y cómo detectar una relación recíproca real vs una que drena.`,
    unlock: "Ver mi análisis de vínculos completo",
  },
  ENFP: {
    subject: "ENFP: la diferencia entre conectar profundo y conectar con todo el mundo",
    headline: "Tienes química con casi todos. ¿Con quién es real?",
    body: `Los ENFP generan conexión genuina con una facilidad que la mayoría envidia. El problema: esa misma capacidad hace difícil distinguir cuándo una conexión es significativa vs cuándo es simplemente fluida.\n\nEn relaciones, el patrón es: intensidad emocional temprana → sensación de haber encontrado a "tu persona" → descubrir con el tiempo que la profundidad que buscabas no estaba ahí.\n\nTu análisis completo incluye: los tipos que naturalmente anclan a los ENFP sin limitarlos, y qué señales indican que una relación tiene real profundidad vs que solo tiene buena energía.`,
    unlock: "Ver con quién conecto de verdad",
  },
  ISTJ: {
    subject: "ISTJ: lo que interpretan como frialdad tuya no lo es",
    headline: "Amas diferente. No menos.",
    body: `Los ISTJ demuestran amor con acciones, no con palabras. Presencia, confiabilidad, consistencia — ese es tu lenguaje. El problema es que vivimos en una cultura que valida el amor que se dice, no el que se sostiene.\n\nEn relaciones, tu patrón es: compromiso implícito, expectativas no verbalizadas, distancia cuando algo no funciona. La otra persona muchas veces no entiende qué pasó.\n\nTu análisis completo revela: los tipos que naturalmente reconocen y valoran tu forma de amar, y cómo traducir tu lealtad al lenguaje que la otra persona puede recibir.`,
    unlock: "Ver mi análisis relacional ISTJ",
  },
  ISFJ: {
    subject: "ISFJ: cuándo cuidar a otros se convierte en descuidarte a ti",
    headline: "Tu mayor fortaleza en relaciones tiene un precio que pocos conocen",
    body: `Los ISFJ son los cuidadores más confiables y presentes en cualquier vínculo. Esa capacidad es genuina — y también es el patrón que más frecuentemente los lleva a relaciones asimétricas.\n\nDas apoyo, presencia, memoria emocional. La otra persona recibe sin darse cuenta de cuánto estás dando. Y cuando llegas a tu límite, el desborde sorprende a todos — menos a ti.\n\nTu análisis completo incluye: cómo reconocer cuándo una relación te nutre vs cuándo te drena, y los tipos con quienes el cuidado fluye en ambas direcciones.`,
    unlock: "Ver mis patrones de vínculo completos",
  },
  ESTJ: {
    subject: "ESTJ: por qué las relaciones más intensas te cuestan más de lo que admites",
    headline: "Controlas lo que puedes ver. Lo emocional no siempre se ve.",
    body: `Los ESTJ llevan estructura a todo — trabajo, proyectos, sistemas. En relaciones, esa misma energía aparece como expectativas claras, roles definidos y poca tolerancia a la ambigüedad emocional.\n\nEl problema no es que seas poco emocional. Es que tu forma de procesar lo emocional es diferente, y cuando la pareja necesita algo que no encaja en tu estructura, ambos terminan frustrados.\n\nTu análisis completo revela: con qué tipos la estructura y la profundidad emocional coexisten sin conflicto, y cómo el ESTJ accede a su lado más vulnerable sin perder estabilidad.`,
    unlock: "Ver mi mapa relacional completo",
  },
  ESFJ: {
    subject: "ESFJ: la aprobación que buscas y lo que te cuesta obtenerla",
    headline: "Nadie crea armonía como tú. ¿A qué precio?",
    body: `Los ESFJ son expertos en crear el ambiente que otros necesitan — la conversación fluida, el grupo cómodo, la pareja que se siente escuchada. Esa capacidad es real.\n\nTambién es la fuente de su mayor vulnerabilidad: cuando tu bienestar emocional depende de que los demás estén bien, le das a otros el control sobre cómo te sientes.\n\nTu análisis completo incluye: el patrón de relaciones donde el ESFJ da poder sin saberlo, y con qué tipos puedes ser tú mismo/a sin necesitar que el ambiente sea perfecto primero.`,
    unlock: "Ver mi análisis emocional completo",
  },
  ISTP: {
    subject: "ISTP: lo que malinterpretan como desinterés tuyo",
    headline: "Estás presente — solo no de la manera que esperan",
    body: `Los ISTP procesan el mundo a través de la acción y la observación. En relaciones, esto se traduce en presencia tranquila, respuesta práctica al problema, y poca expresión verbal de lo que sienten.\n\nLo que la otra persona interpreta: desapego, falta de interés, falta de compromiso. Lo que realmente está pasando: estás ahí, pero en tu propio lenguaje.\n\nTu análisis completo revela: los tipos que leen e interpretan correctamente tu presencia, y cómo el ISTP conecta profundo sin cambiar quién es.`,
    unlock: "Ver con quién funciono mejor como ISTP",
  },
  ISFP: {
    subject: "ISFP: la intensidad que escondes y lo que hace cuando sale",
    headline: "Eres más intenso/a de lo que parece. Las personas cercanas lo saben.",
    body: `Los ISFP proyectan calma y suavidad. Internamente viven cada vínculo con una intensidad que pocas personas sospechan. Esa brecha entre lo que muestran y lo que sienten genera vínculos donde la otra persona nunca sabe realmente dónde está parado.\n\nEl patrón: apertura gradual → confianza total → decepción intensa → cierre repentino. Sin aviso. Sin explicación clara.\n\nTu análisis completo incluye: qué activa tu apertura sin activar tus mecanismos de protección, y los tipos con quienes la intensidad fluye en ambas direcciones.`,
    unlock: "Ver mi análisis emocional ISFP",
  },
  ESTP: {
    subject: "ESTP: por qué conquistas fácil y te quedas poco",
    headline: "Tienes todo para crear vínculos profundos. Algo lo frena.",
    body: `Los ESTP son magnéticos en el primer encuentro: presencia total, energía, humor, capacidad de leer el ambiente en segundos. La atracción es casi automática.\n\nEl patrón en relaciones: conquista rápida → presencia intensa → necesidad de nueva estimulación → distancia gradual. No es que no quieras profundidad — es que no sabes bien cómo crearla sin perder la energía que te define.\n\nTu análisis completo revela: qué tipo de persona te activa el deseo de quedarse, y cómo el ESTP construye profundidad sin volverse predecible.`,
    unlock: "Ver mi análisis de atracción completo",
  },
  ESFP: {
    subject: "ESFP: la diferencia entre conexión real y conexión con buena energía",
    headline: "Eres el centro de todo — ¿quién te ve cuando nadie mira?",
    body: `Los ESFP traen vida a cualquier espacio. Esa energía es genuina y contagiosa. En relaciones, genera conexiones rápidas y cálidas — pero muchas veces superficiales, porque la persona que tienes enfrente responde a tu energía, no a ti.\n\nTu patrón más profundo: buscas estimulación y presencia constante, y cuando una relación se vuelve predecible, el impulso de buscar energía nueva es casi automático.\n\nTu análisis completo incluye: los tipos que te sostienen sin limitarte, y cómo el ESFP construye intimidad real sin perder su vitalidad.`,
    unlock: "Ver mi mapa de compatibilidad ESFP",
  },
};

const NURTURE_72_DATA = {
  INTJ: { matches: ["ENFP","ENTP"], avoid: ["ESFJ","ISFJ"] },
  INTP: { matches: ["ENTJ","ENFJ"], avoid: ["ESFJ","ESTJ"] },
  ENTJ: { matches: ["INTP","INFP"], avoid: ["INFP","ISFP"] },
  ENTP: { matches: ["INFJ","INTJ"], avoid: ["ISFJ","ESFJ"] },
  INFJ: { matches: ["ENTP","ENFP"], avoid: ["ESTP","ESFP"] },
  INFP: { matches: ["ENFJ","ENTJ"], avoid: ["ESTJ","ESTP"] },
  ENFJ: { matches: ["INFP","ISFP"], avoid: ["ISTP","INTP"] },
  ENFP: { matches: ["INFJ","INTJ"], avoid: ["ISTJ","ESTJ"] },
  ISTJ: { matches: ["ESFP","ESTP"], avoid: ["ENTP","ENFP"] },
  ISFJ: { matches: ["ESFP","ESTP"], avoid: ["ENTP","ENFP"] },
  ESTJ: { matches: ["ISFP","ISTP"], avoid: ["INFP","ENFP"] },
  ESFJ: { matches: ["ISFP","ISTP"], avoid: ["INTP","ENTP"] },
  ISTP: { matches: ["ESFJ","ESTJ"], avoid: ["ENFJ","INFJ"] },
  ISFP: { matches: ["ENFJ","ESFJ"], avoid: ["ENTJ","ESTJ"] },
  ESTP: { matches: ["ISFJ","ISTJ"], avoid: ["INFJ","ENFJ"] },
  ESFP: { matches: ["ISFJ","ISTJ"], avoid: ["INTJ","INFJ"] },
};

export function nurture24Email({ email, mbtiType }) {
  const name   = TYPE_NAMES[mbtiType]  || mbtiType;
  const color  = TYPE_COLORS[mbtiType] || "#6C63FF";
  const data   = NURTURE_24_DATA[mbtiType] || {};
  const appUrl = process.env.VITE_APP_URL || "https://16personalidades.app";

  const html = wrapper(`
    <!-- Header label -->
    <div style="text-align:center; margin-bottom:24px;">
      <span style="font-size:0.65rem; color:#444; letter-spacing:0.2em; text-transform:uppercase;">Tu análisis · ${mbtiType} — ${name}</span>
    </div>

    <!-- Hero -->
    <div style="background:#111; border:1px solid ${color}33; border-radius:20px; padding:28px 24px; margin-bottom:24px; position:relative; overflow:hidden;">
      <div style="position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,${color},transparent);"></div>
      <div style="font-size:0.65rem; color:${color}; letter-spacing:0.15em; margin-bottom:10px; text-transform:uppercase;">Relaciones · ${mbtiType}</div>
      <h1 style="font-size:1.25rem; font-weight:800; color:#f0f0f0; margin:0 0 8px; line-height:1.35;">${data.headline || "Tu patrón en relaciones"}</h1>
    </div>

    <!-- Body text -->
    <div style="background:#0f0f0f; border:1px solid #1a1a1a; border-radius:16px; padding:24px; margin-bottom:24px;">
      ${(data.body || "").split("\n\n").map(p =>
        `<p style="color:#bbb; font-size:0.88rem; line-height:1.8; margin:0 0 16px;">${p}</p>`
      ).join("")}
    </div>

    <!-- Locked preview -->
    <div style="background:#111; border:1px solid #1e1e1e; border-radius:16px; padding:20px 24px; margin-bottom:28px;">
      <div style="font-size:0.65rem; color:#444; letter-spacing:0.15em; margin-bottom:14px;">BLOQUEADO EN TU ANÁLISIS COMPLETO</div>
      ${["Tu mapa de compatibilidad por tipo","Los patrones de sabotaje de tu tipo en pareja","Cómo te comportas bajo estrés emocional","Qué necesitas para comprometerte de verdad"].map(item =>
        `<div style="display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #161616;">
          <span style="color:#2a2a2a; font-size:0.9rem;">🔒</span>
          <span style="color:#444; font-size:0.82rem;">${item}</span>
        </div>`
      ).join("")}
    </div>

    <!-- CTA -->
    <div style="text-align:center;">
      <a href="${appUrl}/test" style="display:inline-block; background:linear-gradient(135deg,${color},#6C3FC8); color:#fff; text-decoration:none; border-radius:12px; padding:14px 36px; font-weight:700; font-size:0.95rem; letter-spacing:0.02em;">
        ${data.unlock || "Ver mi análisis completo →"}
      </a>
      <p style="color:#2a2a2a; font-size:0.72rem; margin-top:12px;">7 días gratis · Sin tarjeta · Cancela cuando quieras</p>
    </div>
  `);

  return {
    to: email,
    subject: data.subject || `${mbtiType}: tu patrón en relaciones`,
    html,
  };
}

export function nurture72Email({ email, mbtiType }) {
  const name   = TYPE_NAMES[mbtiType]  || mbtiType;
  const color  = TYPE_COLORS[mbtiType] || "#6C63FF";
  const data   = NURTURE_72_DATA[mbtiType] || { matches: [], avoid: [] };
  const appUrl = process.env.VITE_APP_URL || "https://16personalidades.app";

  const matchCards = data.matches.map(t => {
    const tc = TYPE_COLORS[t] || "#888";
    const tn = TYPE_NAMES[t] || t;
    return `<div style="background:#111; border:1px solid ${tc}33; border-radius:12px; padding:14px 16px; text-align:center;">
      <div style="font-size:1.3rem; font-weight:900; color:${tc}; letter-spacing:0.08em;">${t}</div>
      <div style="font-size:0.72rem; color:#555; margin-top:4px;">${tn}</div>
      <div style="font-size:0.68rem; color:#333; margin-top:6px;">Alta compatibilidad</div>
    </div>`;
  }).join("");

  const lockedCards = [...data.avoid, "???", "???"].map((t, i) => {
    if (t === "???") return `<div style="background:#0d0d0d; border:1px solid #1a1a1a; border-radius:12px; padding:14px 16px; text-align:center; filter:blur(0);">
      <div style="font-size:1.3rem; font-weight:900; color:#222; letter-spacing:0.08em;">????</div>
      <div style="font-size:0.72rem; color:#222; margin-top:4px;">Bloqueado</div>
      <div style="font-size:1rem; color:#2a2a2a; margin-top:4px;">🔒</div>
    </div>`;
    const tc = TYPE_COLORS[t] || "#333";
    return `<div style="background:#0d0d0d; border:1px solid #1a1a1a; border-radius:12px; padding:14px 16px; text-align:center;">
      <div style="font-size:1.3rem; font-weight:900; color:#333; letter-spacing:0.08em;">${t}</div>
      <div style="font-size:0.72rem; color:#2a2a2a; margin-top:4px; filter:blur(3px);">Baja compatibilidad</div>
      <div style="font-size:0.9rem; color:#2a2a2a; margin-top:4px;">🔒</div>
    </div>`;
  }).join("");

  const html = wrapper(`
    <!-- Header -->
    <div style="text-align:center; margin-bottom:24px;">
      <span style="font-size:0.65rem; color:#444; letter-spacing:0.2em; text-transform:uppercase;">${mbtiType} · Compatibilidad</span>
    </div>

    <!-- Hero -->
    <div style="background:#111; border:1px solid ${color}33; border-radius:20px; padding:28px 24px; margin-bottom:24px; position:relative; overflow:hidden; text-align:center;">
      <div style="position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,${color},transparent);"></div>
      <h1 style="font-size:1.2rem; font-weight:800; color:#f0f0f0; margin:0 0 8px; line-height:1.4;">¿Sabes con quién eres más compatible como ${mbtiType}?</h1>
      <p style="color:#555; font-size:0.82rem; margin:0;">Basado en funciones cognitivas compartidas y dinámicas relacionales</p>
    </div>

    <!-- Matches desbloqueados -->
    <div style="margin-bottom:8px;">
      <div style="font-size:0.65rem; color:#555; letter-spacing:0.15em; margin-bottom:12px;">TUS MEJORES MATCHES (parcial)</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">
        ${matchCards}
      </div>
    </div>

    <!-- Bloqueados -->
    <div style="margin-bottom:28px;">
      <div style="font-size:0.65rem; color:#333; letter-spacing:0.15em; margin-bottom:12px;">Y HAY 14 TIPOS MÁS… 🔒</div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:8px;">
        ${lockedCards}
      </div>
      <p style="color:#333; font-size:0.75rem; margin-top:12px; text-align:center;">El análisis completo incluye todos los tipos, por qué funcionan, y qué dinámica genera cada combinación.</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;">
      <a href="${appUrl}/test" style="display:inline-block; background:linear-gradient(135deg,${color},#6C3FC8); color:#fff; text-decoration:none; border-radius:12px; padding:14px 36px; font-weight:700; font-size:0.95rem; letter-spacing:0.02em;">
        Ver mi compatibilidad completa →
      </a>
      <p style="color:#2a2a2a; font-size:0.72rem; margin-top:12px;">7 días gratis · Sin tarjeta · Cancela cuando quieras</p>
    </div>
  `);

  return {
    to: email,
    subject: `${mbtiType}: tus 2 mejores matches (y los que deberías evitar)`,
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
