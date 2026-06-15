// ─────────────────────────────────────────────────────────────
// TEST ADAPTATIVO V3 — FORCED-CHOICE CONDUCTUAL
// Formato: elegir A o B (ipsativo — elimina aquiescencia y sesgo social)
// 3 fases: Universal (12q) → Adaptativa (12q) → Confirmación (6q)
// Total visible: ~30 preguntas vs 60-80 del v1/v2
// ─────────────────────────────────────────────────────────────

// Stacks de funciones cognitivas por tipo
export const TYPE_STACKS = {
  INTJ: ['Ni','Te','Fi','Se'],  INFJ: ['Ni','Fe','Ti','Se'],
  ENTJ: ['Te','Ni','Se','Fi'],  ENFJ: ['Fe','Ni','Se','Ti'],
  INTP: ['Ti','Ne','Si','Fe'],  INFP: ['Fi','Ne','Si','Te'],
  ENTP: ['Ne','Ti','Fe','Si'],  ENFP: ['Ne','Fi','Te','Si'],
  ISTJ: ['Si','Te','Fi','Ne'],  ISFJ: ['Si','Fe','Ti','Ne'],
  ESTJ: ['Te','Si','Ne','Fi'],  ESFJ: ['Fe','Si','Ne','Ti'],
  ISTP: ['Ti','Se','Ni','Fe'],  ISFP: ['Fi','Se','Ni','Te'],
  ESTP: ['Se','Ti','Fe','Ni'],  ESFP: ['Se','Fi','Te','Ni'],
};

const STACK_WEIGHTS = [4, 3, 2, 1];

