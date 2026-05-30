// /test-v2 — Test de Funciones Cognitivas
// Mide las 8 funciones cognitivas directamente y deriva el tipo MBTI del stack resultante

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────
// TIPO STACKS Y DERIVACIÓN
// ─────────────────────────────────────────────
const TYPE_STACKS = {
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni'],
};

const STACK_WEIGHTS = [4, 3, 2, 1];

const FUNC_META = {
  Ni: { label: 'Ni — Intuición Introverted', color: '#A78BFA', desc: 'Visión, patrones profundos, intuición interna a largo plazo' },
  Ne: { label: 'Ne — Intuición Extrovertida', color: '#60A5FA', desc: 'Exploración de ideas, conexiones externas, posibilidades' },
  Si: { label: 'Si — Sensación Introverted',  color: '#34D399', desc: 'Memoria sensorial, rutina, comparación con el pasado' },
  Se: { label: 'Se — Sensación Extrovertida', color: '#FBBF24', desc: 'Presencia física, acción inmediata, estímulo del entorno' },
  Fi: { label: 'Fi — Sentimiento Introverted', color: '#F472B6', desc: 'Valores internos, autenticidad, emoción personal profunda' },
  Fe: { label: 'Fe — Sentimiento Extrovertido', color: '#FB923C', desc: 'Armonía grupal, empatía externa, conexión emocional' },
  Ti: { label: 'Ti — Pensamiento Introverted', color: '#38BDF8', desc: 'Lógica interna, sistemas propios, análisis independiente' },
  Te: { label: 'Te — Pensamiento Extrovertido', color: '#4ADE80', desc: 'Eficiencia externa, resultados, organización objetiva' },
};

export function deriveType(scores) {
  const typeScores = {};

  for (const [type, stack] of Object.entries(TYPE_STACKS)) {
    // Base score: weighted sum by stack position
    let s = 0;
    stack.forEach((fn, i) => { s += (scores[fn] || 0) * STACK_WEIGHTS[i]; });

    // Bonus: reward types whose dominant function matches the user's highest-scoring function
    // This corrects cases where dominant/auxiliary are close (e.g. INFJ vs ENFJ)
    const userTopFn = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (stack[0] === userTopFn) s += 15;

    // Secondary bonus: auxiliary matches user's 2nd highest
    const userSecondFn = Object.entries(scores).sort((a, b) => b[1] - a[1])[1]?.[0];
    if (stack[1] === userSecondFn) s += 8;

    typeScores[type] = s;
  }

  const sorted = Object.entries(typeScores).sort((a, b) => b[1] - a[1]);
  const bestType = sorted[0][0];
  return { type: bestType, ranking: sorted.slice(0, 3).map(([t]) => t), typeScores };
}

