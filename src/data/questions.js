export const RAW_QUESTIONS = [
  // ── E/I (Extroversión / Introversión) ─────────────────────────
  { id: 1,  text: "Después de un día muy social, lo que más necesito es estar con más personas para terminar bien el día.",  dimension: "EI", direction: "positive" },
  { id: 2,  text: "Cuando tengo un problema, mi primer instinto es hablar de él con alguien en lugar de procesarlo solo.",   dimension: "EI", direction: "positive" },
  { id: 3,  text: "En una reunión de trabajo o social, tiendo a hablar más que a escuchar.",                                 dimension: "EI", direction: "positive" },
  { id: 4,  text: "Me resulta fácil presentarme y entablar conversación con alguien que acabo de conocer.",                  dimension: "EI", direction: "positive" },
  { id: 5,  text: "En una fiesta o evento, generalmente me quedo hasta el final — la energía del grupo me carga.",           dimension: "EI", direction: "positive" },
  { id: 6,  text: "Cuando estoy emocionado por algo, mi reacción inmediata es contárselo a alguien.",                       dimension: "EI", direction: "positive" },
  { id: 7,  text: "Prefiero trabajar en espacios con otras personas presentes, aunque no interactúe con ellas.",             dimension: "EI", direction: "positive" },
  { id: 8,  text: "Cuando debo tomar una decisión difícil, pensar en voz alta con otros me ayuda más que reflexionar solo.", dimension: "EI", direction: "positive" },
  { id: 9,  text: "Después de un fin de semana muy social, el lunes necesito tiempo a solas para recuperarme.",              dimension: "EI", direction: "negative" },
  { id: 10, text: "Cuando llego a un lugar nuevo con gente que no conozco, mi tendencia natural es observar antes de participar.", dimension: "EI", direction: "negative" },
  { id: 11, text: "Hay personas que me dicen que es difícil saber lo que pienso porque no lo expreso espontáneamente.",      dimension: "EI", direction: "negative" },
  { id: 12, text: "Prefiero resolver un conflicto por escrito (mensaje, email) que en persona o por llamada.",               dimension: "EI", direction: "negative" },
  { id: 13, text: "Me resulta más fácil concentrarme cuando estoy solo que cuando hay otras personas alrededor.",            dimension: "EI", direction: "negative" },
  { id: 14, text: "Si tengo un sábado libre sin planes, la opción que más me atrae es tiempo en casa sin compromisos.",      dimension: "EI", direction: "negative" },
  { id: 15, text: "Las conversaciones profundas de uno a uno me satisfacen más que los grupos grandes.",                    dimension: "EI", direction: "negative" },

  // ── S/N (Sensación / Intuición) ────────────────────────────────
  { id: 16, text: "Cuando aprendo algo nuevo, prefiero empezar con ejemplos concretos antes que con el marco teórico.",      dimension: "SN", direction: "positive" },
  { id: 17, text: "Al dar instrucciones a alguien, naturalmente incluyo pasos detallados en lugar de una visión general.",   dimension: "SN", direction: "positive" },
  { id: 18, text: "Me resulta más útil saber exactamente qué hicieron otros en situaciones similares que teorizar soluciones.", dimension: "SN", direction: "positive" },
  { id: 19, text: "Cuando planeo algo, me enfoco en los detalles prácticos (logística, recursos, tiempos) antes que en la visión global.", dimension: "SN", direction: "positive" },
  { id: 20, text: "Confío más en algo que ha funcionado y está probado que en una idea innovadora sin historial.",            dimension: "SN", direction: "positive" },
  { id: 21, text: "Cuando leo algo, me quedo más con los hechos concretos que con las interpretaciones o implicaciones.",    dimension: "SN", direction: "positive" },
  { id: 22, text: "Aprendo mejor haciendo las cosas (prueba y error) que leyendo explicaciones o teorías.",                  dimension: "SN", direction: "positive" },
  { id: 23, text: "Cuando describo algo, tiendes a dar detalles específicos y concretos en lugar de metáforas o conceptos.", dimension: "SN", direction: "positive" },
  { id: 24, text: "Con frecuencia encuentro conexiones entre cosas aparentemente no relacionadas que otros no ven.",          dimension: "SN", direction: "negative" },
  { id: 25, text: "Cuando enfrento un problema, mi mente saltea rápidamente a múltiples posibles causas y soluciones.",      dimension: "SN", direction: "negative" },
  { id: 26, text: "Las tareas repetitivas me aburren rápido aunque las haga bien — busco variación o un ángulo nuevo.",      dimension: "SN", direction: "negative" },
  { id: 27, text: "A menudo pienso en cómo las situaciones actuales podrían evolucionar en el futuro antes que en lo inmediato.", dimension: "SN", direction: "negative" },
  { id: 28, text: "Cuando escucho una idea, instintivamente pienso en su potencial y sus implicaciones más que en sus limitaciones prácticas.", dimension: "SN", direction: "negative" },
  { id: 29, text: "Mis mejores ideas suelen aparecer de forma espontánea, no como resultado de un proceso deliberado.",       dimension: "SN", direction: "negative" },
  { id: 30, text: "Prefiero entender el principio detrás de algo que memorizar cómo aplicarlo paso a paso.",                 dimension: "SN", direction: "negative" },

  // ── T/F (Pensamiento / Sentimiento) ───────────────────────────
  { id: 31, text: "Cuando un amigo toma una mala decisión, le digo directamente lo que pienso aunque le incomode.",          dimension: "TF", direction: "positive" },
  { id: 32, text: "En un debate, lo que más me importa es llegar a la conclusión correcta, no cómo se sientan los demás.",   dimension: "TF", direction: "positive" },
  { id: 33, text: "Cuando alguien me cuenta un problema, mi primer impulso es buscar una solución, no expresar empatía.",    dimension: "TF", direction: "positive" },
  { id: 34, text: "Si tengo que elegir entre decir la verdad o proteger los sentimientos de alguien, elijo la verdad.",      dimension: "TF", direction: "positive" },
  { id: 35, text: "Al evaluar una idea, lo primero que analizo es su lógica y consistencia interna.",                        dimension: "TF", direction: "positive" },
  { id: 36, text: "Me resulta fácil tomar decisiones difíciles cuando los datos son claros, aunque afecten a personas.",     dimension: "TF", direction: "positive" },
  { id: 37, text: "Cuando alguien critica mi trabajo, prefiero que sea directo y sin suavizar, para poder mejorar.",         dimension: "TF", direction: "positive" },
  { id: 38, text: "En conflictos de grupo, mi prioridad es identificar quién tiene razón, no mediar para que todos estén bien.", dimension: "TF", direction: "positive" },
  { id: 39, text: "Cuando tomo una decisión importante, el factor que más pesa es cómo afectará a las personas involucradas.", dimension: "TF", direction: "negative" },
  { id: 40, text: "Si un conflicto con alguien cercano queda sin resolver, me cuesta concentrarme en otras cosas.",          dimension: "TF", direction: "negative" },
  { id: 41, text: "Cuando alguien está pasando por algo difícil, lo que más quiero hacer es que se sienta acompañado.",      dimension: "TF", direction: "negative" },
  { id: 42, text: "Suelo adaptar mi forma de comunicar algo según cómo creo que lo va a recibir la otra persona.",           dimension: "TF", direction: "negative" },
  { id: 43, text: "Me cuesta mucho actuar en contra de mis valores personales aunque la lógica lo justifique.",              dimension: "TF", direction: "negative" },
  { id: 44, text: "En una discusión, si noto que el otro está muy afectado emocionalmente, tiendo a suavizar mi posición.",  dimension: "TF", direction: "negative" },
  { id: 45, text: "La calidad de mis relaciones personales es más importante para mi bienestar que mis logros individuales.", dimension: "TF", direction: "negative" },

  // ── J/P (Juicio / Percepción) ─────────────────────────────────
  { id: 46, text: "Antes de un viaje, tengo el itinerario, alojamiento y actividades planificadas con anticipación.",        dimension: "JP", direction: "positive" },
  { id: 47, text: "Me incomoda dejar conversaciones o proyectos importantes sin una conclusión o próximo paso claro.",       dimension: "JP", direction: "positive" },
  { id: 48, text: "Cuando alguien cambia planes que ya habíamos acordado, me genera estrés aunque sea con tiempo de aviso.", dimension: "JP", direction: "positive" },
  { id: 49, text: "Tengo lugares fijos para mis cosas y me molesta no encontrar algo donde espero que esté.",                dimension: "JP", direction: "positive" },
  { id: 50, text: "Prefiero terminar una tarea completamente antes de empezar otra nueva.",                                  dimension: "JP", direction: "positive" },
  { id: 51, text: "Tener una agenda o lista de tareas pendientes me da tranquilidad, no me agobia.",                         dimension: "JP", direction: "positive" },
  { id: 52, text: "Para mí es importante llegar puntual — llegar tarde me genera ansiedad aunque sea poco tiempo.",          dimension: "JP", direction: "positive" },
  { id: 53, text: "Cuando tengo un plazo de entrega, empiezo con tiempo para no tener que apurarme al final.",               dimension: "JP", direction: "positive" },
  { id: 54, text: "Me resulta estimulante tener un plan del día completamente abierto y decidir sobre la marcha.",           dimension: "JP", direction: "negative" },
  { id: 55, text: "Cuando los planes cambian a último momento, generalmente me adapto con facilidad y sin estrés.",          dimension: "JP", direction: "negative" },
  { id: 56, text: "Rindo mejor cuando el plazo se acerca — la presión del tiempo me activa.",                                dimension: "JP", direction: "negative" },
  { id: 57, text: "Tengo varios proyectos o ideas en paralelo que voy avanzando según el estado de ánimo del momento.",     dimension: "JP", direction: "negative" },
  { id: 58, text: "Cuando tengo que tomar una decisión, prefiero esperar a tener más información aunque demore el proceso.", dimension: "JP", direction: "negative" },
  { id: 59, text: "Las rutinas fijas me generan aburrimiento — prefiero que cada día tenga algo distinto.",                  dimension: "JP", direction: "negative" },
  { id: 60, text: "Me siento cómodo empezando algo sin saber exactamente cómo va a terminar.",                               dimension: "JP", direction: "negative" },
];