// ─────────────────────────────────────────────────────────────
// FASE 1 — 12 preguntas universales (todos los usuarios)
// Cada pregunta enfrenta dos funciones opuestas con igual
// deseabilidad social — elimina el sesgo de aquiescencia
// ─────────────────────────────────────────────────────────────
export const PHASE1_QUESTIONS = [
  {
    id: 'p1_01',
    text: 'Cuando se te ocurre una idea importante o surge una perspectiva nueva en tu mente...',
    optionA: {
      text: 'La dejas reposar — necesita tiempo para madurar internamente antes de que puedas articularla bien',
      fns: { Ni: 3 }
    },
    optionB: {
      text: 'La exploras de inmediato — la compartes, la discutes, la conectas con otras ideas para ver hasta dónde llega',
      fns: { Ne: 3 }
    }
  },
  {
    id: 'p1_02',
    text: 'En tu tiempo libre, lo que más disfrutas naturalmente es...',
    optionA: {
      text: 'Algo que sabes que funciona para ti — un lugar favorito, una actividad conocida, algo probado y confiable',
      fns: { Si: 3 }
    },
    optionB: {
      text: 'Buscar experiencias sensoriales nuevas o intensas — moverte, explorar, sentir algo concreto en el momento',
      fns: { Se: 3 }
    }
  },
  {
    id: 'p1_03',
    text: 'Cuando alguien cercano está claramente mal pero no lo dice...',
    optionA: {
      text: 'Tu instinto es actuar — crear el ambiente adecuado, decir algo, asegurarte de que se sienta acompañado',
      fns: { Fe: 3 }
    },
    optionB: {
      text: 'Tu instinto es respetar su espacio — lo sientes internamente, pero esperas a que él/ella decida abrirse',
      fns: { Fi: 3 }
    }
  },
  {
    id: 'p1_04',
    text: 'Cuando tienes que resolver un problema complejo o tomar una decisión difícil...',
    optionA: {
      text: 'Necesitas entenderlo completamente — buscas el porqué, la lógica interna, el proceso de comprensión importa',
      fns: { Ti: 3 }
    },
    optionB: {
      text: 'Buscas el camino más eficiente al resultado — qué funciona, cuál es el plan de acción, menos el porqué teórico',
      fns: { Te: 3 }
    }
  },
  {
    id: 'p1_05',
    text: 'Después de pasar un fin de semana completamente solo en casa sin ningún compromiso social...',
    optionA: {
      text: 'Te sientes recargado y listo — eso era exactamente lo que necesitabas para recuperarte',
      fns: { Ni: 1, Fi: 1, Ti: 1, Si: 1 }
    },
    optionB: {
      text: 'Te sientes un poco inquieto o desconectado — necesitabas más contacto con personas o el mundo exterior',
      fns: { Ne: 1, Fe: 1, Te: 1, Se: 1 }
    }
  },
  {
    id: 'p1_06',
    text: 'Cuando tienes múltiples cosas importantes por hacer esta semana...',
    optionA: {
      text: 'Necesitas saber qué día y a qué hora vas a hacer cada cosa — sin ese plan la semana se siente caótica',
      fns: { Te: 1, Fe: 1, Ni: 1, Si: 1 }
    },
    optionB: {
      text: 'Prefieres dejar la semana abierta y decidir según el flujo del momento — los planes rígidos te generan presión',
      fns: { Ne: 1, Fi: 1, Ti: 1, Se: 1 }
    }
  },
  {
    id: 'p1_07',
    text: 'En una conversación o reunión importante, tu atención va principalmente hacia...',
    optionA: {
      text: 'El patrón o significado más profundo — hacia dónde va esto realmente, qué implica, qué no se está diciendo',
      fns: { Ni: 3 }
    },
    optionB: {
      text: 'El estado emocional del grupo — quién está cómodo, quién no, qué necesita el ambiente para fluir bien',
      fns: { Fe: 3 }
    }
  },
  {
    id: 'p1_08',
    text: 'Cuando empiezas un proyecto nuevo, lo primero que haces es...',
    optionA: {
      text: 'Explorar posibilidades — generar ideas, investigar ángulos distintos, ver qué enfoques existen antes de comprometerte',
      fns: { Ne: 3 }
    },
    optionB: {
      text: 'Revisar qué funcionó antes — qué recursos existen, cómo se ha hecho, basarte en experiencia probada',
      fns: { Si: 3 }
    }
  },
  {
    id: 'p1_09',
    text: 'Cuando alguien defiende algo que va en contra de tus principios pero su argumento lógico es sólido...',
    optionA: {
      text: 'La lógica no alcanza — si viola algo que sientes fundamental en ti, simplemente no puedes aceptarlo así',
      fns: { Fi: 3 }
    },
    optionB: {
      text: 'Si el argumento es sólido, lo reconoces como válido aunque contradiga lo que creías — la lógica tiene precedencia',
      fns: { Ti: 3 }
    }
  },
  {
    id: 'p1_10',
    text: '¿Dónde vive principalmente tu atención de forma natural, sin esfuerzo?',
    optionA: {
      text: 'En el momento presente — el entorno físico, las personas delante de ti, los estímulos inmediatos del ambiente',
      fns: { Se: 3 }
    },
    optionB: {
      text: 'En el patrón más profundo — el significado de lo que está pasando, hacia dónde lleva, las implicaciones futuras',
      fns: { Ni: 3 }
    }
  },
  {
    id: 'p1_11',
    text: 'Cuando eres responsable de una decisión que afecta a un grupo de personas...',
    optionA: {
      text: 'Priorizas la mejor decisión posible — si es la correcta, las incomodidades temporales son el precio aceptable',
      fns: { Te: 3 }
    },
    optionB: {
      text: 'Priorizas que el proceso sea justo y que todos se sientan bien — el cómo importa tanto como el qué',
      fns: { Fe: 3 }
    }
  },
  {
    id: 'p1_12',
    text: 'Cuando te enfrentas a una situación nueva o un problema sin solución obvia...',
    optionA: {
      text: 'Tu mente genera automáticamente múltiples posibilidades y alternativas — a veces demasiadas a la vez',
      fns: { Ne: 3 }
    },
    optionB: {
      text: 'Buscas en tu experiencia o la de otros — ¿ya se resolvió algo similar? ¿qué funcionó antes en contextos parecidos?',
      fns: { Si: 3 }
    }
  },
];