// ─────────────────────────────────────────────
// PREGUNTAS — 10 por función × 8 = 80
// Escala: 1 (Nada como yo) → 5 (Muy parecido a mí)
// ─────────────────────────────────────────────
export const COG_QUESTIONS = [
  // ── Ni ──
  { id: 1,  fn: 'Ni', text: 'Cuando estás en una conversación, frecuentemente sabes hacia dónde va antes de que termine.' },
  { id: 2,  fn: 'Ni', text: 'A menudo tienes corazonadas fuertes sobre situaciones futuras que luego resultan correctas.' },
  { id: 3,  fn: 'Ni', text: 'Procesas mejor las ideas dejándolas "reposar" internamente antes de expresarlas.' },
  { id: 4,  fn: 'Ni', text: 'Tiendes a ver el significado simbólico o el patrón profundo detrás de eventos cotidianos.' },
  { id: 5,  fn: 'Ni', text: 'Tu mente trabaja constantemente en segundo plano conectando patrones que otros no ven.' },
  { id: 6,  fn: 'Ni', text: 'Ante decisiones importantes, confías más en tu intuición interna que en datos concretos.' },
  { id: 7,  fn: 'Ni', text: 'Frecuentemente sabes que algo "no está bien" en una situación sin poder explicar exactamente por qué.' },
  { id: 8,  fn: 'Ni', text: 'Tu visión del futuro suele ser tan clara que a veces sientes que ya viviste ese momento antes.' },
  { id: 9,  fn: 'Ni', text: 'Prefieres trabajar hacia un objetivo a largo plazo bien definido en lugar de adaptarte sobre la marcha.' },
  { id: 10, fn: 'Ni', text: 'Cuando lees o escuchas algo, automáticamente buscas el patrón o significado más profundo.' },

  // ── Ne ──
  { id: 11, fn: 'Ne', text: 'Cuando alguien te presenta un problema, inmediatamente generas múltiples soluciones posibles.' },
  { id: 12, fn: 'Ne', text: 'Las conversaciones que saltan de tema en tema te energizan más que las que se enfocan en uno solo.' },
  { id: 13, fn: 'Ne', text: 'Ves conexiones entre ideas o áreas completamente distintas que otros no suelen notar.' },
  { id: 14, fn: 'Ne', text: 'Te cuesta comprometerte con una sola opción porque siempre ves otras posibilidades interesantes.' },
  { id: 15, fn: 'Ne', text: 'Disfrutas explorar ideas aunque no tengan una aplicación práctica inmediata.' },
  { id: 16, fn: 'Ne', text: 'Tu entusiasmo por nuevos proyectos tiende a ser mayor al inicio que al final.' },
  { id: 17, fn: 'Ne', text: 'En una lluvia de ideas, eres de los que más aporta y más disfruta el proceso.' },
  { id: 18, fn: 'Ne', text: 'Cambiar planes de último momento no te molesta — a veces lo encuentras estimulante.' },
  { id: 19, fn: 'Ne', text: 'Cuando escuchas una idea, instintivamente piensas en cómo podría extenderse o aplicarse de formas inesperadas.' },
  { id: 20, fn: 'Ne', text: 'Te aburres rápido cuando tienes que hacer la misma tarea repetidamente de la misma manera.' },

  // ── Si ──
  { id: 21, fn: 'Si', text: 'Confías más en métodos probados que en enfoques nuevos sin historial comprobado.' },
  { id: 22, fn: 'Si', text: 'Los detalles específicos de experiencias pasadas se graban en tu memoria con precisión.' },
  { id: 23, fn: 'Si', text: 'Tener una rutina establecida te ayuda a sentirte más seguro y eficiente.' },
  { id: 24, fn: 'Si', text: 'Cuando algo funciona bien, prefieres mantenerlo igual en lugar de buscar cambios.' },
  { id: 25, fn: 'Si', text: 'Aprendes mejor cuando puedes relacionar información nueva con algo que ya conoces.' },
  { id: 26, fn: 'Si', text: 'Eres de las personas que recuerdan cómo se hacían las cosas antes y valoran esa continuidad.' },
  { id: 27, fn: 'Si', text: 'Te incomoda cuando las reglas o procedimientos cambian sin una razón clara.' },
  { id: 28, fn: 'Si', text: 'Antes de tomar una decisión importante, revisas cómo se manejaron situaciones similares en el pasado.' },
  { id: 29, fn: 'Si', text: 'Tienes un sentido fuerte de las obligaciones y responsabilidades que has asumido con otros.' },
  { id: 30, fn: 'Si', text: 'El orden físico en tu espacio de trabajo o vida cotidiana es importante para tu bienestar.' },

  // ── Se ──
  { id: 31, fn: 'Se', text: 'Eres de los primeros en actuar cuando surge una situación que requiere respuesta inmediata.' },
  { id: 32, fn: 'Se', text: 'Disfrutas actividades físicas o experiencias sensoriales intensas: deporte, comida, música en vivo.' },
  { id: 33, fn: 'Se', text: 'En situaciones de presión o crisis, tu rendimiento tiende a mejorar en lugar de empeorar.' },
  { id: 34, fn: 'Se', text: 'Notas detalles físicos de tu entorno que otros frecuentemente pasan por alto.' },
  { id: 35, fn: 'Se', text: 'Prefieres aprender haciendo en lugar de leyendo o escuchando explicaciones.' },
  { id: 36, fn: 'Se', text: 'Vivir el momento presente es más importante para ti que planear el futuro.' },
  { id: 37, fn: 'Se', text: 'Te adaptas rápido a entornos nuevos y cambios inesperados sin mucho estrés.' },
  { id: 38, fn: 'Se', text: 'Disfrutas la acción y el movimiento — estar quieto por mucho tiempo te incomoda.' },
  { id: 39, fn: 'Se', text: 'Eres bueno evaluando situaciones tal como son, sin añadir interpretaciones complicadas.' },
  { id: 40, fn: 'Se', text: 'Cuando ves una oportunidad, actúas rápido antes de que se pierda.' },

  // ── Fi ──
  { id: 41, fn: 'Fi', text: 'Tienes un conjunto claro de valores personales que guían tus decisiones, aunque otros no los compartan.' },
  { id: 42, fn: 'Fi', text: 'Cuando algo viola tus principios, es muy difícil seguir adelante aunque la lógica lo justifique.' },
  { id: 43, fn: 'Fi', text: 'Procesas tus emociones internamente antes de hablar de ellas con otros.' },
  { id: 44, fn: 'Fi', text: 'La autenticidad es fundamental para ti — prefieres ser honesto sobre quién eres antes que encajar.' },
  { id: 45, fn: 'Fi', text: 'Sientes empatía profunda hacia individuos específicos aunque no siempre la expreses abiertamente.' },
  { id: 46, fn: 'Fi', text: 'Cuando tomas decisiones importantes, lo que más pesa es si se alinea con quién quieres ser.' },
  { id: 47, fn: 'Fi', text: 'Te molesta que otros intenten cambiarte o que asuman que deberías comportarte diferente.' },
  { id: 48, fn: 'Fi', text: 'Necesitas tiempo solo para procesar experiencias emocionales intensas.' },
  { id: 49, fn: 'Fi', text: 'Eres selectivo con las personas a quienes muestras tu lado más vulnerable.' },
  { id: 50, fn: 'Fi', text: 'Una injusticia hacia un individuo te afecta más profundamente que una estadística de sufrimiento masivo.' },

  // ── Fe ──
  { id: 51, fn: 'Fe', text: 'Eres muy consciente del estado emocional de las personas en una sala y actúas en consecuencia.' },
  { id: 52, fn: 'Fe', text: 'Cuando hay tensión en un grupo, sientes una necesidad fuerte de resolverla o aliviarla.' },
  { id: 53, fn: 'Fe', text: 'Ajustas tu comunicación instintivamente según cómo crees que el otro quiere o necesita escuchar las cosas.' },
  { id: 54, fn: 'Fe', text: 'La armonía en tus relaciones cercanas es prioridad — el conflicto prolongado te afecta mucho.' },
  { id: 55, fn: 'Fe', text: 'Encuentras satisfacción genuina cuando puedes hacer que otros se sientan bien o comprendidos.' },
  { id: 56, fn: 'Fe', text: 'Eres bueno identificando qué necesita cada persona emocionalmente en una situación dada.' },
  { id: 57, fn: 'Fe', text: 'A veces priorizas las necesidades emocionales del grupo sobre tus propias preferencias.' },
  { id: 58, fn: 'Fe', text: 'Cuando alguien está mal, tu instinto es acercarte y ofrecer apoyo, no esperar a que pidan ayuda.' },
  { id: 59, fn: 'Fe', text: 'Eres consciente de las normas emocionales de distintos contextos sociales y las respetas.' },
  { id: 60, fn: 'Fe', text: 'Te importa mucho cómo te perciben emocionalmente las personas cercanas a ti.' },

  // ── Ti ──
  { id: 61, fn: 'Ti', text: 'Antes de aceptar una idea, necesitas entender completamente su lógica interna, aunque la mayoría ya la acepte.' },
  { id: 62, fn: 'Ti', text: 'Construyes tus propios marcos conceptuales para entender el mundo en lugar de adoptar los de otros.' },
  { id: 63, fn: 'Ti', text: 'Encuentras errores lógicos en argumentos que otros consideran sólidos con facilidad.' },
  { id: 64, fn: 'Ti', text: 'Prefieres trabajar en problemas complejos solo que en grupo, donde las ideas ajenas pueden interrumpir tu proceso.' },
  { id: 65, fn: 'Ti', text: 'Cuando algo no tiene sentido lógico para ti, no puedes simplemente "aceptarlo" aunque sea conveniente.' },
  { id: 66, fn: 'Ti', text: 'Disfrutas analizar cómo funcionan los sistemas — mecánicos, sociales, conceptuales — por puro interés.' },
  { id: 67, fn: 'Ti', text: 'Eres más convincente en escritura o pensamiento individual que en debates espontáneos.' },
  { id: 68, fn: 'Ti', text: 'Una vez que entiendes el principio detrás de algo, puedes aplicarlo a contextos completamente nuevos.' },
  { id: 69, fn: 'Ti', text: 'Te molesta cuando las personas usan argumentos emocionales para defender posiciones sin base lógica.' },
  { id: 70, fn: 'Ti', text: 'Tu proceso de decisión implica descomponer el problema en partes y analizar cada una por separado.' },

  // ── Te ──
  { id: 71, fn: 'Te', text: 'Cuando tienes un objetivo, naturalmente estructuras un plan con pasos claros y plazos definidos.' },
  { id: 72, fn: 'Te', text: 'En reuniones o proyectos grupales, tiendes a organizar y mantener el enfoque en los resultados.' },
  { id: 73, fn: 'Te', text: 'Prefieres comunicarte de forma directa y al punto — los rodeos te frustran.' },
  { id: 74, fn: 'Te', text: 'Evalúas ideas y propuestas principalmente por su efectividad y resultados comprobables.' },
  { id: 75, fn: 'Te', text: 'Eres bueno identificando ineficiencias en procesos y proponiendo mejoras concretas.' },
  { id: 76, fn: 'Te', text: 'Te sientes más cómodo cuando hay estructura, roles claros y objetivos medibles.' },
  { id: 77, fn: 'Te', text: 'Tomar decisiones rápidas basadas en datos disponibles es más fácil para ti que para la mayoría.' },
  { id: 78, fn: 'Te', text: 'Cuando algo no está funcionando, tu instinto es cambiarlo o eliminarlo, no preservarlo por tradición.' },
  { id: 79, fn: 'Te', text: 'La productividad y el uso eficiente del tiempo son valores importantes en tu vida.' },
  { id: 80, fn: 'Te', text: 'En una discusión, buscas llegar a una conclusión accionable, no solo explorar ideas.' },
];