export function seededShuffle(arr, seed = 42) {
  const a = [...arr]; let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function calculateResult(answers) {
  const sums   = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const counts = { EI: 0, SN: 0, TF: 0, JP: 0 };
  RAW_QUESTIONS.forEach(q => {
    const raw = answers[q.id];
    if (raw == null) return;
    sums[q.dimension]   += q.direction === "positive" ? raw : 8 - raw;
    counts[q.dimension] += 1;
  });

  const avgs = {};
  for (const dim of Object.keys(sums)) {
    avgs[dim] = counts[dim] > 0 ? sums[dim] / counts[dim] : 4;
  }

  const type = [
    avgs.EI > 4 ? "E" : "I",
    avgs.SN > 4 ? "S" : "N",
    avgs.TF > 4 ? "T" : "F",
    avgs.JP > 4 ? "J" : "P",
  ].join("");

  // Compute display percentages
  const display = {
    EI: { letter: avgs.EI > 4 ? "E" : "I", pct: Math.round(Math.abs(avgs.EI - 4) / 3 * 100 * 0.45 + 55) },
    SN: { letter: avgs.SN > 4 ? "S" : "N", pct: Math.round(Math.abs(avgs.SN - 4) / 3 * 100 * 0.45 + 55) },
    TF: { letter: avgs.TF > 4 ? "T" : "F", pct: Math.round(Math.abs(avgs.TF - 4) / 3 * 100 * 0.45 + 55) },
    JP: { letter: avgs.JP > 4 ? "J" : "P", pct: Math.round(Math.abs(avgs.JP - 4) / 3 * 100 * 0.45 + 55) },
  };

  return { type, display };
}