// ─────────────────────────────────────────────────────────────
// FASE 2 — Pools discriminantes por par de funciones
// Se seleccionan según los resultados de la Fase 1
// ─────────────────────────────────────────────────────────────
export const PHASE2_POOLS = {

  // Ni vs Ne — intuición convergente vs divergente
  // Discrimina: NJ types (INFJ/INTJ/ENFJ/ENTJ)  vs  NP types (INFP/INTP/ENFP/ENTP)
  NI_NE: [
    {
      id: 'p2_nine_01',
      text: 'En tu forma de pensar, ¿con qué te identificas más?',
      optionA: {
        text: 'Llegas a conclusiones con certeza — una vez que procesaste algo profundamente, tienes una posición difícil de mover',
        fns: { Ni: 3 }
      },
      optionB: {
        text: 'Siempre encuentras más ángulos por explorar — las conclusiones definitivas te parecen prematuras casi siempre',
        fns: { Ne: 3 }
      }
    },
    {
      id: 'p2_nine_02',
      text: 'Cuando tienes que tomar una decisión importante de vida...',
      optionA: {
        text: 'Confías en tu intuición interna — a veces no puedes explicar exactamente por qué, pero sabes cuál es la respuesta',
        fns: { Ni: 3 }
      },
      optionB: {
        text: 'Exploras varias opciones primero — necesitas ver las posibilidades antes de poder comprometerte con una',
        fns: { Ne: 3 }
      }
    },
    {
      id: 'p2_nine_03',
      text: 'En un proyecto creativo o intelectual, ¿qué fase disfrutas más?',
      optionA: {
        text: 'La fase de refinamiento — cuando vas dando forma precisa a una visión que ya tienes clara internamente',
        fns: { Ni: 3 }
      },
      optionB: {
        text: 'La fase de exploración abierta — cuando todo es posible y no hay que comprometerse aún con nada',
        fns: { Ne: 3 }
      }
    },
    {
      id: 'p2_nine_04',
      text: 'Respecto a tu futuro...',
      optionA: {
        text: 'Sueles tener una visión muy clara de hacia dónde quieres ir — una dirección específica que sientes internamente',
        fns: { Ni: 3 }
      },
      optionB: {
        text: 'Ves múltiples futuros posibles y atractivos — comprometerte con uno solo a veces se siente como cerrar puertas',
        fns: { Ne: 3 }
      }
    },
    {
      id: 'p2_nine_05',
      text: 'Cuando alguien te comparte un problema...',
      optionA: {
        text: 'Tu mente busca el patrón subyacente o causa raíz — el significado más profundo detrás de la situación',
        fns: { Ni: 3 }
      },
      optionB: {
        text: 'Tu mente genera múltiples ángulos y posibles soluciones — ves conexiones que la persona no había considerado',
        fns: { Ne: 3 }
      }
    },
  ],

  // Fi vs Fe — valores internos vs armonía externa
  // Discrimina: FP/FJ types
  FI_FE: [
    {
      id: 'p2_fife_01',
      text: 'Cuando tienes que dar feedback negativo a alguien que quieres...',
      optionA: {
        text: 'Lo dices con cuidado pero lo dices — la autenticidad importa más que evitar la incomodidad temporal',
        fns: { Fi: 3 }
      },
      optionB: {
        text: 'Buscas la forma de decirlo que genere el menor daño posible — su bienestar emocional es tu primera consideración',
        fns: { Fe: 3 }
      }
    },
    {
      id: 'p2_fife_02',
      text: 'En un grupo de personas, lo que más naturalmente haces es...',
      optionA: {
        text: 'Notar quién está incómodo o desconectado y actuar para que el grupo funcione mejor emocionalmente',
        fns: { Fe: 3 }
      },
      optionB: {
        text: 'Mantener tu mundo interior — participas a tu manera, pero tu centro está en ti mismo, no en el estado del grupo',
        fns: { Fi: 3 }
      }
    },
    {
      id: 'p2_fife_03',
      text: 'Cuando algo viola profundamente tus valores...',
      optionA: {
        text: 'Internamente se activa algo muy fuerte — pero raramente lo expresas de inmediato a menos que sea muy necesario',
        fns: { Fi: 3 }
      },
      optionB: {
        text: 'Quieres que la dinámica se restaure — intentas que la persona entienda el impacto que tuvo en los demás',
        fns: { Fe: 3 }
      }
    },
    {
      id: 'p2_fife_04',
      text: 'Cuando conoces a alguien nuevo, tu atención va hacia...',
      optionA: {
        text: 'Si hay resonancia real — si comparten algo esencial a nivel de valores o visión del mundo',
        fns: { Fi: 3 }
      },
      optionB: {
        text: 'Cómo se siente esa persona y cómo puedes hacer que se sienta cómoda y bienvenida',
        fns: { Fe: 3 }
      }
    },
    {
      id: 'p2_fife_05',
      text: 'En una conversación donde alguien expresa algo que consideras muy incorrecto...',
      optionA: {
        text: 'Sientes internamente un rechazo claro, pero no siempre lo expresas — tu mundo interior es tuyo',
        fns: { Fi: 3 }
      },
      optionB: {
        text: 'Buscas la forma de manejar el momento sin que nadie salga mal — la armonía del intercambio importa',
        fns: { Fe: 3 }
      }
    },
  ],

  // Ti vs Te — lógica interna vs eficiencia externa
  // Discrimina: TP/TJ types
  TI_TE: [
    {
      id: 'p2_tite_01',
      text: 'Cuando tienes que aprender algo nuevo para un proyecto...',
      optionA: {
        text: 'Quieres entenderlo completamente — no te basta con saber que funciona, necesitas saber por qué funciona',
        fns: { Ti: 3 }
      },
      optionB: {
        text: 'Aprendes lo necesario para aplicarlo — el objetivo final importa más que el nivel de comprensión teórica',
        fns: { Te: 3 }
      }
    },
    {
      id: 'p2_tite_02',
      text: 'Cuando alguien no sigue el método o plan acordado...',
      optionA: {
        text: 'Depende — si tienen una razón lógicamente válida para cambiarlo, lo entiendes sin fricción',
        fns: { Ti: 3 }
      },
      optionB: {
        text: 'Te genera fricción real — el plan existe por razones y cambiarlo sin causa clara es un problema',
        fns: { Te: 3 }
      }
    },
    {
      id: 'p2_tite_03',
      text: 'En una discusión sobre cómo resolver algo complejo...',
      optionA: {
        text: 'Priorizas que la solución sea lógicamente sólida — que no haya fallas en el razonamiento',
        fns: { Ti: 3 }
      },
      optionB: {
        text: 'Priorizas que se tome una decisión y se implemente — la parálisis por análisis es peor que una solución imperfecta',
        fns: { Te: 3 }
      }
    },
    {
      id: 'p2_tite_04',
      text: 'Cuando estás trabajando en algo, lo que más disfrutas es...',
      optionA: {
        text: 'El proceso de análisis y comprensión en sí — resolver el rompecabezas intelectual tiene valor propio',
        fns: { Ti: 3 }
      },
      optionB: {
        text: 'El progreso tangible — ver que las cosas avanzan, se completan, producen resultados concretos',
        fns: { Te: 3 }
      }
    },
    {
      id: 'p2_tite_05',
      text: 'Ante un sistema o proceso que claramente no es óptimo...',
      optionA: {
        text: 'Lo que más te molesta es que no sea la solución lógicamente correcta — hay un problema de coherencia',
        fns: { Ti: 3 }
      },
      optionB: {
        text: 'Lo que más te molesta es el tiempo y recursos que se pierden — hay un problema de eficiencia',
        fns: { Te: 3 }
      }
    },
  ],

  // Si vs Se — sensación pasada/interna vs presente/externa
  // Discrimina: SJ types (ISTJ/ISFJ/ESTJ/ESFJ)  vs  SP types (ISTP/ISFP/ESTP/ESFP)
  SI_SE: [
    {
      id: 'p2_sise_01',
      text: 'Tu relación con el entorno físico y tu cuerpo es principalmente...',
      optionA: {
        text: 'Funcional y confiable — tienes rutinas establecidas, confías en lo que conoces y sabes que funciona',
        fns: { Si: 3 }
      },
      optionB: {
        text: 'Inmediata y reactiva — estás muy en sintonía con lo que pasa físicamente ahora, con los estímulos presentes',
        fns: { Se: 3 }
      }
    },
    {
      id: 'p2_sise_02',
      text: 'Ante una experiencia física nueva que nunca has hecho...',
      optionA: {
        text: 'Prefieres tener algo de referencia o preparación — saber qué esperar antes de entrar',
        fns: { Si: 3 }
      },
      optionB: {
        text: 'Probablemente saltas — la novedad y la acción directa te energizan más que la preparación previa',
        fns: { Se: 3 }
      }
    },
    {
      id: 'p2_sise_03',
      text: 'En una situación de presión o emergencia, tu respuesta más natural es...',
      optionA: {
        text: 'Apoyarte en lo que ya sabes que funciona — recurres a procedimientos establecidos y experiencia acumulada',
        fns: { Si: 3 }
      },
      optionB: {
        text: 'Actuar en el momento — tu cuerpo y mente responden directamente a lo que está pasando ahora mismo',
        fns: { Se: 3 }
      }
    },
    {
      id: 'p2_sise_04',
      text: 'Para ti, el confort viene principalmente de...',
      optionA: {
        text: 'Lo familiar y probado — saber qué esperar, tener rutinas sólidas, cosas que ya funcionan para ti',
        fns: { Si: 3 }
      },
      optionB: {
        text: 'La estimulación y el movimiento — el aburrimiento o la inercia te incomoda más que lo desconocido',
        fns: { Se: 3 }
      }
    },
    {
      id: 'p2_sise_05',
      text: 'Cuando aprendes una habilidad nueva, tu forma preferida es...',
      optionA: {
        text: 'Entender primero el contexto — revisar instrucciones, aprender cómo otros lo hacen, tener una base antes de empezar',
        fns: { Si: 3 }
      },
      optionB: {
        text: 'Saltar directamente y aprender haciendo — la experiencia práctica inmediata te enseña más que cualquier instrucción',
        fns: { Se: 3 }
      }
    },
  ],

  // Orientación E/I cuando el resultado es ambiguo
  EI: [
    {
      id: 'p2_ei_01',
      text: 'Cuando tienes un problema grande que resolver...',
      optionA: {
        text: 'Tu primer impulso es hablarlo con alguien — pensar en voz alta con otros te ayuda más que hacerlo solo',
        fns: { Ne: 1, Fe: 1, Te: 1, Se: 1 }
      },
      optionB: {
        text: 'Tu primer impulso es retirarte y procesarlo internamente — necesitas espacio antes de poder hablar de ello',
        fns: { Ni: 1, Fi: 1, Ti: 1, Si: 1 }
      }
    },
    {
      id: 'p2_ei_02',
      text: 'Las interacciones sociales, aunque las disfrutes, generalmente...',
      optionA: {
        text: 'Te cargan — cuantas más conexiones significativas en un día, mejor te sientes al final',
        fns: { Ne: 2, Fe: 2, Se: 2 }
      },
      optionB: {
        text: 'Te drenan — necesitas tiempo solo para recuperar tu energía, incluso después de socializar bien',
        fns: { Ni: 2, Fi: 2, Ti: 2 }
      }
    },
    {
      id: 'p2_ei_03',
      text: 'En un contexto social nuevo con personas que no conoces...',
      optionA: {
        text: 'Tiendes a hacer contacto con facilidad — lo social fluye y tomas iniciativa naturalmente',
        fns: { Fe: 2, Ne: 2, Se: 2 }
      },
      optionB: {
        text: 'Tu patrón es observar primero, calibrar el ambiente, y luego decidir cómo y cuándo participar',
        fns: { Ni: 2, Fi: 2, Ti: 2, Si: 1 }
      }
    },
  ],

  // Orientación J/P cuando el resultado es ambiguo
  JP: [
    {
      id: 'p2_jp_01',
      text: 'Tu relación con los plazos y deadlines...',
      optionA: {
        text: 'Prefieres terminar las cosas antes del plazo — la presión de última hora te genera ansiedad innecesaria',
        fns: { Te: 2, Fe: 1, Ni: 1, Si: 2 }
      },
      optionB: {
        text: 'Rendes mejor cuando la fecha se acerca — la presión del tiempo activa algo en ti que es difícil activar antes',
        fns: { Ne: 2, Fi: 1, Ti: 2, Se: 1 }
      }
    },
    {
      id: 'p2_jp_02',
      text: 'Cuando tienes que tomar una decisión importante...',
      optionA: {
        text: 'Prefieres decidir pronto y seguir — la incertidumbre abierta te genera tensión aunque tengas buenas opciones',
        fns: { Te: 2, Ni: 2, Si: 1 }
      },
      optionB: {
        text: 'Prefieres dejar la decisión abierta el mayor tiempo posible — puede aparecer información nueva que cambie todo',
        fns: { Ne: 2, Ti: 2, Fi: 1 }
      }
    },
    {
      id: 'p2_jp_03',
      text: 'Tu día libre sin obligaciones externas es...',
      optionA: {
        text: 'Tiene cierta estructura incluso si informal — tienes una idea de cómo va a fluir y eso te da tranquilidad',
        fns: { Te: 2, Si: 2, Ni: 1 }
      },
      optionB: {
        text: 'Completamente abierto — decides según el momento y eso es exactamente lo que necesitas para sentirte libre',
        fns: { Ne: 2, Se: 1, Fi: 1, Ti: 1 }
      }
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// FASE 3 — 6 preguntas de estrés / función inferior
// Confirman el tipo por comportamiento bajo presión
// La función inferior es altamente diagnóstica del tipo dominante
// ─────────────────────────────────────────────────────────────
export const PHASE3_QUESTIONS = [
  {
    id: 'p3_01',
    text: 'Cuando estás bajo estrés intenso durante varios días, ¿qué reconoces en ti aunque no sea tu norma?',
    optionA: {
      text: 'Me vuelvo hipersensible a cómo me perciben los demás — busco más validación externa de lo habitual',
      fns: { Fe: -1 }  // Función inferior en INTP/ISTP → señala dominancia Ti
    },
    optionB: {
      text: 'Me obsesiono con detalles físicos que normalmente ignoro — el orden, mi cuerpo, el entorno inmediato',
      fns: { Se: -1 }  // Función inferior en INFJ/INTJ → señala dominancia Ni
    }
  },
  {
    id: 'p3_02',
    text: 'En tu peor versión bajo presión extrema, tiendes a...',
    optionA: {
      text: 'Volverme rígido y necesitar control total — cualquier desviación del plan me genera ansiedad real',
      fns: { Te: -1 }  // Función inferior en INFP/ISFP → señala dominancia Fi
    },
    optionB: {
      text: 'Caer en pensamientos negativos en espiral — el futuro parece oscuro y es difícil salir de esa inercia mental',
      fns: { Ne: -1 }  // Función inferior en ISTJ/ISFJ → señala dominancia Si
    }
  },
  {
    id: 'p3_03',
    text: 'Cuando el estrés te supera, lo que más te delata como "no siendo tú" es...',
    optionA: {
      text: 'Tomar decisiones impulsivas o buscar estimulación inmediata — hacer algo físico sin pensar en consecuencias',
      fns: { Se: -1 }  // Inferior Se de tipos Ni-dominantes
    },
    optionB: {
      text: 'Volverme muy crítico conmigo mismo con una lógica fría que normalmente no uso contra mí — análisis implacable',
      fns: { Ti: -1 }  // Inferior Ti de tipos Fe-dominantes
    }
  },
  {
    id: 'p3_04',
    text: 'Bajo presión extrema, lo que más sientes que pierdes es...',
    optionA: {
      text: 'Tu capacidad de ver posibilidades — la mente se estrecha y solo ves el problema inmediato, sin alternativas',
      fns: { Ne: -1, Ni: 1 }  // Confirma Ni dominante
    },
    optionB: {
      text: 'Tu claridad de quién eres — tus valores se difuminan y actúas de formas que después no reconoces como tuyas',
      fns: { Fi: -1, Te: 1 }  // Confirma Te dominante
    }
  },
  {
    id: 'p3_05',
    text: 'En un momento de crisis real, tu reacción más instintiva es...',
    optionA: {
      text: 'Buscar a alguien de confianza — necesitas procesar emocionalmente con alguien para poder volver a funcionar',
      fns: { Fe: 2, Ne: 1 }
    },
    optionB: {
      text: 'Retirarte completamente — necesitas silencio y espacio interno, las personas en ese momento te drenan',
      fns: { Ni: 2, Ti: 1, Fi: 1 }
    }
  },
  {
    id: 'p3_06',
    text: 'Cuando has tomado una mala decisión que afecta a otros, lo que más te pesa es...',
    optionA: {
      text: 'El impacto en las personas — el daño emocional y relacional que causaste en ellos',
      fns: { Fe: 2, Fi: 1 }
    },
    optionB: {
      text: 'El error de juicio en sí — fallaste en tu análisis o planificación, y ese es el peso que procesas',
      fns: { Ti: 2, Te: 1, Ni: 1 }
    }
  },
];

// ─────────────────────────────────────────────────────────────
// ADAPTIVE ENGINE
// ─────────────────────────────────────────────────────────────

// Computa scores de tipo a partir de scores de funciones
function computeTypeScores(fnScores) {
  const typeScores = {};
  for (const [type, stack] of Object.entries(TYPE_STACKS)) {
    let s = 0;
    stack.forEach((fn, i) => { s += (fnScores[fn] || 0) * STACK_WEIGHTS[i]; });
    typeScores[type] = s;
  }
  return typeScores;
}

// Selecciona preguntas de Fase 2 basándose en scores de Fase 1
export function selectPhase2Questions(fnScores, count = 12) {
  const fns = fnScores;

  // Calcular qué tan ambiguo (cercano) está cada par de funciones
  const niNeDiff = Math.abs((fns.Ni || 0) - (fns.Ne || 0));
  const fiFeDiff = Math.abs((fns.Fi || 0) - (fns.Fe || 0));
  const tiTeDiff = Math.abs((fns.Ti || 0) - (fns.Te || 0));
  const siSeDiff = Math.abs((fns.Si || 0) - (fns.Se || 0));

  const iTotal = (fns.Ni || 0) + (fns.Fi || 0) + (fns.Ti || 0) + (fns.Si || 0);
  const eTotal = (fns.Ne || 0) + (fns.Fe || 0) + (fns.Te || 0) + (fns.Se || 0);
  const eiDiff = Math.abs(iTotal - eTotal);

  const jTotal = (fns.Te || 0) + (fns.Fe || 0) + (fns.Ni || 0) + (fns.Si || 0);
  const pTotal = (fns.Ti || 0) + (fns.Fi || 0) + (fns.Ne || 0) + (fns.Se || 0);
  const jpDiff = Math.abs(jTotal - pTotal);

  // Ordenar por ambigüedad (menor diferencia = más preguntas de ese pool)
  const poolPriority = [
    { key: 'NI_NE', diff: niNeDiff },
    { key: 'FI_FE', diff: fiFeDiff },
    { key: 'TI_TE', diff: tiTeDiff },
    { key: 'SI_SE', diff: siSeDiff },
    { key: 'EI',   diff: eiDiff },
    { key: 'JP',   diff: jpDiff },
  ].sort((a, b) => a.diff - b.diff);

  const selected = [];
  const seen = new Set();

  // Tomar más preguntas de los pares más ambiguos
  const allocation = [3, 3, 2, 2, 1, 1]; // preguntas por pool en orden de prioridad

  for (let i = 0; i < poolPriority.length && selected.length < count; i++) {
    const { key } = poolPriority[i];
    const pool = PHASE2_POOLS[key];
    if (!pool) continue;
    const take = Math.min(allocation[i], pool.length, count - selected.length);
    for (let j = 0; j < take && j < pool.length; j++) {
      if (!seen.has(pool[j].id)) {
        selected.push(pool[j]);
        seen.add(pool[j].id);
      }
    }
  }

  return selected.slice(0, count);
}

// Acumula scores de funciones a partir de respuestas
// answers: array de { questionId: string, choice: 'A' | 'B' }
// questionBank: array de preguntas (del banco combinado de fases)
export function accumulateFnScores(answers, questionBank) {
  const scores = { Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0, Ti: 0, Te: 0 };
  for (const { questionId, choice } of answers) {
    const q = questionBank.find(q => q.id === questionId);
    if (!q) continue;
    const opts = choice === 'A' ? q.optionA.fns : q.optionB.fns;
    for (const [fn, val] of Object.entries(opts)) {
      if (scores[fn] !== undefined) scores[fn] += val;
    }
  }
  return scores;
}

// Función principal: deriva tipo + display + confianza a partir de fn scores
export function deriveTypeV3(fnScores) {
  const typeScores = computeTypeScores(fnScores);
  const sorted = Object.entries(typeScores).sort((a, b) => b[1] - a[1]);
  const bestType = sorted[0][0];

  // Calcular porcentajes por dimensión (compatibles con display de v1)
  const ni = fnScores.Ni || 0, ne = fnScores.Ne || 0;
  const si = fnScores.Si || 0, se = fnScores.Se || 0;
  const fi = fnScores.Fi || 0, fe = fnScores.Fe || 0;
  const ti = fnScores.Ti || 0, te = fnScores.Te || 0;

  // E/I — funciones introvertidas vs extrovertidas
  const iTotal = ni + si + fi + ti;
  const eTotal = ne + se + fe + te;
  const eiSum  = iTotal + eTotal;
  const isI = iTotal > eTotal;
  const eiPct = eiSum > 0 ? Math.min(97, Math.round((Math.max(iTotal, eTotal) / eiSum) * 100 * 0.38 + 62)) : 64;

  // N/S — intuición vs sensación
  const nTotal = ni + ne, sTotal = si + se;
  const nsSum = nTotal + sTotal;
  const isN = nTotal > sTotal;
  const snPct = nsSum > 0 ? Math.min(97, Math.round((Math.max(nTotal, sTotal) / nsSum) * 100 * 0.38 + 62)) : 64;

  // T/F — pensamiento vs sentimiento
  const tTotal = ti + te, fTotal = fi + fe;
  const tfSum = tTotal + fTotal;
  const isT = tTotal > fTotal;
  const tfPct = tfSum > 0 ? Math.min(97, Math.round((Math.max(tTotal, fTotal) / tfSum) * 100 * 0.38 + 62)) : 64;

  // J/P — funciones de juicio vs percepción como dominantes
  const jTotal = te + fe + ni + si;
  const pTotal = ti + fi + ne + se;
  const jpSum = jTotal + pTotal;
  const isJ = jTotal > pTotal;
  const jpPct = jpSum > 0 ? Math.min(97, Math.round((Math.max(jTotal, pTotal) / jpSum) * 100 * 0.38 + 62)) : 64;

  const display = {
    EI: { letter: isI ? 'I' : 'E', pct: eiPct },
    SN: { letter: isN ? 'N' : 'S', pct: snPct },
    TF: { letter: isT ? 'T' : 'F', pct: tfPct },
    JP: { letter: isJ ? 'J' : 'P', pct: jpPct },
  };

  // Score de confianza — distancia entre #1 y #2
  const topScore = sorted[0][1];
  const gap = topScore > 0 ? (sorted[0][1] - sorted[1][1]) / topScore : 0;
  const confidencePct = Math.min(95, Math.round(58 + gap * 120));
  const confidenceLevel = confidencePct >= 82 ? 'alta' : confidencePct >= 68 ? 'media' : 'baja';

  // Tipos alternativos más probables
  const alternates = sorted.slice(1, 3).map(([t]) => t);

  // Función dominante del tipo resultante
  const dominantFn = TYPE_STACKS[bestType]?.[0] || '';

  return {
    type: bestType,
    display,
    confidence: confidencePct,
    confidenceLevel,
    alternates,
    dominantFn,
    typeScores,
  };
}

// Genera texto descriptivo para milestone 1 basado en la función dominante
export function getMilestone1Text(fnScores) {
  const fns = [
    { fn: 'Ni', score: fnScores.Ni || 0 },
    { fn: 'Ne', score: fnScores.Ne || 0 },
    { fn: 'Si', score: fnScores.Si || 0 },
    { fn: 'Se', score: fnScores.Se || 0 },
    { fn: 'Fi', score: fnScores.Fi || 0 },
    { fn: 'Fe', score: fnScores.Fe || 0 },
    { fn: 'Ti', score: fnScores.Ti || 0 },
    { fn: 'Te', score: fnScores.Te || 0 },
  ].sort((a, b) => b.score - a.score);

  const topFn = fns[0].fn;
  const descriptions = {
    Ni: 'Tu mente tiende a converger — procesas en profundidad, buscas patrones y visiones a largo plazo',
    Ne: 'Tu mente tiende a expandirse — generas conexiones constantemente y ves posibilidades donde otros ven límites',
    Si: 'Tu mente ancla en la experiencia — confías en lo probado, tienes memoria sensorial rica y profunda',
    Se: 'Tu mente vive en el presente — percibes el entorno con intensidad y reaccionas con rapidez y precisión',
    Fi: 'Tu brújula es interna — tus valores son profundos, intensos y muy difíciles de negociar',
    Fe: 'Tu radar apunta hacia afuera — percibes el estado emocional del entorno y respondes a él de forma natural',
    Ti: 'Tu lógica es arquitectural — construyes sistemas internos propios para entender cómo funciona todo',
    Te: 'Tu lógica es instrumental — te enfocas en resultados, eficiencia y ejecución de forma natural',
  };
  return descriptions[topFn] || 'Tu perfil está tomando forma...';
}