// ─────────────────────────────────────────────
// SCORING
// ─────────────────────────────────────────────
export function computeScores(answers) {
  // answers = { [questionId]: 1-5 }
  const totals = {};
  const counts = {};

  COG_QUESTIONS.forEach(q => {
    const val = answers[q.id] ?? 0;
    totals[q.fn] = (totals[q.fn] || 0) + val;
    counts[q.fn] = (counts[q.fn] || 0) + 1;
  });

  const scores = {};
  for (const fn of Object.keys(totals)) {
    // Max possible = 5 * 10 = 50 → normalize to 0-100
    scores[fn] = Math.round((totals[fn] / (counts[fn] * 5)) * 100);
  }
  return scores;
}

// ─────────────────────────────────────────────
// HELPERS UI
// ─────────────────────────────────────────────
const QUESTIONS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(COG_QUESTIONS.length / QUESTIONS_PER_PAGE);

const SCALE_LABELS = ['Nada como yo', 'Poco como yo', 'A veces', 'Bastante como yo', 'Muy parecido a mí'];

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function CogTest() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0); // 0 = intro, 1-8 = questions, 9 = results
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const topRef = useRef(null);

  const currentQuestions = COG_QUESTIONS.slice(
    (page - 1) * QUESTIONS_PER_PAGE,
    page * QUESTIONS_PER_PAGE
  );

  const answeredOnPage = currentQuestions.filter(q => answers[q.id] !== undefined).length;
  const pageComplete = answeredOnPage === QUESTIONS_PER_PAGE;
  const progress = page === 0 ? 0 : Math.round(((page - 1) * QUESTIONS_PER_PAGE + answeredOnPage) / 80 * 100);

  const handleAnswer = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleNext = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (page < TOTAL_PAGES) {
      setPage(p => p + 1);
    } else {
      // Calculate results
      const scores = computeScores(answers);
      const derived = deriveType(scores);
      setResult({ scores, ...derived });
      setPage(TOTAL_PAGES + 1);
    }
  };

  const handleBack = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    setPage(p => Math.max(0, p - 1));
  };

  const fnOfPage = page >= 1 && page <= TOTAL_PAGES
    ? [...new Set(currentQuestions.map(q => q.fn))]
    : [];

  return (
    <div ref={topRef} style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #080612 0%, #0d0820 50%, #080612 100%)',
      color: '#F0EBF8',
      fontFamily: "'Inter', sans-serif",
      padding: '0',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>

        {/* ── INTRO ── */}
        {page === 0 && (
          <IntroScreen onStart={() => setPage(1)} />
        )}

        {/* ── PREGUNTAS ── */}
        {page >= 1 && page <= TOTAL_PAGES && (
          <QuestionPage
            questions={currentQuestions}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
            page={page}
            totalPages={TOTAL_PAGES}
            progress={progress}
            pageComplete={pageComplete}
            fnLabels={fnOfPage}
          />
        )}

        {/* ── RESULTADOS ── */}
        {page === TOTAL_PAGES + 1 && result && (
          <ResultsPageV2 result={result} onRetake={() => { setAnswers({}); setResult(null); setPage(0); }} onGoMain={() => navigate('/')} />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// INTRO SCREEN
// ─────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
      {/* Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#A78BFA18', border: '1px solid #A78BFA33', borderRadius: '20px', padding: '5px 16px', marginBottom: '2rem' }}>
        <span style={{ color: '#A78BFA', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em' }}>TEST V2 · FUNCIONES COGNITIVAS</span>
      </div>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.2 }}>
        Descubre tu perfil<br />
        <span style={{ background: 'linear-gradient(90deg, #A78BFA, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          cognitivo real
        </span>
      </h1>

      <p style={{ color: '#8878A0', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
        En lugar de medir ejes bipolares, este test mide directamente tus 8 funciones cognitivas y deriva tu tipo MBTI del stack resultante. Más preciso, más personal.
      </p>

      {/* Cards de funciones */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '2.5rem', textAlign: 'left' }}>
        {Object.entries(FUNC_META).map(([fn, meta]) => (
          <div key={fn} style={{ background: meta.color + '0d', border: `1px solid ${meta.color}22`, borderRadius: '10px', padding: '0.65rem 0.85rem' }}>
            <div style={{ color: meta.color, fontWeight: 800, fontSize: '0.85rem', marginBottom: '2px' }}>{fn}</div>
            <div style={{ color: '#555', fontSize: '0.68rem', lineHeight: 1.4 }}>{meta.desc.split(',')[0]}</div>
          </div>
        ))}
      </div>

      <div style={{ color: '#3D3550', fontSize: '0.78rem', marginBottom: '1.5rem' }}>
        80 afirmaciones · ~12 minutos · Escala del 1 al 5
      </div>

      <button
        onClick={onStart}
        style={{
          background: 'linear-gradient(135deg, #A78BFA, #6C63FF)',
          color: '#fff',
          border: 'none',
          borderRadius: '14px',
          padding: '1rem 2.5rem',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          width: '100%',
          maxWidth: '320px',
          letterSpacing: '0.02em',
        }}
      >
        Comenzar test →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// QUESTION PAGE
// ─────────────────────────────────────────────
function QuestionPage({ questions, answers, onAnswer, onNext, onBack, page, totalPages, progress, pageComplete, fnLabels }) {
  const fnColors = fnLabels.map(fn => FUNC_META[fn]?.color || '#A78BFA');
  const primaryColor = fnColors[0];

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {fnLabels.map((fn, i) => (
              <span key={fn} style={{ background: fnColors[i] + '22', border: `1px solid ${fnColors[i]}44`, borderRadius: '6px', padding: '2px 8px', color: fnColors[i], fontSize: '0.72rem', fontWeight: 700 }}>{fn}</span>
            ))}
          </div>
          <span style={{ color: '#3D3550', fontSize: '0.72rem' }}>{progress}%</span>
        </div>
        <div style={{ background: '#1a1a2e', borderRadius: '4px', height: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${primaryColor}, #6C63FF)`, transition: 'width 0.4s ease', borderRadius: '4px' }} />
        </div>
        <div style={{ color: '#2a2a3e', fontSize: '0.65rem', marginTop: '0.35rem' }}>Página {page} de {totalPages}</div>
      </div>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {questions.map((q, qi) => {
          const answered = answers[q.id] !== undefined;
          const fnMeta = FUNC_META[q.fn];
          return (
            <div
              key={q.id}
              style={{
                background: answered ? fnMeta.color + '08' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${answered ? fnMeta.color + '33' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '14px',
                padding: '1rem',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ color: '#C4B5FD', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '0.85rem', fontWeight: 500 }}>
                <span style={{ color: '#3D3550', fontSize: '0.7rem', marginRight: '0.5rem' }}>#{(page - 1) * 10 + qi + 1}</span>
                {q.text}
              </div>
              <ScaleSelector value={answers[q.id]} onChange={(v) => onAnswer(q.id, v)} color={fnMeta.color} />
            </div>
          );
        })}
      </div>

      {/* Nav buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {page > 1 && (
          <button onClick={onBack} style={{ flex: '0 0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1.25rem', color: '#555', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
            ← Atrás
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!pageComplete}
          style={{
            flex: 1,
            background: pageComplete ? `linear-gradient(135deg, ${primaryColor}, #6C63FF)` : '#1a1a2e',
            border: 'none',
            borderRadius: '12px',
            padding: '0.85rem',
            color: pageComplete ? '#fff' : '#3D3550',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: pageComplete ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            letterSpacing: '0.02em',
          }}
        >
          {page === totalPages ? 'Ver mi perfil cognitivo →' : `Siguiente (${10 - Object.keys(answers).filter(id => questions.find(q => q.id === parseInt(id))).length} restantes)`}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCALE SELECTOR
// ─────────────────────────────────────────────
function ScaleSelector({ value, onChange, color }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-between' }}>
        {[1, 2, 3, 4, 5].map(v => {
          const selected = value === v;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              style={{
                flex: 1,
                height: '38px',
                background: selected ? color + '33' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected ? color + '88' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '8px',
                color: selected ? color : '#3D3550',
                fontSize: '0.85rem',
                fontWeight: selected ? 800 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
                transform: selected ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {v}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ color: '#2a2a3e', fontSize: '0.6rem' }}>Nada como yo</span>
        <span style={{ color: '#2a2a3e', fontSize: '0.6rem' }}>Muy parecido a mí</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// RESULTS PAGE V2
// ─────────────────────────────────────────────
function ResultsPageV2({ result, onRetake, onGoMain }) {
  const { type, scores, ranking } = result;
  const stack = TYPE_STACKS[type] || [];

  // Sort functions by score for the bar chart
  const sortedFns = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const dominantFn = stack[0];
  const dominantMeta = FUNC_META[dominantFn] || {};

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '2rem 0 1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: dominantMeta.color + '18', border: `1px solid ${dominantMeta.color}33`, borderRadius: '20px', padding: '5px 16px', marginBottom: '1.25rem' }}>
          <span style={{ color: dominantMeta.color, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em' }}>PERFIL COGNITIVO · RESULTADOS</span>
        </div>

        <div style={{ fontSize: '4rem', fontWeight: 900, color: dominantMeta.color, marginBottom: '0.25rem', letterSpacing: '0.05em' }}>{type}</div>
        <div style={{ color: '#8878A0', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          Función dominante: <span style={{ color: dominantMeta.color, fontWeight: 700 }}>{dominantFn}</span>
        </div>
        <div style={{ color: '#555', fontSize: '0.78rem' }}>{dominantMeta.desc}</div>
      </div>

      {/* Stack cognitivo */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ color: '#3D3550', fontSize: '0.68rem', letterSpacing: '0.12em', marginBottom: '1rem' }}>TU STACK COGNITIVO</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {sortedFns.map(([fn, score], i) => {
            const meta = FUNC_META[fn];
            const stackPos = stack.indexOf(fn);
            const posLabels = ['Dominante', 'Auxiliar', 'Terciaria', 'Inferior'];
            const posLabel = stackPos >= 0 ? posLabels[stackPos] : 'Sombra';
            const isShadow = stackPos < 0;
            return (
              <div key={fn} style={{ opacity: isShadow ? 0.4 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: meta.color, fontWeight: 800, fontSize: '0.85rem', minWidth: '28px' }}>{fn}</span>
                    <span style={{ color: '#3D3550', fontSize: '0.65rem' }}>{meta.desc.split(',')[0]}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {!isShadow && <span style={{ color: meta.color, fontSize: '0.65rem', fontWeight: 700 }}>{posLabel}</span>}
                    <span style={{ color: meta.color, fontWeight: 700, fontSize: '0.82rem', minWidth: '36px', textAlign: 'right' }}>{score}%</span>
                  </div>
                </div>
                <div style={{ background: '#0f0f1a', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${score}%`, height: '100%', background: `linear-gradient(90deg, ${meta.color}, ${meta.color}88)`, borderRadius: '4px', transition: 'width 0.8s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stack breakdown */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ color: '#3D3550', fontSize: '0.68rem', letterSpacing: '0.12em', marginBottom: '1rem' }}>POSICIONES EN TU STACK</div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {stack.map((fn, i) => {
            const meta = FUNC_META[fn];
            const labels = ['Dominante', 'Auxiliar', 'Terciaria', 'Inferior'];
            return (
              <div key={fn} style={{ flex: '1', minWidth: '120px', background: meta.color + '0d', border: `1px solid ${meta.color}33`, borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: meta.color, fontWeight: 900, fontSize: '1.1rem', marginBottom: '2px' }}>{fn}</div>
                <div style={{ color: '#555', fontSize: '0.65rem', marginBottom: '4px' }}>{labels[i]}</div>
                <div style={{ color: meta.color, fontWeight: 700, fontSize: '0.8rem' }}>{scores[fn]}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tipos alternativos */}
      {ranking.length > 1 && (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#3D3550', fontSize: '0.68rem', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>TIPOS ALTERNATIVOS</div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {ranking.slice(1).map(t => {
              const fn = TYPE_STACKS[t]?.[0];
              const meta = FUNC_META[fn] || {};
              return (
                <div key={t} style={{ flex: 1, background: meta.color + '0d', border: `1px solid ${meta.color}22`, borderRadius: '10px', padding: '0.65rem', textAlign: 'center' }}>
                  <div style={{ color: meta.color, fontWeight: 800, fontSize: '0.95rem' }}>{t}</div>
                  <div style={{ color: '#3D3550', fontSize: '0.65rem', marginTop: '2px' }}>Alternativo</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Note */}
      <div style={{ background: '#A78BFA08', border: '1px solid #A78BFA22', borderRadius: '12px', padding: '0.85rem', marginBottom: '1.5rem' }}>
        <p style={{ color: '#555', fontSize: '0.75rem', lineHeight: 1.6, margin: 0 }}>
          <strong style={{ color: '#A78BFA' }}>Nota de precisión:</strong> Este test mide tus funciones cognitivas a través de comportamientos y preferencias reales. El tipo derivado refleja tu perfil con mayor fidelidad que los tests de ejes bipolares. Para máxima precisión, responde basándote en cómo eres naturalmente, no en cómo crees que deberías ser.
        </p>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={onGoMain}
          style={{ width: '100%', background: 'linear-gradient(135deg, #A78BFA, #6C63FF)', color: '#fff', border: 'none', borderRadius: '14px', padding: '1rem', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em' }}
        >
          Ver análisis completo de {type} →
        </button>
        <button
          onClick={onRetake}
          style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '0.85rem', fontSize: '0.85rem', fontWeight: 600, color: '#555', cursor: 'pointer' }}
        >
          Repetir test
        </button>
      </div>
    </div>
  );
}
