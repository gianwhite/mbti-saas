// ─────────────────────────────────────────────────────────────
// ANÁLISIS MBTI PREMIUM — 16 tipos
// Funciones cognitivas · Descripción extensa · Estilo de apego
// Lenguajes del amor · Fortalezas · Debilidades · Atracción · Compatibilidad
// ─────────────────────────────────────────────────────────────

export const TYPE_ANALYSIS = {

  // ════════════════════════════════════════════════════════════
  // ENFJ — El Protagonista
  // ════════════════════════════════════════════════════════════
  ENFJ: {
    funciones: {
      stack: "Fe → Ni → Se → Ti",
      dominante: {
        nombre: "Sentimiento Extrovertido", codigo: "Fe",
        descripcion: "El radar social más preciso del sistema MBTI. Procesa las emociones del entorno en tiempo real y gestiona activamente la atmósfera interpersonal. No es empatía pasiva — es liderazgo emocional activo. En segundos calibra quién está incómodo, qué tensión existe, y qué hace falta para mover al grupo. En relaciones: da emocionalmente con una generosidad que pocas personas olvidan. El riesgo: sin límites, se convierte en el gestor emocional de todos, agotando sus recursos y perdiendo su identidad en las necesidades ajenas."
      },
      auxiliar: {
        nombre: "Intuición Introvertida", codigo: "Ni",
        descripcion: "La visión de largo plazo que da propósito a la empatía. El Ni filtra el torrente de inputs sociales del Fe y le otorga dirección — el ENFJ no solo siente lo que la gente necesita ahora, ve adónde va esa persona y qué potencial tiene. Los convierte en mentores naturales con capacidad casi inquietante de prever dinámicas relacionales antes de que ocurran. En dating: sabe desde conversaciones tempranas si una persona merece inversión emocional real."
      },
      terciaria: {
        nombre: "Sensación Extrovertida", codigo: "Se",
        descripcion: "Presencia física y conciencia del momento presente. En posición terciaria está subdesarrollada, pero cuando se cultiva se convierte en carisma físico visible: lenguaje corporal natural, conciencia estética, y capacidad de estar completamente presente en momentos de conexión. Sin desarrollo: el ENFJ vive demasiado en el plano conceptual-emocional y pierde contacto con la dimensión física de las relaciones, donde gran parte de la atracción real opera."
      },
      inferior: {
        nombre: "Pensamiento Introvertido", codigo: "Ti",
        descripcion: "El mayor punto de vulnerabilidad y, desarrollado, el mayor activo de crecimiento. Bajo estrés alto, el ENFJ pierde la claridad lógica independiente — se vuelve hipercrítico consigo mismo o racionaliza decisiones emocionales con lógica distorsionada. El ENFJ desarrollado activa el Ti deliberadamente: toma distancia de sus propias emociones antes de actuar, mantiene posiciones que el Fe quisiera ceder, y sostiene criterio propio bajo presión social."
      },
      resumen: "El ENFJ opera desde inteligencia emocional activa (Fe) guiada por visión estratégica (Ni). Es el tipo más orientado hacia las personas con mayor capacidad de ver adónde van. Su crecimiento está en desarrollar presencia física (Se) y pensamiento independiente (Ti) para que su liderazgo no dependa de la validación externa."
    },
    descripcion: "El ENFJ es el arquitecto social por naturaleza — no porque lo intente, sino porque su cerebro está construido para leer, entender y mover personas. Opera desde una combinación de empatía activa (Fe) y visión de largo plazo (Ni) que produce un efecto único: hace que las personas se sientan completamente vistas en el presente mientras les muestra un futuro mejor que el que imaginaban para sí mismas. Eso es influencia real, aunque pocos lo nombren así.\n\nEl problema central del ENFJ es que invierte antes de verificar. Su Fe genera una generosidad emocional que no distingue entre quien lo merece y quien no — y eso crea patrones relacionales donde siempre es el que más pone. Con el tiempo acumula resentimiento que explota de formas que sorprenden a las personas a su alrededor, porque el ENFJ rara vez muestra su deterioro emocional en tiempo real. Hacia afuera todo parece bien hasta que ya no lo es.\n\nEn el plano relacional masculino, tiene una ventaja competitiva enorme y un punto ciego igual de grande. La ventaja: proyecta exactamente la combinación que las mujeres de alto valor buscan y rara vez encuentran — fuerza con calidez, dirección con empatía, presencia con profundidad. El punto ciego: la necesidad de validación lo lleva a sobre-invertir, a no establecer límites, y a confundir dar atención con generar atracción. El ENFJ que aprende a liderar con visión en lugar de con generosidad es imbatible.",
    social: {
      nivel: "Alto — arquitecto de contextos sociales",
      descripcion: "Entra a cualquier contexto y en minutos ha calibrado el estado emocional de cada persona presente. No trabaja en masa — trabaja en individuos dentro de la masa. Sabe instintivamente quién necesita ser incluido, quién necesita espacio, y qué hace falta decir para que la dinámica de grupo funcione. Esta habilidad lo convierte en un imán social natural — las personas quieren estar cerca porque con él se sienten importantes.",
      sabotaje: "Su mayor sabotaje es la necesidad de aprobación implícita. Cuando no recibe las señales de conexión que espera, reajusta su comportamiento hacia más generosidad, más atención, más apertura — exactamente lo contrario de lo que genera atracción. Se convierte en el hombre que más da en la relación, y eso destruye la polaridad."
    },
    apego: {
      estilo: "Ansioso",
      descripcion: "El ENFJ tiende al apego ansioso porque su función dominante (Fe) está cableada para buscar conexión y retroalimentación emocional constante. Cuando no la recibe, su sistema nervioso interpreta eso como señal de abandono potencial — aunque la situación objetiva no lo justifique. Da emocionalmente antes de que la otra persona lo merezca, creando deuda unilateral que genera resentimiento posterior.",
      en_pareja: "En relaciones íntimas, el ENFJ tiende a priorizar las necesidades de su pareja sobre las propias hasta el punto de perder contacto con lo que él mismo quiere. Se adapta tanto al otro que a veces ni él sabe ya quién es fuera de la relación. Necesita pareja que lo vea a él — no solo que reciba lo que él da.",
      trigger: "El silencio emocional o la indiferencia son sus mayores triggers. No necesita conflicto — le basta la ausencia de conexión para activar el modo ansioso. Interpreta la distancia como rechazo, incluso cuando la otra persona simplemente necesita espacio."
    },
    lenguajes: [
      { nombre: "Tiempo de Calidad", posicion: 1, descripcion: "La atención total sin distracciones es su lenguaje primario. No necesita regalos costosos ni grandes gestos — necesita que estés 100% presente. Una conversación de dos horas donde alguien realmente lo escucha vale más que cualquier demostración material." },
      { nombre: "Palabras de Afirmación", posicion: 2, descripcion: "Su Fe necesita saber explícitamente que lo que da importa. Un reconocimiento específico y genuino — no genérico — recarga su energía emocional de formas que pocas cosas pueden. La crítica sin contexto lo afecta desproporcionadamente." },
      { nombre: "Actos de Servicio", posicion: 3, descripcion: "Acciones concretas que demuestran que alguien pensó en él sin que tuviera que pedirlo. Que alguien resuelva algo antes de que él lo mencione le dice más que mil palabras." }
    ],
    fortalezas: [
      { titulo: "Liderazgo emocional genuino", desc: "No finge interés en las personas — lo tiene. Eso crea un tipo de influencia que no se puede imitar: las personas lo siguen porque sienten que él realmente se preocupa por adónde van." },
      { titulo: "Presencia dual única", desc: "Proyecta fuerza y calidez simultáneamente. Esta combinación es extraordinariamente rara en hombres y desarma las defensas femeninas de forma casi automática." },
      { titulo: "Visión de las personas", desc: "Ve el potencial de quien tiene enfrente antes de que esa persona lo vea en sí misma. Las personas se sienten expandidas cerca de él — como si pudieran ser más de lo que son." },
      { titulo: "Carisma estructural", desc: "No solo cae bien — lidera narrativas sociales. El grupo adopta su frame sin darse cuenta. Es el que define el tono de cualquier interacción en la que participa." },
      { titulo: "Comunicación de alta precisión", desc: "Sabe exactamente qué decir, cómo decirlo y cuándo callarse. Esta habilidad aplicada al dating crea conversaciones que las personas recuerdan semanas después." },
      { titulo: "Lealtad estratégica", desc: "Cuando se compromete con alguien, esa persona tiene un aliado real. No traiciona a quienes eligió. En un mundo de relaciones superficiales, eso vale desproporcionadamente." },
      { titulo: "Capacidad de inspirar acción", desc: "Tiene el don de movilizar personas hacia versiones mejores de sí mismas. En relaciones íntimas, esto se traduce en una pareja que hace crecer." }
    ],
    debilidades: [
      { titulo: "Sobre-inversión prematura", desc: "Pone sus mejores recursos emocionales en personas que aún no han demostrado merecerlos. Crea desequilibrio que eventualmente se convierte en resentimiento o desilusión." },
      { titulo: "Pérdida de identidad en relaciones", desc: "Se adapta tanto a lo que el otro necesita que con el tiempo pierde su propio frame. La pareja empieza a relacionarse con una versión del ENFJ construida para complacerla — no con él." },
      { titulo: "Evita el conflicto real", desc: "Gestiona la incomodidad relacional en lugar de resolverla directamente. Los problemas se acumulan hasta que la explosión es inevitable y proporcional a todo lo que no se dijo antes." },
      { titulo: "Necesita validación externa", desc: "Por debajo de su seguridad proyectada hay una dependencia real de que los demás confirmen que está bien. Cuando no la recibe, sobre-compensa con más generosidad — lo que paradójicamente reduce la atracción." },
      { titulo: "Idealiza a las personas", desc: "Su Ni ve potencial donde quizás solo hay intención. Construye versiones idealizadas de quienes le importan, y cuando la realidad no coincide, el desengaño es brusco y difícil de procesar." }
    ],
    atraccion: {
      tipo: "Autoridad social + profundidad emocional",
      descripcion: "Proyecta la combinación más buscada: un hombre que lidera y que siente. No es común. El ENFJ que entiende esto usa su Fe como palanca de atracción sin perder el frame de autoridad — escucha profundamente pero no desde la necesidad de agradar, sino desde posición de fuerza.",
      maximiza: [
        "Lidera con visión, no con validación. Propone, decide, ejecuta. Que ella entre a tu mundo — no construyas el tuyo alrededor del suyo.",
        "Sé selectivamente indisponible. Tu tiempo y atención tienen que ser escasos para ser valiosos. El hombre que siempre está disponible no genera tensión.",
        "Muestra tu lado oscuro: opiniones firmes, límites reales, cosas que no negocias. La profundidad sin bordes no genera atracción — genera admiración sin deseo.",
        "Termina las interacciones en su punto alto. El que corta primero controla el frame emocional de lo que sigue."
      ],
      errores: [
        "Ser el hombre perfecto sin polaridad — genera admiración y respeto, pero no el tipo de tensión que produce atracción real.",
        "Convertirse en su consejero o terapeuta antes de ser su amante. Escuchar todo sus problemas destruye la dinámica de atracción.",
        "Modificar su comportamiento según cómo ella reacciona. Cada ajuste basado en su aprobación señala inseguridad."
      ],
      estrategias: [
        "En conversación, haz preguntas que nadie más hace. No sobre logros o rutinas — sobre lo que realmente la mueve, la asusta, o la fascina. Esa profundidad sin agenda crea conexión que se diferencia de todo.",
        "Una vez por semana, decepciona deliberadamente en algo menor. Di que no a algo. Cambia el plan. Los límites reales generan respeto que la generosidad constante nunca puede construir.",
        "Desarrolla tu Se: ejercicio, ropa, lenguaje corporal, presencia física. Tu Fe y Ni son poderosos, pero sin ancla física el carisma queda en el plano emocional-conceptual."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "INFP", por_que: "El INFP necesita dirección, calidez estructurada y ser visto en su profundidad — exactamente lo que el ENFJ da de forma natural. El INFP aporta valores inamovibles y profundidad emocional genuina que nutre al ENFJ sin exigirle liderazgo social.", como_atraerla: "Sé auténtico antes que impresionante. El INFP detecta la performance al instante. Una verdad incómoda tuya vale más que diez momentos de conexión fluida." },
        { tipo: "ISFP", por_que: "Atracción física e intelectual simultánea. El ISFP valora la autenticidad sobre todo y la proyecta a través de su presencia física — exactamente el Se que el ENFJ necesita desarrollar. El ENFJ aporta la dirección y visión que el ISFP no se da a sí mismo.", como_atraerla: "Crea experiencias, no conversaciones. Su mundo es sensorial y presente. Llévala a lugares, propón actividades, muéstrate en lo que haces — no en lo que dices." },
        { tipo: "INTJ", por_que: "El INTJ respeta la inteligencia social del ENFJ y lo desafía intelectualmente sin la carga emocional del Fe. La tensión productiva entre el Fe del ENFJ y el Te del INTJ crea una dinámica de atracción sostenida a largo plazo.", como_atraerla: "Demuestra profundidad de pensamiento. El INTJ no se impresiona con carisma — se impresiona con ideas sólidas y autonomía real. Gánate su respeto intelectual primero." }
      ],
      evitar: { tipo: "ESTJ", razon: "Ambos quieren liderar el frame social pero desde bases opuestas: el ENFJ desde los valores y las personas, el ESTJ desde la estructura y los resultados. Genera luchas de poder disfrazadas de diferencias cotidianas y resentimiento mutuo por estilos de liderazgo incompatibles." }
    }
  },

  // ════════════════════════════════════════════════════════════
  // INFJ — El Consejero
  // ════════════════════════════════════════════════════════════
  INFJ: {
    funciones: {
      stack: "Ni → Fe → Ti → Se",
      dominante: {
        nombre: "Intuición Introvertida", codigo: "Ni",
        descripcion: "La función más misteriosa del sistema MBTI. Procesa información de forma no lineal, sintetizando patrones de múltiples fuentes hasta llegar a insights de largo plazo que parecen aparecer de la nada. El Ni dominante ve el fin desde el principio — no sigue pasos lógicos, salta a conclusiones que luego resultan correctas sin poder explicar el proceso. En relaciones: el INFJ sabe desde la primera conversación si una persona va a importarle a largo plazo. Esa certeza sin datos los hace selectivos y, para quien no entiende el proceso, fríos."
      },
      auxiliar: {
        nombre: "Sentimiento Extrovertido", codigo: "Fe",
        descripcion: "El Fe en posición auxiliar da al INFJ una empatía profunda y orientada — no reactiva, sino filtrada por la visión del Ni. No solo siente lo que sientes: entiende por qué lo sientes y qué significa eso para ti a largo plazo. Esta combinación crea el consejero natural — alguien que puede hacer que te sientas completamente visto en 10 minutos de conversación. El riesgo: absorbe las emociones ajenas como esponja hasta agotarse sin que nadie lo note."
      },
      terciaria: {
        nombre: "Pensamiento Introvertido", codigo: "Ti",
        descripcion: "El Ti terciario le da al INFJ un sistema de análisis interno preciso que actúa como búfer entre su empatía y el mundo exterior. Permite mantener creencias y marcos lógicos propios con independencia de la presión social. Subdesarrollado: se convierte en crítica interna excesiva o en rigidez intelectual disfrazada de principio. Desarrollado: le da la capacidad de pensar con claridad cuando sus emociones están al máximo — su mayor herramienta en crisis."
      },
      inferior: {
        nombre: "Sensación Extrovertida", codigo: "Se",
        descripcion: "El Se inferior es el punto de mayor vulnerabilidad del INFJ. Vive tan en el mundo interno (Ni) y en las necesidades ajenas (Fe) que el momento presente físico puede escapársele completamente. Bajo estrés extremo: puede ir al otro extremo y buscar gratificación sensorial inmediata de formas que van contra sus valores (comida, compras, impulsividad). Desarrollado: crea una presencia física y sensorialidad que complementa su profundidad intelectual de forma irresistible."
      },
      resumen: "El INFJ opera desde una visión profunda y privada del mundo (Ni) que expresa a través de conexión emocional activa (Fe). Es el tipo con mayor profundidad simultánea en ambas dimensiones — intelectual y emocional. Su trabajo es desarrollar presencia física (Se) para que esa profundidad sea accesible, no solo sentida por quienes ya lo conocen bien."
    },
    descripcion: "El INFJ es el tipo más infrecuente del sistema MBTI por una razón estructural: su combinación de Ni dominante y Fe auxiliar produce un perfil que opera en una frecuencia que pocas personas sintonizarán. Ve el mundo en patrones de largo plazo que los demás no pueden percibir aún, y al mismo tiempo siente con una profundidad emocional que la mayoría reserva solo para sus relaciones más íntimas. El resultado es alguien que puede hacer sentir a un extraño completamente comprendido en una primera conversación — y que al mismo tiempo lleva la mayor parte de su mundo interior completamente en privado.\n\nSu mayor contradicción es esta: quiere conexión profunda más que cualquier otra cosa, pero protege su mundo interior con una selectividad que hace que esa conexión sea extremadamente difícil de alcanzar. El 'door slam' — el cierre total de una persona o relación cuando siente que la confianza fue violada — es la expresión más extrema de este patrón. No es frialdad: es autoprotección de alguien que siente demasiado para permitirse otra traición.\n\nEn el contexto relacional masculino, el INFJ tiene un activo extraordinario y rarísimo: misterio genuino. No lo construye — existe por arquitectura cognitiva. Las personas quieren entenderlo y no pueden del todo, lo que sostiene el interés de forma orgánica. El trabajo del INFJ es aprender a expresar su mundo interior con confianza, a establecer límites desde la claridad en lugar del silencio, y a no convertirse en el consejero de su pareja en lugar del hombre que ella desea.",
    social: {
      nivel: "Medio en grupos / Muy alto en uno a uno",
      descripcion: "En grupos grandes parece reservado — está observando, calibrando, y procesando antes de decidir si vale la pena participar. En una conversación individual con alguien que considera genuino, despliega una profundidad y una capacidad de conexión que sorprende a quien no lo esperaba. Hace que su interlocutor se sienta la persona más comprendida del mundo — una experiencia que pocas personas olvidan.",
      sabotaje: "Se cierra completamente cuando se siente malentendido o traicionado. El door slam corta relaciones que podrían salvarse y deja a las otras personas sin posibilidad de reparar. También tiende a absorber el estado emocional de su entorno como esponja, llegando al agotamiento sin señales externas visibles."
    },
    apego: {
      estilo: "Temeroso-Evitativo",
      descripcion: "El INFJ quiere conexión profunda más que casi cualquier otra cosa — y al mismo tiempo la teme. Su Ni ha aprendido a anticipar el dolor del abandono o la traición antes de que ocurra, lo que genera un patrón donde se aproxima y se aleja de la intimidad de forma alternada. No es incoherencia — es autoprotección de alguien que siente las pérdidas con una intensidad desproporcionada.",
      en_pareja: "En relaciones íntimas, el INFJ tiende a dar enormemente — pero con una parte de sí mismo siempre guardada en reserva. Necesita pareja que demuestre con el tiempo que puede ser confiable para ese nivel de apertura. La confianza del INFJ no se da — se gana de forma acumulativa, y se pierde de forma definitiva.",
      trigger: "La sensación de ser mal entendido, usado como recurso emocional, o de que su profundidad no es valorada activa el cierre defensivo. El INFJ puede estar perfectamente bien emocionalmente y aparecer distante simplemente porque necesita tiempo de recarga en soledad — lo que puede confundirse con distanciamiento relacional."
    },
    lenguajes: [
      { nombre: "Tiempo de Calidad", posicion: 1, descripcion: "Conversaciones reales, sin teléfonos, sin agenda. El INFJ necesita saber que la persona frente a él está genuinamente presente e interesada. La atención dividida es un insulto silencioso para su sistema." },
      { nombre: "Palabras de Afirmación", posicion: 2, descripcion: "No genéricas — específicas y genuinas. El INFJ detecta el cumplido vacío de inmediato. Lo que necesita es que alguien articule que lo ve: no sus logros, sino quien es realmente." },
      { nombre: "Contacto Físico", posicion: 3, descripcion: "Con el Se en posición inferior, el contacto físico tiene una función de anclaje al presente que el INFJ necesita más de lo que reconoce. El tacto apropiado, en el momento correcto, lo conecta al presente físico y alivia la tensión de vivir tan internamente." }
    ],
    fortalezas: [
      { titulo: "Misterio genuino", desc: "No lo construye — existe. Las personas quieren entenderlo y no pueden del todo, lo que sostiene el interés de forma orgánica sin ningún esfuerzo consciente." },
      { titulo: "Comprensión sin igual", desc: "Hace sentir a su interlocutor que por fin alguien lo entiende de verdad. Esta experiencia es rara e impactante — crea vínculos de lealtad que duran años." },
      { titulo: "Profundidad dual", desc: "Opera en lo emocional y lo intelectual simultáneamente. Pocos tipos pueden seguirle el ritmo en ambas dimensiones a la vez." },
      { titulo: "Visión de largo plazo en personas", desc: "Ve el potencial de quien tiene enfrente antes de que esa persona lo vea en sí misma. Esta capacidad lo convierte en el catalizador de cambio más poderoso en la vida de quienes se lo permiten." },
      { titulo: "Estándares inamovibles", desc: "Sabe exactamente qué quiere con una claridad que no depende de la presión externa. No cede en lo fundamental. Eso genera la clase de confianza que toma años construir." },
      { titulo: "Intensidad controlada", desc: "Siente con profundidad pero proyecta calma. Esta tensión entre la intensidad interna y la serenidad exterior crea un campo de atracción difícil de articular pero imposible de ignorar." },
      { titulo: "Lealtad sin precedentes", desc: "Cuando elige a alguien, esa elección es genuina y duradera. No hay transaccionalidad en sus relaciones — da desde convicción, no desde intercambio." }
    ],
    debilidades: [
      { titulo: "Absorción emocional", desc: "Toma los estados emocionales de los demás como propios sin un proceso de separación consciente. Se agota en relaciones con personas de alta intensidad emocional sin que nadie — incluido él — lo note hasta que es demasiado tarde." },
      { titulo: "El door slam", desc: "Cierra personas de su vida de forma definitiva cuando la confianza fue violada. Esto protege su energía pero elimina relaciones que podrían haberse reparado con una conversación directa." },
      { titulo: "Idealización destructiva", desc: "Construye versiones de las personas en su mente que no siempre coinciden con la realidad. El desengaño cuando la persona real no coincide con la versión Ni-proyectada es brusco y difícil de procesar." },
      { titulo: "Evita el conflicto directo", desc: "Gestiona la incomodidad relacional de forma indirecta — una mirada, un cambio de tono, un alejamiento sutil — en lugar de confrontar directamente. Los problemas crecen sin resolución." },
      { titulo: "Baja tolerancia a la superficialidad", desc: "Puede descartar relaciones o contextos valiosos simplemente porque no aguanta la fase inicial de construcción de confianza, que inevitablemente tiene momentos de intercambio superficial." }
    ],
    atraccion: {
      tipo: "Misterio + profundidad + comprensión única",
      descripcion: "El INFJ genera una atracción que no se puede imitar: la sensación de ser realmente visto y entendido. Esto es adictivo. Las mujeres que lo experimentan lo buscan sin poder articular bien por qué. El reto es no convertirse en el confidente de todos y perder la polaridad que genera deseo.",
      maximiza: [
        "Articula tu visión del mundo con confianza y sin pedir validación. La profundidad expresada desde certeza es magnética. La profundidad expresada desde duda busca aprobación.",
        "Muestra que tienes estándares inamovibles — no todo el mundo entra a tu mundo. La selectividad real, no performada, genera una atracción de alta calidad.",
        "Deja que su curiosidad trabaje. No lo expliques todo en la primera conversación. El misterio se sostiene con un mundo propio activo que no depende de la relación."
      ],
      errores: [
        "Esperar que la otra persona entienda su mundo interior sin hacer el trabajo de comunicarlo. El misterio sin apertura eventual genera distancia, no atracción.",
        "Convertirse en el consejero emocional en lugar del hombre que desean. Escuchar todo es el camino más rápido hacia la zona de amigos.",
        "Absorber los problemas emocionales de su pareja hasta perder su propio espacio y energía."
      ],
      estrategias: [
        "Practica expresar tus perspectivas antes de validar las de los demás. El INFJ que lidera la conversación en lugar de facilitarla genera más atracción que el que siempre sabe escuchar.",
        "Establece límites claros y tempranos, antes de necesitarlos. La profundidad sin límites es codependencia, no intimidad.",
        "Desarrolla tu Se conscientemente: ejercicio intenso, actividades físicas concretas, presencia sensorial. El INFJ con presencia física desarrollada es completamente diferente al que vive solo en su cabeza."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ENTP", por_que: "El ENTP genera el estímulo intelectual que el INFJ necesita para salir de su cabeza y ver el mundo desde ángulos que su Ni no considera. El INFJ aporta la profundidad emocional y la visión de largo plazo que el ENTP evita darse a sí mismo.", como_atraerla: "Muéstrate real, no brillante. El INFJ detecta la performance al instante. Una verdad incómoda sobre ti vale más que diez ideas interesantes." },
        { tipo: "ENFP", por_que: "Comparten profundidad de valores (NF) y visión de las personas. El ENFP aporta la energía, la ligereza y la conexión con el presente que el INFJ necesita para no quedarse encerrado en su mundo interno.", como_atraerla: "Sé presente — no solo inteligente. El INFJ necesita sentir la conexión en el momento, no solo entenderla conceptualmente." },
        { tipo: "INTJ", por_que: "Comparten Ni — ven el mundo en patrones y visiones de largo plazo. La conversación fluye sin esfuerzo. El INTJ añade la dimensión lógica y estratégica que complementa el Fe del INFJ.", como_atraerla: "Muestra que tienes valores, no solo sistemas. El INFJ necesita sentir que detrás de la estructura hay humanidad real." }
      ],
      evitar: { tipo: "ESTP", razon: "Atracción inicial fuerte basada en el contraste: la presencia física del ESTP y la profundidad del INFJ se fascinan mutuamente. Pero el ESTP vive en el presente y evita activamente la profundidad emocional que el INFJ necesita para sentirse conectado. A largo plazo, el INFJ se siente ignorado y el ESTP se siente presionado." }
    }
  },

  // ════════════════════════════════════════════════════════════
  // INFP — El Mediador
  // ════════════════════════════════════════════════════════════
  INFP: {
    funciones: {
      stack: "Fi → Ne → Si → Te",
      dominante: {
        nombre: "Sentimiento Introvertido", codigo: "Fi",
        descripcion: "La brújula de valores más inamovible del sistema MBTI. Procesa el mundo emocional completamente en el interior — decide según lo que siente correcto en el fondo, independientemente de la presión social o la lógica externa. No performa emociones ni busca validación externa: siente en silencio y con una intensidad que pocos llegan a ver. El Fi dominante es el corazón más auténtico del sistema. El riesgo: la autenticidad sin comunicación activa se convierte en aislamiento emocional."
      },
      auxiliar: {
        nombre: "Intuición Extrovertida", codigo: "Ne",
        descripcion: "El motor de conexiones y posibilidades que da expresión externa al Fi. Mientras el Fi siente con profundidad, el Ne explora el mundo buscando formas de expresar esa profundidad — a través de ideas, arte, narrativas, y conexiones inesperadas. En conversación: el INFP con Ne desarrollado sorprende con perspectivas que nadie más ha considerado. En relaciones: ve el potencial de las personas y las situaciones, a veces hasta el punto de enamorarse del potencial en lugar de la realidad."
      },
      terciaria: {
        nombre: "Sensación Introvertida", codigo: "Si",
        descripcion: "Memoria experiencial y confort en lo familiar. El Si terciario del INFP crea un profundo apego a lugares, personas, y experiencias del pasado que tuvieron significado emocional. Da al INFP una consistencia de valores a lo largo del tiempo — lo que importó siempre importará. El riesgo: puede quedar atrapado en el pasado o resistir el cambio que racionalmente reconoce como necesario."
      },
      inferior: {
        nombre: "Pensamiento Extrovertido", codigo: "Te",
        descripcion: "El Te inferior es el punto de mayor vulnerabilidad del INFP y su mayor oportunidad de crecimiento. Bajo presión: puede volverse hipercrítico de sistemas externos, quejarse de ineficiencias sin proponer soluciones, o paralizarse ante la necesidad de ejecutar decisiones concretas. Desarrollado: el Te le da al INFP la capacidad de convertir sus visiones y valores en resultados tangibles en el mundo — transformando ideas en acción visible."
      },
      resumen: "El INFP opera desde un núcleo de valores internos absolutos (Fi) que explora y expresa a través de conexiones e ideas (Ne). Es el tipo más auténtico del sistema. Su mayor trabajo es desarrollar la capacidad de ejecutar (Te) y comunicar su mundo interior de forma activa, en lugar de esperar a ser entendido."
    },
    descripcion: "El INFP es uno de los tipos más mal entendidos del sistema MBTI, en parte porque su vida interior es extraordinariamente rica y su expresión exterior es selectiva. No es timidez — es discriminación. El INFP no comparte su mundo con cualquiera porque ese mundo es genuinamente sagrado para él. Sus valores no son preferencias cambiables: son la estructura de su identidad, y cualquier cosa que los contradiga genera una resistencia interna que no se puede forzar ni negociar.\n\nSu función dominante (Fi) crea una autenticidad que pocas personas pueden falsificar y que atrae a personas cansadas de la performance social constante. Cuando el INFP habla de algo que le importa, la diferencia es visible e inmediata — hay una intensidad y una realidad en sus palabras que contrasta con casi todo lo demás en el entorno social. Eso es su activo más grande y el que menos sabe cómo usar.\n\nSu mayor patrón limitante en relaciones es la pasividad. El INFP espera ser entendido sin hacer el trabajo de comunicar, espera ser elegido sin mostrar interés activo, y desaparece en lugar de confrontar cuando hay tensión. Esto no viene de indiferencia — viene de un miedo profundo al rechazo que el Fi procesa de forma muy intensa. El INFP que aprende a actuar desde sus valores en lugar de protegerlos a través del silencio es completamente diferente.",
    social: {
      nivel: "Bajo en grupos / Alto en conexiones genuinas",
      descripcion: "En grupos grandes pasa completamente desapercibido — y no le importa. No opera en masa. Cuando conecta con alguien en profundidad, esa conexión tiene una calidad que pocos tipos pueden igualar. La persona que experimenta la atención genuina y la comprensión del INFP no lo olvida fácilmente.",
      sabotaje: "La evitación pasiva del conflicto destruye la tensión que mantiene vivas las relaciones. El INFP desaparece emocionalmente cuando hay fricción en lugar de atravesarla, lo que convierte las relaciones en algo demasiado cómodo y plano. Sin tensión no hay atracción sostenida."
    },
    apego: {
      estilo: "Ansioso-Temeroso",
      descripcion: "El INFP quiere conexión profunda y auténtica de forma intensa — y al mismo tiempo teme profundamente el rechazo. Su Fi procesa las pérdidas emocionales con una intensidad desproporcionada. Esta combinación crea un patrón de acercamiento-retirada: se aproxima cuando se siente seguro, se retira cuando detecta posible rechazo, incluso si la señal es ambigua.",
      en_pareja: "En relaciones comprometidas, el INFP es uno de los compañeros más profundamente leales y presentes del sistema. Una vez que confía, da sin reservas — pero construir esa confianza requiere tiempo y prueba de que sus valores son respetados. No perdona la autenticidad fingida.",
      trigger: "La crítica a sus valores fundamentales o la sensación de ser malentendido activa el retraimiento. El INFP puede procesar internamente durante días algo que para otro tipo habría requerido una conversación de cinco minutos."
    },
    lenguajes: [
      { nombre: "Palabras de Afirmación", posicion: 1, descripcion: "Pero no genéricas — específicas, personales, y genuinas. El INFP necesita saber que es visto como individuo único, no como una categoría. 'Eres especial' no funciona. 'La forma en que ves X me hace pensar diferente' sí." },
      { nombre: "Tiempo de Calidad", posicion: 2, descripcion: "Presencia sin agenda. El INFP no necesita actividades elaboradas — necesita a alguien que esté genuinamente presente y curioso por su mundo interior. Una tarde de conversación real vale más que un viaje planificado." },
      { nombre: "Contacto Físico", posicion: 3, descripcion: "El contacto físico apropiado funciona como ancla al presente para el Ne que siempre está en el mundo de las ideas. Le dice al sistema nervioso del INFP que está seguro y que la conexión es real, no solo conceptual." }
    ],
    fortalezas: [
      { titulo: "Autenticidad no falsificable", desc: "Lo que ves es lo que hay. Esta rareza en el contexto social actual crea una confianza profunda y rápida en las personas que valoran lo genuino sobre lo performativo." },
      { titulo: "Singularidad real", desc: "No hay otro como él. Tiene perspectivas, conexiones y formas de ver el mundo que son genuinamente únicas — no cultivadas para diferenciarse, sino naturales." },
      { titulo: "Profundidad emocional", desc: "Siente con una intensidad que en relaciones íntimas se convierte en una presencia y una comprensión que pocas personas experimentan en su vida." },
      { titulo: "Lealtad sin condiciones a quien eligió", desc: "Cuando el INFP elige a alguien, esa elección viene del centro de su Fi — es real, duradera, y no se negocia con la conveniencia." },
      { titulo: "Visión creativa aplicada a las relaciones", desc: "Ve conexiones y significados que otros no ven. Transforma experiencias ordinarias en algo memorable con su forma de estar presente." },
      { titulo: "Valores como ancla de identidad", desc: "No se pierde en las relaciones porque su Fi le da un núcleo inviolable. Puede adaptarse en la forma pero nunca en el fondo — eso es estabilidad real." },
      { titulo: "Presencia empática sin agenda", desc: "Cuando escucha, escucha completamente. No está formulando su próxima respuesta ni evaluando — está presente de una forma que la mayoría no puede sostener." }
    ],
    debilidades: [
      { titulo: "Pasividad relacional", desc: "Espera que las cosas pasen en lugar de crearlas. Espera que lo entiendan sin comunicar activamente. Espera ser elegido sin mostrar interés claro. Esta pasividad se lee como desinterés." },
      { titulo: "Evitación del conflicto", desc: "Desaparece emocionalmente cuando hay tensión en lugar de atravesarla. Los problemas no resueltos se acumulan hasta que el INFP se cierra completamente — sin que la otra persona entienda qué pasó." },
      { titulo: "Inconsistencia en ejecución", desc: "Visión clara, acción intermitente. La brecha entre lo que el INFP quiere hacer y lo que realmente ejecuta puede ser enorme — y frustrante para quienes lo rodean." },
      { titulo: "Sobre-sensibilidad al rechazo", desc: "Un comentario mal calibrado puede generar días de procesamiento interno. Esto frena la iniciativa en relaciones porque el costo percibido del rechazo es desproporcionado." },
      { titulo: "Idealización de potencial", desc: "Se enamora del potencial de las personas en lugar de verlas como son. Construye relaciones con versiones idealizadas que eventualmente chocan con la realidad." }
    ],
    atraccion: {
      tipo: "Autenticidad + profundidad + singularidad",
      descripcion: "El INFP atrae a personas cansadas de la superficie. En un mundo de máscaras, su autenticidad es desarmante. El reto es hacerla visible — la profundidad guardada en el interior no genera atracción si nadie la ve.",
      maximiza: [
        "Habla de lo que te apasiona con intensidad real, sin disculpa y sin minimizar. La pasión auténtica es uno de los estados más atractivos disponibles.",
        "Muestra tus valores a través de decisiones concretas, no de declaraciones. El INFP que actúa desde sus valores genera respeto que el que los declara no obtiene.",
        "Toma posición clara en lo que importa. La ambigüedad crónica mata la atracción — no porque sea cobardía, sino porque no da a la otra persona nada concreto a lo que responder."
      ],
      errores: [
        "Esperar que la otra persona lo 'entienda' sin hacer el trabajo activo de mostrarse. El misterio sin apertura eventual es invisibilidad, no profundidad.",
        "Desaparecer cuando hay tensión en lugar de atravesarla. La fricción gestionada bien genera más atracción que cien momentos de armonía forzada.",
        "Ser tan abstracto y conceptual en conversación que la otra persona no sabe quién es realmente en el plano concreto y presente."
      ],
      estrategias: [
        "Desarrolla acción directa visible. Tus valores son poderosos — pero necesitan expresarse en el mundo físico para ser percibidos. Un proyecto, un craft, una misión concreta.",
        "Practica el conflicto constructivo deliberadamente. Una conversación difícil bien gestionada genera más confianza que cien noches de paz superficial.",
        "Cuando alguien te interesa, dilo una vez, de forma directa, sin hedging. El INFP que actúa con claridad genera un impacto completamente desproporcionado al esfuerzo."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ENFJ", por_que: "El ENFJ da la dirección, la estructura emocional y la calidez que el INFP necesita sin exigirle que abandone su autenticidad. El INFP aporta la profundidad de valores y la comprensión genuina que el ENFJ respeta más que cualquier logro.", como_atraerla: "Muéstrate auténtico antes que impresionante. El INFP no respeta a quien actúa para ser aceptado." },
        { tipo: "ENTJ", por_que: "Complementariedad estructural total. El ENTJ aporta la dirección, estructura y ambición que el INFP no se da a sí mismo. El INFP humaniza al ENTJ de formas que ningún otro tipo puede — lo conecta con sus propios valores.", como_atraerla: "Demuestra que tienes convicciones reales que no ceden ante la presión. El ENTJ solo respeta genuinamente a quien mantiene su posición." },
        { tipo: "ENFP", por_que: "Energía compartida, valores alineados, y crecimiento mutuo. Ambos operan desde Fi/Ne o Ne/Fi — hay una comprensión natural del mundo interno del otro que no requiere traducción.", como_atraerla: "Sé espontáneo ocasionalmente. El ENFP necesita que salgas de tu mundo interior para encontrarla en el suyo." }
      ],
      evitar: { tipo: "ESTJ", razon: "El ESTJ valora estructura, eficiencia y resultados externos visibles. El INFP valora autenticidad, significado y espacio interno. El ESTJ interpreta los valores del INFP como vagos e impráticos; el INFP siente que el ESTJ no lo ve. El choque es de fondo." }
    }
  },

  // ════════════════════════════════════════════════════════════
  // ENFP — El Activista
  // ════════════════════════════════════════════════════════════
  ENFP: {
    funciones: {
      stack: "Ne → Fi → Te → Si",
      dominante: {
        nombre: "Intuición Extrovertida", codigo: "Ne",
        descripcion: "El generador de posibilidades más activo del sistema MBTI. Escanea el entorno constantemente buscando conexiones, patrones y ángulos no obvios. Mientras el Ni converge hacia una visión, el Ne diverge — genera múltiples posibilidades en paralelo y encuentra el placer en el proceso de exploración, no solo en la conclusión. En conversación: crea estimulación intelectual y espontaneidad que puede ser magnética o dispersa según el contexto. En relaciones: ve potencial en personas y situaciones antes de que sea evidente — lo que puede ser un activo o una trampa."
      },
      auxiliar: {
        nombre: "Sentimiento Introvertido", codigo: "Fi",
        descripcion: "La brújula de valores internos que da dirección moral y emocional al Ne. El Fi auxiliar del ENFP no es tan visible como el Fe — no performa ni gestiona emociones ajenas — pero es profundamente real. Da al ENFP una autenticidad que lo diferencia de otros tipos extravertidos: cuando algo va contra sus valores, no puede fingir lo contrario, aunque quiera. Esta profundidad emocional interna es su mayor activo relacional cuando se desarrolla conscientemente."
      },
      terciaria: {
        nombre: "Pensamiento Extrovertido", codigo: "Te",
        descripcion: "El Te terciario del ENFP está subdesarrollado pero activo. En su mejor versión: le permite convertir sus ideas y visiones en proyectos concretos y estructuras que funcionan. Subdesarrollado: lo vuelve ineficiente en la ejecución, inconsistente en el seguimiento, y propenso a empezar diez proyectos y terminar ninguno. Desarrollar el Te es la diferencia entre el ENFP que tiene ideas brillantes y el que construye cosas reales con ellas."
      },
      inferior: {
        nombre: "Sensación Introvertida", codigo: "Si",
        descripcion: "El Si inferior es el punto de mayor tensión para el ENFP. Aborrece la rutina, la comparación con el pasado, y los procedimientos establecidos. Bajo estrés extremo puede caer en el patrón opuesto: volverse hipersensible a la comodidad física, apegarse exageradamente a rutinas, o quedar atrapado rumiando el pasado. El ENFP que integra su Si gana estabilidad y consistencia sin perder su espontaneidad — aprende a usar el pasado como información en lugar de negarlo."
      },
      resumen: "El ENFP opera desde exploración constante de posibilidades (Ne) guiada por un núcleo de valores genuinos (Fi). Es el tipo con mayor energía relacional del sistema. Su trabajo es desarrollar la ejecución (Te) y la consistencia (Si) para que su potencial innato se traduzca en resultados reales y relaciones de largo plazo."
    },
    descripcion: "El ENFP entra a cualquier contexto y crea un campo gravitacional. Las personas quieren estar cerca porque con él la vida se siente más posible — más rica, más interesante, más real. Su Ne escanea el mundo constantemente buscando conexiones que nadie más ve, y su Fi las filtra a través de valores genuinos que le dan una autenticidad que pocos tipos pueden igualar. El resultado es un tipo que puede generar carisma, profundidad emocional y estimulación intelectual simultáneamente — una combinación extremadamente rara.\n\nEl punto ciego del ENFP es la novedad. Su Ne está diseñado para explorar — y eso funciona perfectamente hasta que una relación, un proyecto, o una identidad requieren consistencia sostenida en lugar de exploración continua. El ENFP que no ha trabajado su Te y su Si tiende a enamorarse del potencial de las personas en lugar de ver quiénes son realmente, a comprometerse desde el entusiasmo y cumplir desde la energía disponible, y a perder el interés cuando la fase de exploración da paso a la construcción.\n\nEn el plano relacional masculino, el ENFP tiene una ventaja enorme en las fases iniciales — y un riesgo real en las fases medias. Su carisma y apertura emocional son magnéticos. Pero la accesibilidad total destruye la escasez que genera atracción sostenida. El ENFP que aprende a ser selectivo con su energía, a tener un proyecto de vida concreto que respalde su visión, y a completar lo que empieza es completamente diferente al que opera solo desde el entusiasmo.",
    social: {
      nivel: "Muy alto — genera energía en cualquier contexto",
      descripcion: "Entra a cualquier grupo y crea un campo energético diferente. Las personas se sienten más vivas, más abiertas, más posibles cerca de él. Genera conexiones emocionales genuinas con rapidez inhabitual — puede ir de desconocido a confidente en una conversación. El problema: su accesibilidad universal destruye la escasez que genera atracción.",
      sabotaje: "La novedad es su droga. Cuando una relación pierde la fase de exploración y entra en la construcción sostenida, su atención empieza a dispersarse de formas que él mismo no siempre reconoce. Y su calidez natural con todos genera señales mixtas que crean confusión en quienes están genuinamente interesados."
    },
    apego: {
      estilo: "Ansioso",
      descripcion: "El ENFP necesita conexión emocional profunda y real, y su Ne amplifica el miedo al abandono proyectando múltiples escenarios negativos desde señales mínimas. Da mucho emocionalmente en las fases tempranas de una relación — a veces demasiado, demasiado pronto — creando desequilibrio que él mismo no gestiona bien cuando no es correspondido.",
      en_pareja: "En relaciones comprometidas, el ENFP es un compañero extraordinariamente presente, creativo y profundo. Pero necesita pareja que lo ancle sin limitarlo — alguien que aprecie su energía sin intentar contenierla, y que tenga suficiente dirección y consistencia propia para no depender de él como fuente de estabilidad.",
      trigger: "La sensación de estar atrapado, de no tener espacio para explorar, o de que su pareja no valora genuinamente su profundidad (solo su energía) activa el patrón de distancia o desaparición."
    },
    lenguajes: [
      { nombre: "Palabras de Afirmación", posicion: 1, descripcion: "Necesita saber explícitamente que su profundidad es valorada — no solo su energía y carisma. Que alguien vea más allá de la diversión y reconozca quién es realmente lo recarga de una forma que pocos estímulos pueden igualar." },
      { nombre: "Tiempo de Calidad", posicion: 2, descripcion: "No actividades — conexión real. Una conversación de fondo donde alguien está genuinamente curioso por su mundo interior. El ENFP sabe instintivamente cuándo la presencia del otro es real y cuándo es performance." },
      { nombre: "Contacto Físico", posicion: 3, descripcion: "El contacto físico ancla al Ne siempre activo. Le dice a su sistema que está en el presente, con esta persona, en este momento — en lugar de en cualquiera de las múltiples posibilidades que su mente está explorando simultáneamente." }
    ],
    fortalezas: [
      { titulo: "Carisma auténtico", desc: "No es técnica — es arquitectura cognitiva. Genera conexión de forma automática porque su Ne busca activamente puntos de resonancia con cada persona que encuentra." },
      { titulo: "Entusiasmo genuino y contagioso", desc: "Cuando algo le importa, el estado que proyecta mueve a personas que nada más puede mover. Esa energía es rara y tiene un valor relacional enorme." },
      { titulo: "Profundidad emocional subyacente", desc: "Debajo del carisma hay un Fi profundo y genuino. Las personas que lo conocen bien saben que hay mucho más que lo que proyecta — y eso sostiene el interés a largo plazo." },
      { titulo: "Creatividad relacional", desc: "Crea experiencias y momentos que otros no pueden imaginar. Una noche con el ENFP se recuerda — no por el gasto, sino por la calidad de la presencia y la creatividad de la experiencia." },
      { titulo: "Adaptabilidad total", desc: "Puede conectar con personas de perfiles completamente opuestos. Esta flexibilidad le da una red social y un rango de experiencias que amplían constantemente su perspectiva." },
      { titulo: "Visión de potencial en personas", desc: "Ve lo que alguien podría ser antes de que esa persona lo vea en sí misma. Esta capacidad, aplicada bien, es uno de los regalos más poderosos que puede dar en una relación." },
      { titulo: "Integridad emocional", desc: "No puede fingir interés o afecto que no siente. Su Fi hace que la autenticidad sea estructural, no elegida. Las personas que lo han experimentado saben que cuando el ENFP está presente, lo está de verdad." }
    ],
    debilidades: [
      { titulo: "Inconsistencia en seguimiento", desc: "Compromete desde el entusiasmo y cumple desde la energía disponible — que varía. La brecha entre lo que promete y lo que ejecuta genera decepción en personas que tomaron sus palabras al pie de la letra." },
      { titulo: "Señales mixtas crónicas", desc: "Su calidez natural con todos hace que la línea entre amistad y interés romántico sea borrosa. Genera confusión en personas que interpretan su apertura como indicación específica de interés." },
      { titulo: "Se aburre de la estabilidad", desc: "Una relación madura requiere raíces además de vuelo. El ENFP puede reconocerlo racionalmente pero actuar desde el Ne que siempre busca la próxima exploración." },
      { titulo: "Demasiado accesible", desc: "Su apertura total destruye la escasez que genera atracción sostenida. El hombre disponible para todos no tiene el mismo valor percibido que el hombre selectivo." },
      { titulo: "Enamoramiento del potencial", desc: "Ve lo que alguien podría llegar a ser y construye la relación con esa versión futura, ignorando señales de lo que la persona realmente es en el presente." }
    ],
    atraccion: {
      tipo: "Energía + autenticidad + profundidad inesperada",
      descripcion: "El ENFP proyecta la sensación de que con él la vida es más posible. Eso es un activo enorme — si se combina con dirección real y selectividad. Sin esos elementos, el carisma se convierte en entretenimiento, no en atracción sostenida.",
      maximiza: [
        "Ten un proyecto de vida concreto y habla de él con convicción. Tu energía necesita dirección para proyectar atractivo sostenido — sin destino es solo ruido.",
        "Practica la selectividad. No todo el mundo merece tu energía al mismo nivel. La rareza de tu apertura total se convierte en su opuesto cuando es universal.",
        "Cuando algo o alguien te importa de verdad, actúa desde esa certeza — no desde el entusiasmo momentáneo que puede cambiar mañana."
      ],
      errores: [
        "Ser tan accesible y cálido con todos que quien está genuinamente interesado no puede distinguir si hay algo especial o es simplemente tu default.",
        "Comprometerte en el calor del entusiasmo y no cumplir. Cada promesa incumplida erosiona la confianza que tu carisma construyó.",
        "Perder el misterio por exceso de apertura emocional en las primeras etapas. La profundidad se comparte progresivamente."
      ],
      estrategias: [
        "Desarrolla un marco de vida sólido — trabajo, misión, dirección. Las personas de alto valor necesitan saber adónde vas, no solo cómo eres.",
        "Practica decir no de forma clara y sin excesiva explicación. La selectividad es uno de los estados más atractivos disponibles.",
        "Ancla tu energía en logros concretos y visibles. Sin eso, tu carisma puede percibirse como flotante — atractivo pero no sólido."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "INTJ", por_que: "La tensión de opuestos más productiva del sistema. El INTJ aporta dirección, profundidad y desafío intelectual. El ENFP aporta calidez, espontaneidad y perspectiva no convencional. Ambos se fascinan y se expanden mutuamente.", como_atraerla: "Muestra rigor intelectual además de creatividad. El INTJ no se impresiona con entusiasmo — se impresiona con ideas que tienen estructura." },
        { tipo: "INFJ", por_que: "Visión profunda compartida (intuición dominante en ambos) y valores alineados. El INFJ aporta profundidad emocional y visión de largo plazo; el ENFP aporta energía y conexión con el presente.", como_atraerla: "Muéstrate con intención clara. El INFJ no invierte donde no ve señales de compromiso real." },
        { tipo: "ENTJ", por_que: "El ENTJ aporta la estructura, dirección y ambición que el ENFP necesita para convertir sus ideas en realidades. El ENFP humaniza al ENTJ y amplía su perspectiva de formas que ningún otro tipo logra.", como_atraerla: "Demuestra que tienes proyectos reales además de ideas. El ENTJ respeta la ejecución por encima de todo." }
      ],
      evitar: { tipo: "ISFJ", razon: "El ISFJ necesita rutina, seguridad y ritmo predecible. El ENFP necesita variedad, estimulación y libertad de exploración. El ENFP se siente atrapado; el ISFJ se siente abandonado. La combinación genera frustración estructural que buena voluntad no puede resolver." }
    }
  },

  INTJ: {
    funciones: {
      stack: "Ni → Te → Fi → Se",
      dominante: {
        nombre: "Intuición Introvertida",
        codigo: "Ni",
        descripcion: "El INTJ ve patrones y convergencias que otros no detectan. Su mente constantemente sintetiza información dispersa en una visión unificada del futuro. No es predicción — es comprensión profunda de cómo las cosas tienden a desarrollarse. Esta función opera de forma inconsciente, generando insights que llegan como certezas, no como hipótesis."
      },
      auxiliar: {
        nombre: "Pensamiento Extrovertido",
        codigo: "Te",
        descripcion: "La función ejecutora. Te convierte la visión del Ni en planes, sistemas y estructuras accionables. El INTJ no solo ve el destino — sabe exactamente qué pasos lógicos llevan allí. Esta función explica su eficiencia brutal: si algo no contribuye al objetivo, se elimina sin sentimentalismos."
      },
      terciaria: {
        nombre: "Sentimiento Introvertido",
        codigo: "Fi",
        descripcion: "El núcleo de valores personales del INTJ. Opera silenciosamente, pero cuando se activa establece líneas absolutas. El INTJ sabe exactamente qué está alineado con quién es — y lo que no, simplemente no tiene cabida. Esta función da profundidad emocional que el INTJ raramente muestra en público."
      },
      inferior: {
        nombre: "Sensación Extrovertida",
        codigo: "Se",
        descripcion: "La función menos desarrollada: el presente físico, el mundo sensorial, la espontaneidad. Bajo estrés extremo, el INTJ puede tener episodios de Se en espiral — consumo impulsivo, excesos físicos, hipersensibilidad sensorial. En modo sano, el Se desarrollado le permite al INTJ disfrutar placeres físicos con genuina presencia."
      },
      resumen: "El INTJ opera desde una visión interior potente (Ni) que traduce en ejecución precisa (Te), sostenida por valores propios inamovibles (Fi). Su talón de Aquiles es el presente inmediato y lo sensorial (Se inferior). Es el tipo más estratégico del sistema."
    },
    descripcion: "El INTJ es el arquitecto más puro del sistema MBTI. Mientras otros reaccionan al mundo tal como es, el INTJ lo percibe tal como podría ser — y trabaja metódicamente para llegar allí. Esta orientación hacia el futuro no es optimismo; es análisis. El INTJ ve los patrones subyacentes de la realidad y extrae de ellos proyecciones con una precisión que parece sobrenatural a quienes no tienen esa capacidad natural.\n\nSu mayor fortaleza es también su mayor desafío interpersonal: estándares altísimos. El INTJ aplica a sí mismo el mismo nivel de exigencia que aplica al mundo externo, y cuando encuentra a alguien que no cumple con cierto umbral de profundidad intelectual o integridad, simplemente deja de invertir. No es crueldad — es economía de recursos. El INTJ tiene clara conciencia de que su tiempo y energía mental son finitos, y los asigna con precisión quirúrgica.\n\nEn relaciones, el INTJ es uno de los tipos más leales y profundos del sistema — pero solo cuando ha decidido que alguien vale esa inversión. Esa decisión lleva tiempo, pasa por múltiples filtros implícitos, y quien la supera recibe algo que muy pocos experimentan: la atención sin reservas de una mente que normalmente está en otra dimensión.",
    social: {
      nivel: "Bajo-Selectivo",
      descripcion: "El INTJ no socializa por el acto de socializar. Cada interacción tiene un propósito implícito o explícito. En grupos, tiende a observar más que participar, hablará cuando tiene algo de valor real que agregar, y se retirará cuando la conversación no ofrece retorno intelectual o estratégico.",
      sabotaje: "Proyectar arrogancia involuntariamente. El INTJ no pretende ser superior — simplemente no simula interés que no siente. Esto puede leerse como desprecio cuando es solo autenticidad. El segundo sabotaje: rechazar conexiones potencialmente valiosas demasiado rápido por no pasar el filtro inicial."
    },
    apego: {
      estilo: "Evitativo-Seguro",
      descripcion: "El INTJ tiene una configuración de apego compleja. Por defecto opera en modo evitativo funcional — es altamente autosuficiente, valora su independencia, y tiene poca tolerancia para la dependencia emocional. Sin embargo, cuando ha elegido conscientemente a alguien, puede desarrollar un apego seguro genuinamente estable.",
      en_pareja: "Necesita espacio intelectual y físico para procesar. Las demandas de atención constante o los juegos emocionales activan su modo de desconexión inmediatamente. Con alguien que respeta su autonomía y puede sostener conversaciones de profundidad real, el INTJ es un compañero extraordinariamente estable y comprometido.",
      trigger: "Sentirse controlado, demandado emocionalmente sin reciprocidad intelectual, o en una relación que no tiene dirección clara. También activa el modo evitativo cuando siente que está siendo manipulado emocionalmente."
    },
    lenguajes: [
      { nombre: "Actos de Servicio", posicion: 1, descripcion: "El INTJ demuestra amor haciendo cosas concretas que optimizan la vida del otro. Investiga, planifica, resuelve. Para el INTJ, ayudarte a solucionar un problema real es un acto de amor más significativo que cualquier declaración verbal." },
      { nombre: "Tiempo de Calidad", posicion: 2, descripcion: "El tiempo que el INTJ decide compartir contigo es extremadamente selectivo. Si está presente — presente de verdad, con atención completa — es porque has pasado todos sus filtros. Ese tiempo vale más de lo que las palabras pueden expresar." },
      { nombre: "Palabras de Afirmación", posicion: 3, descripcion: "No le salen naturalmente, pero cuando un INTJ te da un reconocimiento genuino, puedes estar seguro de que es cien por ciento real. El INTJ nunca halaga por protocolo social — si te lo dice, lo piensa." }
    ],
    fortalezas: [
      { titulo: "Pensamiento estratégico de largo plazo", desc: "Capacidad innata para ver el tablero completo, anticipar movimientos, y diseñar rutas óptimas hacia objetivos que otros ni han empezado a visualizar." },
      { titulo: "Autosuficiencia radical", desc: "No necesita validación externa para operar. Puede funcionar en alta eficiencia durante periodos prolongados sin input emocional de otros, lo cual es una ventaja operativa en prácticamente cualquier contexto." },
      { titulo: "Toma de decisiones sin sesgo emocional", desc: "Cuando otros paralizan por miedo, orgullo o presión social, el INTJ evalúa la situación lógicamente y ejecuta. Esta capacidad de separar emoción de análisis es extremadamente valiosa bajo presión." },
      { titulo: "Visión de sistemas", desc: "Ve cómo las partes se conectan en el todo. Identifica ineficiencias, cuellos de botella y puntos de apalancamiento que nadie más detecta. Natural en arquitectura de negocios, estrategia y cualquier dominio complejo." },
      { titulo: "Estándares de excelencia inquebrantables", desc: "No entrega nada que no cumpla su propio umbral. Este nivel de integridad hacia el trabajo propio genera productos, proyectos y resultados que consistentemente superan expectativas externas." },
      { titulo: "Independencia de pensamiento", desc: "No sigue consensos porque sí. El INTJ evalúa cada idea desde sus fundamentos y llega a conclusiones propias. Esta independencia cognitiva lo protege de modas, manipulación y pensamiento de grupo." },
      { titulo: "Capacidad de aprendizaje autónomo", desc: "Puede dominar campos complejos de forma autodidacta. Su combinación de curiosidad profunda (Ni) y organización lógica (Te) lo convierte en una máquina de adquisición de competencia en dominios que le interesan." }
    ],
    debilidades: [
      { titulo: "Arrogancia intelectual", desc: "Puede desestimar perspectivas de valor porque provienen de alguien que percibe como menos competente. Pierde inputs valiosos por no distinguir entre la calidad de la fuente y la calidad de la idea." },
      { titulo: "Rigidez en sus propias conclusiones", desc: "Una vez que el INTJ ha formado una visión, actualizar esa visión ante nueva evidencia puede ser más difícil de lo que debería. La misma certeza que lo hace decisivo puede convertirlo en dogmático." },
      { titulo: "Dificultad para expresar vulnerabilidad", desc: "Su Fi terciaria tiene acceso a emociones profundas que raramente salen. Esto puede generar una percepción de frialdad que aleja conexiones que el INTJ en realidad quería." },
      { titulo: "Impaciencia con procesos lentos", desc: "Cuando ya ve el destino con claridad, los pasos intermedios le resultan tediosos. Puede cortar atajos o perder tolerancia con quienes procesan más lentamente." },
      { titulo: "Tendencia al aislamiento excesivo", desc: "La autosuficiencia llevada al extremo se convierte en aislamiento que empobrece. El INTJ en modo de sobre-evitación pierde perspectiva, feedback y conexión humana que necesita aunque no lo reconozca." }
    ],
    atraccion: {
      tipo: "Atracción por competencia y profundidad",
      descripcion: "El INTJ atrae por su combinación de inteligencia evidente, misterio calculado y la sensación de que está operando en un nivel diferente al del promedio. No persigue ni se rinde. Esta indiferencia auténtica combinada con profundidad real genera una atracción poderosa en personas de alto calibre.",
      maximiza: [
        "Desarrolla y muestra competencia real en tu campo. El INTJ no se impresiona con apariencias — se impresiona con dominio real.",
        "Mantén conversaciones que vayan más allá de la superficie. El INTJ se energiza con profundidad intelectual y no tiene tiempo para pequeñeces.",
        "Proyecta independencia funcional. Quienes necesitan atención constante o validación permanente activarán el modo evitativo inmediatamente."
      ],
      errores: [
        "Intentar impresionar con status social o validación externa. Al INTJ esto le resulta irrelevante y puede generar percepción negativa.",
        "Hacer juegos de atracción basados en incertidumbre artificial. El INTJ detecta la manipulación emocional instantáneamente y la desestima.",
        "Invadir su espacio mental o físico antes de haber ganado la confianza suficiente para ello."
      ],
      estrategias: [
        "Sé genuinamente competente en algo y muéstralo sin fanfarria. El dominio tranquilo es la señal de atracción más potente para un INTJ.",
        "Ten tu propio mundo interior rico — proyectos, ideas, dirección. El INTJ quiere un igual, no un seguidor.",
        "Aprende cuándo dejarlo en silencio. El INTJ asocia la comodidad en el silencio compartido con la rareza de una conexión genuina."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ENFP", por_que: "Tensión de opuestos altamente productiva. El ENFP trae calidez, perspectiva humana y conexión con el presente que el INTJ no genera solo. El INTJ trae estructura, profundidad y dirección que el ENFP necesita para convertir su potencial en realidad.", como_atraerla: "Muestra que tienes estructura real además de profundidad. El ENFP admira la visión, pero se compromete con quien también puede ejecutarla." },
        { tipo: "ENTJ", por_que: "Dos mentes estratégicas con diferentes estilos de liderazgo. El ENTJ opera más en el mundo externo; el INTJ en la arquitectura interna. La combinación produce una potencia intelectual y operativa fuera de lo común.", como_atraerla: "El ENTJ respeta la competencia demostrada. Entra en el mundo del ENTJ con ideas sólidas y la capacidad de ejecutarlas." },
        { tipo: "INFJ", por_que: "Intuición compartida profunda. Ambos operan desde Ni dominante, lo que genera una comprensión mutua casi sin palabras. El INFJ aporta la dimensión humana y emocional que el INTJ tiene menos desarrollada.", como_atraerla: "Muéstrate con valores claros — el INFJ lee la alineación ética antes que cualquier otra dimensión." }
      ],
      evitar: { tipo: "ESFP", razon: "El ESFP vive en el presente sensorial con espontaneidad total. El INTJ opera en el futuro estratégico con estructura. La diferencia no es solo de estilo — es de orientación fundamental hacia la realidad. Lo que uno valora profundamente, el otro puede percibir como incomprensible." }
    }
  },

  INTP: {
    funciones: {
      stack: "Ti → Ne → Si → Fe",
      dominante: {
        nombre: "Pensamiento Introvertido",
        codigo: "Ti",
        descripcion: "El INTP construye sistemas lógicos internos absolutamente coherentes. Su mente constantemente busca el principio fundamental que explica todo lo demás. Ti es exigente con la precisión: una sola inconsistencia invalida toda la estructura. Esta función hace al INTP extraordinariamente bueno detectando fallas lógicas que otros pasan por alto."
      },
      auxiliar: {
        nombre: "Intuición Extrovertida",
        codigo: "Ne",
        descripcion: "Explora posibilidades en múltiples direcciones simultáneamente. Donde Ti construye la estructura, Ne la alimenta con conexiones inesperadas entre ideas aparentemente no relacionadas. El INTP puede estar en medio de un problema de física teórica y de repente ver su conexión con una metáfora filosófica — ese es Ne trabajando."
      },
      terciaria: {
        nombre: "Sensación Introvertida",
        codigo: "Si",
        descripcion: "La memoria experiencial. El INTP tiende a recordar experiencias pasadas con alta fidelidad y a compararlas con el presente. En modo no saludable, Si puede generar resistencia al cambio o apego excesivo a métodos probados cuando Ne genuinamente querría explorar nuevos."
      },
      inferior: {
        nombre: "Sentimiento Extrovertido",
        codigo: "Fe",
        descripcion: "La dimensión social y emocional menos desarrollada. El INTP puede sentirse profundamente incómodo en contextos que requieren gestión emocional grupal o expresión afectiva pública. Bajo estrés extremo, puede tener explosiones emocionales inesperadas o buscar aprobación social de forma torpe. En modo sano, Fe desarrollado le permite conectar emocionalmente de forma genuina."
      },
      resumen: "El INTP es el teórico más puro del sistema. Ti construye su mundo interno con rigor lógico impecable; Ne lo expande hacia territorios inesperados; Si ancla en experiencia verificada; Fe inferior es su puente menos desarrollado hacia el mundo humano. Cuando integra las cuatro funciones, produce insights que definen campos enteros."
    },
    descripcion: "El INTP vive en el espacio entre la pregunta y la respuesta — y lo prefiere así. Para él, la certeza prematura es el enemigo del pensamiento. Cada respuesta que obtiene genera tres preguntas nuevas, lo cual puede ser percibido como indecisión cuando en realidad es rigor intelectual. El INTP no cierra una posición hasta haber agotado el espacio de exploración posible.\n\nSu relación con el mundo externo es mediada casi completamente por su sistema lógico interno. Una idea no es válida porque la diga una autoridad — es válida si sobrevive al escrutinio de su propio framework. Esto lo hace refractario a la manipulación ideológica y enormemente independiente en su pensamiento, pero también puede convertirlo en alguien difícil de persuadir incluso cuando la persuasión sería beneficiosa para él.\n\nEn relaciones, el INTP es más afectuoso de lo que parece y más leal de lo que su aparente distancia sugiere. El problema es que su Fe inferior raramente sabe cómo expresar ese afecto de forma legible para los demás. Quien aprende a leer las señales del INTP — la atención sostenida, el tiempo dedicado, el compartir sus ideas más íntimas — descubre a uno de los compañeros intelectualmente más estimulantes del sistema.",
    social: {
      nivel: "Bajo-Selectivo",
      descripcion: "El INTP puede parecer ausente en grupos no porque no esté procesando — está procesando en múltiples niveles simultáneamente. Lo que no hace es participar en la capa superficial de la conversación que considera ruido. Cuando encuentra a alguien con quien explorar ideas reales, puede hablar durante horas con una intensidad que sorprende a quienes solo vieron su silencio.",
      sabotaje: "La precisión compulsiva. El INTP puede interrumpir el flujo de una conversación para corregir un detalle menor que no afecta en nada el punto central. Esto crea una percepción de pedantería que hace que personas potencialmente interesantes dejen de invertir en la interacción."
    },
    apego: {
      estilo: "Evitativo",
      descripcion: "El INTP tiene un estilo de apego predominantemente evitativo, no por rechazo a la conexión sino por una orientación natural hacia la independencia y la vida interior. La intimidad emocional requiere una cantidad de Fe que el INTP tiene que esforzarse conscientemente para activar.",
      en_pareja: "Necesita una pareja que sea autosuficiente y que no interprete su necesidad de espacio como desinterés. El INTP en una relación segura puede ser profundamente leal — el problema es que sus formas de expresar ese compromiso raramente son las que el otro espera.",
      trigger: "Las demandas emocionales directas sin base racional, los conflictos que no tienen resolución lógica posible, y la percepción de que su libertad intelectual o física está siendo limitada."
    },
    lenguajes: [
      { nombre: "Tiempo de Calidad", posicion: 1, descripcion: "Para el INTP, compartir tiempo es compartir su recurso más valorado. El hecho de que esté ahí, pensando contigo, explorando ideas contigo, es su declaración más poderosa de vínculo." },
      { nombre: "Palabras de Afirmación", posicion: 2, descripcion: "El INTP valora el reconocimiento intelectual genuino. Que alguien entienda y valore su forma de pensar, sus ideas, su contribución — eso es profundamente significativo para él." },
      { nombre: "Actos de Servicio", posicion: 3, descripcion: "Cuando el INTP te ayuda a resolver algo — especialmente si dedica tiempo a entender el problema en profundidad antes de ofrecer solución — es un acto de afecto real, aunque no se presente como tal." }
    ],
    fortalezas: [
      { titulo: "Análisis lógico de profundidad excepcional", desc: "Puede descomponer sistemas complejos hasta sus componentes fundamentales con una precisión que pocos igualan. Detecta inconsistencias lógicas que otros ignoran." },
      { titulo: "Originalidad de pensamiento", desc: "La combinación de Ti y Ne produce conexiones entre ideas que nadie más había visto. El INTP frecuentemente llega a soluciones por rutas completamente no convencionales que resultan ser las más elegantes." },
      { titulo: "Objetividad bajo presión", desc: "Su Ti dominante lo protege del sesgo emocional en el análisis. Puede evaluar una situación con rigor incluso cuando el resultado del análisis va contra sus preferencias." },
      { titulo: "Adaptabilidad intelectual", desc: "Puede aprender campos radicalmente diferentes con profundidad real. No le asusta la complejidad — la encuentra motivante." },
      { titulo: "Honestidad intelectual radical", desc: "El INTP prefiere no tener respuesta a tener una respuesta falsa. Esta integridad epistémica es extremadamente valiosa en contextos donde la precisión importa." },
      { titulo: "Autonomía funcional", desc: "Puede trabajar en proyectos complejos durante periodos prolongados sin supervisión o validación externa. Alta capacidad de autorregulación cuando el proyecto lo motiva genuinamente." },
      { titulo: "Visión de largo alcance teórico", desc: "Puede proyectar las implicaciones de una idea hasta sus consecuencias lógicas más lejanas, lo cual es valioso para anticipar problemas antes de que emerjan." }
    ],
    debilidades: [
      { titulo: "Procrastinación en la ejecución", desc: "El INTP puede perfeccionar el modelo teórico indefinidamente y nunca pasar a la implementación. La brecha entre la idea y el producto terminado puede ser enorme." },
      { titulo: "Dificultad con la expresión emocional", desc: "Su Fe inferior raramente sabe cómo articular lo que siente de forma que el otro pueda recibirlo. Esto genera malentendidos en relaciones donde el lenguaje emocional es esperado." },
      { titulo: "Parálisis por análisis", desc: "Puede quedar atrapado en la exploración de posibilidades (Ne) sin que Ti logre cerrar en una decisión. La decisión perfecta se convierte en enemiga de la decisión suficientemente buena." },
      { titulo: "Desdén por lo convencional", desc: "Puede rechazar soluciones probadas simplemente por no ser intelectualmente estimulantes. A veces la respuesta convencional es la correcta." },
      { titulo: "Negligencia de las propias necesidades físicas y sociales", desc: "Puede pasar días en un problema teórico sin comer bien, sin socializar, sin moverse. La vida interior consume recursos que el cuerpo y las relaciones también necesitan." }
    ],
    atraccion: {
      tipo: "Atracción por profundidad intelectual y autenticidad",
      descripcion: "El INTP atrae con una combinación de inteligencia obvia, perspectiva no convencional y la rareza de alguien que genuinamente no está tratando de impresionarte. Su indiferencia al juicio social puede ser profundamente atractiva para personas que están cansadas de la performance social.",
      maximiza: [
        "Cultiva y demuestra profundidad intelectual real en algo. Al INTP le fascina la competencia genuina en cualquier dominio.",
        "Sé intelectualmente honesto — admite cuando no sabes algo. El INTP tiene un detector de pretensión muy sensible.",
        "Comparte ideas propias no convencionales. El INTP se energiza con perspectivas que expanden su mapa mental."
      ],
      errores: [
        "Intentar manipularlo con lógica defectuosa o argumentos de autoridad. Lo detecta inmediatamente y pierde el interés.",
        "Exigir expresiones emocionales estandarizadas que no son naturales para él. Esto no produce la conexión que se busca — solo tensión.",
        "Saturarlo de demandas sociales. El INTP necesita espacio mental para procesar — sin ese espacio, se apaga."
      ],
      estrategias: [
        "Inicia conversaciones con ideas genuinamente interesantes. El camino al interés de un INTP es siempre intelectual primero.",
        "Muestra que tienes vida propia y proyectos propios. El INTP no quiere ser el centro del mundo de nadie — quiere un igual.",
        "Aprecia el humor seco y la ironía — el INTP usa el wit como canal de conexión cuando el canal emocional directo se siente demasiado expuesto."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ENTJ", por_que: "El ENTJ convierte las ideas del INTP en realidad. El INTP profundiza el pensamiento del ENTJ más allá de lo que la ejecución sola permite. Es una alianza de pensamiento y acción que produce resultados fuera de lo común.", como_atraerla: "Muestra que tus ideas tienen aplicación real, no solo elegancia teórica. El ENTJ respeta la mente pero se mueve por resultados." },
        { tipo: "INFJ", por_que: "El INFJ aporta la dimensión humana y la profundidad emocional que el INTP rara vez accede solo; el INTP aporta el rigor lógico que da solidez a la visión del INFJ.", como_atraerla: "El INFJ busca autenticidad. Sé genuinamente tú mismo — el INFJ lee la inautenticidad como señal de alerta inmediata." },
        { tipo: "ENTP", por_que: "Dos mentes Ne activas que pueden explorar ideas juntos durante horas sin agotarse. El placer intelectual compartido crea una conexión que pocos tipos pueden igualar con el INTP.", como_atraerla: "Llega con ideas propias y el coraje de defenderlas frente al escrutinio. El ENTP en modo intelectual respeta quien puede aguantar el debate." }
      ],
      evitar: { tipo: "ESFJ", razon: "El ESFJ opera desde la armonía social, las tradiciones y las necesidades emocionales del grupo — exactamente las dimensiones donde el INTP tiene menos desarrollo. El ESFJ puede sentirse ignorado emocionalmente; el INTP puede sentirse ahogado por demandas sociales que no comprende." }
    }
  },

  ENTJ: {
    funciones: {
      stack: "Te → Ni → Se → Fi",
      dominante: {
        nombre: "Pensamiento Extrovertido",
        codigo: "Te",
        descripcion: "El ENTJ organiza el mundo externo con eficiencia implacable. Te evalúa constantemente: esto funciona, es el camino más eficiente, qué está bloqueando el objetivo. Esta función lo convierte en un líder natural — no por carisma, sino porque genuinamente sabe cómo organizar personas y recursos para producir resultados."
      },
      auxiliar: {
        nombre: "Intuición Introvertida",
        codigo: "Ni",
        descripcion: "La visión estratégica que alimenta la ejecución. Donde Te pregunta el cómo, Ni pregunta el hacia dónde. El ENTJ ve tendencias antes de que sean obvias y puede anticipar el estado de un sistema en el futuro con una precisión notable. Esta función es la que separa al ENTJ de un simple ejecutor — tiene visión de largo plazo que guía sus decisiones tácticas."
      },
      terciaria: {
        nombre: "Sensación Extrovertida",
        codigo: "Se",
        descripcion: "El ENTJ tiene una apreciación real por la estética, el placer físico y los resultados tangibles. Su Se terciario lo hace más capaz de disfrutar el presente de lo que su perfil sugiere, y le da un instinto de leer la sala que potencia su efectividad como líder en tiempo real."
      },
      inferior: {
        nombre: "Sentimiento Introvertido",
        codigo: "Fi",
        descripcion: "El dominio emocional más personal e íntimo del ENTJ. Bajo estrés extremo, Fi puede emerger de forma desproporcionada — hipersensibilidad a críticas personales, comportamiento que el ENTJ mismo después no reconoce. En modo integrado, Fi le da al ENTJ acceso a sus valores más profundos y le permite liderar con algo más que eficiencia."
      },
      resumen: "El ENTJ es el comandante operativo del sistema. Te ejecuta sin vacilación; Ni provee la dirección estratégica; Se mantiene la conexión con la realidad inmediata; Fi inferior es el núcleo emocional que el ENTJ raramente expone pero que impulsa sus ambiciones más profundas. Es el tipo con mayor capacidad natural de transformar visión en resultado."
    },
    descripcion: "El ENTJ no analiza el liderazgo — lo ejerce por defecto. En cualquier grupo donde no haya una estructura clara, el ENTJ naturalmente tomará el rol de organizador, no por ego sino porque genuinamente detecta la ineficiencia del vacío y tiene los recursos internos para llenarlo. Este instinto organizacional es tan automático como respirar.\n\nSu mayor fortaleza operativa es la combinación de visión de largo plazo (Ni) con capacidad de ejecución sin vacilación (Te). Mientras otros deliberan, el ENTJ decide y actúa. Esto lo hace extraordinariamente efectivo en contextos de alta complejidad y alto riesgo donde la parálisis tiene un costo real. Su debilidad es que esta misma eficiencia puede traducirse en insensibilidad hacia los aspectos humanos de la ecuación.\n\nEn relaciones, el ENTJ es más complejo de lo que parece desde afuera. Su Fi inferior contiene una vida emocional rica que raramente comparte, y cuando decide que alguien es digno de ese nivel de inversión, puede ser uno de los compañeros más leales y comprometidos del sistema. El reto es que llegar a ese punto requiere superar una serie de filtros implícitos que el ENTJ aplica de forma casi inconsciente.",
    social: {
      nivel: "Alto-Estratégico",
      descripcion: "El ENTJ socializa con un propósito subyacente — aunque ese propósito sea simplemente disfrutar de personas interesantes. En grupos, naturalmente se convierte en el punto de referencia para decisiones y dirección. No busca atención — la atención llega porque proyecta competencia y claridad de forma involuntaria.",
      sabotaje: "La tendencia a tratar conversaciones como proyectos optimizables. El ENTJ puede convertir una interacción informal en una sesión de evaluación de competencias sin darse cuenta, generando una sensación de estar siendo juzgado que aleja a personas que podrían ser valiosas."
    },
    apego: {
      estilo: "Seguro-Evitativo",
      descripcion: "El ENTJ tiene una base de apego relativamente segura — es autosuficiente, claro en sus necesidades, y no necesita validación constante. Sin embargo, su orientación natural hacia la independencia y el logro puede derivar en patrones evitativos cuando la relación requiere una presencia emocional que su Te no sabe cómo proporcionar.",
      en_pareja: "Necesita una pareja que tenga su propia identidad y proyectos potentes. Un ENTJ con una pareja dependiente eventualmente pierde el respeto que necesita para sostener el interés. Con alguien que puede sostenerle el paso intelectual y desafiarle, el ENTJ puede ser un compañero extraordinariamente comprometido.",
      trigger: "La incompetencia sin intención de mejorar, la falta de dirección personal en el otro, y los conflictos emocionales que no tienen un camino lógico de resolución."
    },
    lenguajes: [
      { nombre: "Actos de Servicio", posicion: 1, descripcion: "El ENTJ muestra amor resolviendo, optimizando y construyendo para el otro. Si invierte su tiempo y capacidad operativa en mejorar tu situación, eso es amor en su idioma más nativo." },
      { nombre: "Palabras de Afirmación", posicion: 2, descripcion: "El ENTJ valora el reconocimiento de su competencia y sus logros. No necesita halago — necesita que sus contribuciones reales sean vistas y nombradas con precisión." },
      { nombre: "Tiempo de Calidad", posicion: 3, descripcion: "El tiempo del ENTJ es su recurso más escaso. Cuando elige dedicártelo — sin agenda, sin objetivo de optimización — es una de las señales más claras de que genuinamente te valora." }
    ],
    fortalezas: [
      { titulo: "Liderazgo de ejecución", desc: "Convierte visiones en planes en resultados con una eficiencia que pocos tipos igualan. Su Te dominante organiza personas y recursos de forma intuitiva." },
      { titulo: "Pensamiento estratégico de largo plazo", desc: "Ni auxiliar le da visión del estado futuro del sistema, lo que le permite anticipar problemas y oportunidades antes de que sean evidentes para otros." },
      { titulo: "Decisión bajo incertidumbre", desc: "No necesita información perfecta para actuar. Evalúa la situación con la información disponible, toma la mejor decisión posible, y ajusta en movimiento." },
      { titulo: "Ambición estructurada", desc: "No solo quiere llegar alto — sabe exactamente cómo construir el camino. Su ambición está siempre acompañada de un plan concreto." },
      { titulo: "Alta tolerancia a la complejidad", desc: "Prospera en entornos de múltiples variables, alta presión y stakes elevados. La complejidad que paraliza a otros es el ambiente en que el ENTJ funciona mejor." },
      { titulo: "Capacidad de hacer crecer a otros", desc: "Cuando está en modo mentoring genuino, el ENTJ puede ser uno de los potenciadores de talento más efectivos del sistema, porque ve el potencial real y sabe cómo desarrollarlo." },
      { titulo: "Resistencia a la manipulación", desc: "Su Te evalúa lógicamente cada situación. Los intentos de manipulación emocional o de autoridad sin sustancia son identificados y descartados." }
    ],
    debilidades: [
      { titulo: "Baja tolerancia a la incompetencia percibida", desc: "Puede ser cortante o desestimador con quienes no operan a su nivel de velocidad o rigor. Esto genera conflicto innecesario y puede alienar colaboradores valiosos." },
      { titulo: "Dificultad para acceder a vulnerabilidad", desc: "Su Fi inferior raramente se muestra. En relaciones íntimas, esta dificultad para expresar la dimensión emocional puede generar una sensación de distancia que el ENTJ no sabe cómo cerrar." },
      { titulo: "Tendencia a la sobreextensión", desc: "El ENTJ puede aceptar más proyectos, responsabilidades y compromisos de los que puede ejecutar bien. La ambición puede superar la capacidad de entrega." },
      { titulo: "Dificultad para recibir crítica personal", desc: "La crítica a su trabajo puede manejarse bien — la crítica a su persona activa su Fi inferior de forma desproporcionada." },
      { titulo: "Relegar la vida emocional", desc: "En la priorización implacable del ENTJ, las necesidades emocionales propias y ajenas pueden quedar sistemáticamente en la parte baja de la lista hasta que el costo de esa omisión se hace evidente." }
    ],
    atraccion: {
      tipo: "Atracción por competencia y potencia personal",
      descripcion: "El ENTJ atrae por proyección de poder genuino — no arrogancia performativa, sino la capacidad real de mover el mundo en una dirección. Esto combinado con la rareza de alguien que no necesita nada del otro para sentirse completo genera una atracción de alto voltaje en personas de calibre.",
      maximiza: [
        "Ten dirección clara y proyectos concretos. El ENTJ no invierte en quien no tiene su propio destino en mente.",
        "Demuestra competencia genuina en tu dominio. El respeto del ENTJ es ganado con demostración, no con declaración.",
        "No cedas en los debates intelectuales por comodidad social. El ENTJ valora quien puede sostener una posición bajo presión."
      ],
      errores: [
        "Mostrar falta de ambición o dirección. Esto genera desinterés casi inmediato en el ENTJ.",
        "Intentar controlarlo o limitar su capacidad de acción. La jaula, aunque dorada, activa el modo de desconexión.",
        "Apelar a la emoción como argumento. El ENTJ evalúa lógicamente — la emoción sin sustancia racional no mueve su posición."
      ],
      estrategias: [
        "Construye un perfil de alto rendimiento real en tu campo. El ENTJ quiere un igual en capacidad, no un admirador.",
        "Muéstrate capaz de desafiarle intelectualmente sin necesitar su aprobación para hacerlo.",
        "Proyecta independencia completa. El ENTJ es atraído por quien claramente no lo necesita — y elige estar allí de todas formas."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "INTP", por_que: "El INTP profundiza el pensamiento que el ENTJ luego ejecuta. El ENTJ da al INTP el contexto de realidad y urgencia que convierte sus ideas en algo que importa más allá del ejercicio intelectual.", como_atraerla: "Muestra que valoras las ideas por su rigor, no solo por su utilidad inmediata. El INTP necesita sentir que su forma de pensar es respetada." },
        { tipo: "INFJ", por_que: "El INFJ aporta profundidad humana y valores que anclan la ambición del ENTJ en algo más que el logro por el logro. El ENTJ aporta la capacidad de convertir la visión del INFJ en impacto real en el mundo.", como_atraerla: "El INFJ busca alineación de valores. Muestra que hay un por qué genuino detrás de tu ambición." },
        { tipo: "INTJ", por_que: "Dos estrategas con diferentes estilos — el ENTJ domina la ejecución externa; el INTJ domina la arquitectura interna. La combinación produce una potencia intelectual y operativa excepcional.", como_atraerla: "El INTJ respeta la competencia silenciosa más que la declarada. Deja que tu historial de resultados hable." }
      ],
      evitar: { tipo: "ISFP", razon: "El ISFP valora la armonía, la expresión personal y el ritmo orgánico. El ENTJ valora la eficiencia, los resultados y la estructura. Lo que el ENTJ percibe como ejecución necesaria, el ISFP puede sentir como agresividad; lo que el ISFP valora como autenticidad, el ENTJ puede ver como falta de dirección." }
    }
  },

  ENTP: {
    funciones: {
      stack: "Ne → Ti → Fe → Si",
      dominante: {
        nombre: "Intuición Extrovertida",
        codigo: "Ne",
        descripcion: "El ENTP ve posibilidades en todas partes. Su Ne dominante mapea constantemente el espacio de lo posible — conexiones entre ideas, ángulos no explorados, implicaciones no obvias. Esta función hace al ENTP extraordinariamente estimulante intelectualmente y también terriblemente inconsistente: cuando Ne ve una posibilidad nueva más interesante que la actual, cambia de dirección."
      },
      auxiliar: {
        nombre: "Pensamiento Introvertido",
        codigo: "Ti",
        descripcion: "El árbitro lógico interno. Donde Ne genera posibilidades, Ti las evalúa con rigor estructural. El ENTP no solo tiene ideas — puede defender cada una con una arquitectura lógica sólida. Esta combinación lo hace potencialmente el debatidor más efectivo del sistema: creatividad sin límites más rigor sin sentimentalismo."
      },
      terciaria: {
        nombre: "Sentimiento Extrovertido",
        codigo: "Fe",
        descripcion: "La dimensión social del ENTP. Más desarrollada que en el INTP, Fe le da una comprensión intuitiva del clima emocional de los grupos y la capacidad de adaptarse a él estratégicamente. El ENTP puede usar Fe para conectar o para influir — y es muy consciente de la diferencia."
      },
      inferior: {
        nombre: "Sensación Introvertida",
        codigo: "Si",
        descripcion: "La función de rutina, consistencia y cuidado del detalle práctico. El ENTP tiende a ignorar los detalles de mantenimiento — salud, finanzas cotidianas, compromisos repetitivos — hasta que el costo de esa negligencia se hace evidente. En modo sano, Si integrado da al ENTP la estabilidad operativa que necesita para que sus ideas aterricen."
      },
      resumen: "El ENTP es el explorador intelectual más activo del sistema. Ne genera el territorio; Ti lo cartografía con rigor; Fe le permite influir en otros mientras lo hace; Si inferior es el ancla que muchas veces se suelta cuando Ne ve algo nuevo en el horizonte. La integración de estas cuatro funciones produce la mente más versátil y adaptable del sistema."
    },
    descripcion: "El ENTP no puede evitar ver los ángulos que otros no ven. En cualquier situación, su mente mapea automáticamente las alternativas, las inconsistencias y las posibilidades no exploradas. Esto puede ser enormemente valioso en contextos de innovación y problema-solución, y profundamente desestabilizador en contextos donde la consistencia y la ejecución son lo que se necesita.\n\nSu amor por el debate no es agresividad — es su forma de refinar ideas. El ENTP usa la confrontación intelectual como herramienta de pensamiento. Cuando debate una posición, no necesariamente cree en ella — la está explorando. Este estilo puede generar confusión en personas que no distinguen entre exploración intelectual y posición personal, y puede ser percibido como manipulador cuando en realidad es simplemente curiosidad sin filtro.\n\nEn relaciones, el ENTP es uno de los compañeros más estimulantes y más frustrantes del sistema. Estimulante porque su Ne constantemente expande la perspectiva del otro y genera una sensación de vivir en expansión continua. Frustrante porque esa misma Ne puede hacer que el ENTP cambie de posición, proyecto o prioridad con una velocidad que el otro no puede seguir. La clave para una relación satisfactoria con un ENTP es entender que su inconsistencia superficial coexiste con lealtades profundas.",
    social: {
      nivel: "Alto-Exploratorio",
      descripcion: "El ENTP florece en contextos sociales intelectualmente estimulantes. Puede adaptarse a prácticamente cualquier grupo (Fe terciario), pero donde realmente se enciende es en conversaciones que desafían su mapa mental. En grupos planos o de conversación superficial, puede volverse disruptivo por aburrimiento.",
      sabotaje: "El debate sin calibración. El ENTP puede desafiar ideas o creencias de otros sin medir el impacto emocional de esa confrontación. Lo que para él es exploración intelectual emocionante, para el otro puede ser una experiencia invalidante. La inteligencia social del ENTP necesita incluir cuándo no usar la espada."
    },
    apego: {
      estilo: "Evitativo",
      descripcion: "El ENTP tiene un estilo de apego predominantemente evitativo — no por incapacidad de conectar, sino porque su Ne constantemente ve otras posibilidades y su autonomía es uno de sus valores más profundos. El compromiso puede sentirse como limitación de opciones, y el ENTP procesa eso con incomodidad genuina.",
      en_pareja: "Necesita una pareja que sea intelectualmente estimulante, que respete su necesidad de exploración y espacio, y que no interprete su variabilidad como falta de compromiso real. Con alguien que puede seguir su ritmo mental, el ENTP puede ser un compañero extraordinariamente leal en lo que importa — aunque no en los rituales de pareja convencionales.",
      trigger: "Sentirse atrapado en rutinas que no tienen sentido para él, demandas de consistencia emocional que superan su capacidad de Si, y la percepción de que el otro está intentando controlarlo o predecirlo."
    },
    lenguajes: [
      { nombre: "Palabras de Afirmación", posicion: 1, descripcion: "El ENTP necesita que su inteligencia, originalidad y perspectiva sean reconocidas genuinamente. No halago superficial — reconocimiento específico de lo que hace bien y de forma única." },
      { nombre: "Tiempo de Calidad", posicion: 2, descripcion: "Para el ENTP, compartir exploración intelectual es el modo más alto de intimidad. Conversaciones profundas, nuevas experiencias, desafíos compartidos — ese tiempo es donde el vínculo real se construye." },
      { nombre: "Actos de Servicio", posicion: 3, descripcion: "Cuando el ENTP hace el esfuerzo de ayudar con algo que no le resulta naturalmente estimulante — las tareas rutinarias, el seguimiento consistente — es una señal clara de que la relación importa más que su comodidad predeterminada." }
    ],
    fortalezas: [
      { titulo: "Pensamiento creativo y no convencional", desc: "La combinación Ne-Ti produce soluciones que nadie más habría encontrado porque nadie más habría explorado ese espacio del problema." },
      { titulo: "Adaptabilidad cognitiva", desc: "Puede pivotar de posición con rapidez cuando la evidencia lo requiere, sin el costo emocional que ese cambio tiene para tipos con funciones perceptivas más rígidas." },
      { titulo: "Capacidad de debate y persuasión", desc: "Puede construir y defender argumentos para múltiples posiciones con igual efectividad. Esto lo hace potente en negociación, ventas de alto nivel y cualquier contexto donde la habilidad argumentativa sea diferenciador." },
      { titulo: "Visión sistémica horizontal", desc: "Donde el INTJ ve en profundidad vertical, el ENTP ve en anchura horizontal — las conexiones laterales entre sistemas y dominios que parecen no relacionados." },
      { titulo: "Tolerancia a la ambigüedad", desc: "Puede operar con alta efectividad en situaciones sin estructura clara o información incompleta. La incertidumbre no lo paraliza — lo estimula." },
      { titulo: "Influencia social inteligente", desc: "Su Fe terciario le da comprensión del dinamismo social que pocos tipos Thinking tienen. Puede leer grupos y calibrar su comunicación para maximizar impacto." },
      { titulo: "Generación de ideas sin bloqueo", desc: "La inhibición creativa que afecta a muchos tipos es casi ausente en el ENTP. Puede generar posibilidades indefinidamente, lo cual es el recurso más valioso en la fase de ideación de cualquier proyecto." }
    ],
    debilidades: [
      { titulo: "Dificultad para cerrar y ejecutar", desc: "Ne siempre ve algo más interesante en el horizonte. El follow-through en proyectos que han perdido novedad puede ser un desafío estructural." },
      { titulo: "Negligencia de lo rutinario", desc: "Su Si inferior hace que los sistemas de mantenimiento — salud, finanzas, compromisos repetitivos — queden relegados hasta que el costo de esa negligencia se hace urgente." },
      { titulo: "El debate como arma involuntaria", desc: "Puede herir relaciones que valora con una confrontación intelectual que para él es juego pero para el otro es ataque." },
      { titulo: "Inconsistencia en compromisos", desc: "Lo que prometió con convicción ayer puede sentirse limitante hoy cuando Ne ve nuevas posibilidades. Esto erosiona la confianza de quienes dependen de su consistencia." },
      { titulo: "Dificultad para profundizar en un solo dominio", desc: "La misma Ne que lo hace brillante en anchura puede impedirle desarrollar la profundidad en un área específica que el éxito a largo plazo requiere." }
    ],
    atraccion: {
      tipo: "Atracción por estímulo intelectual y energía expansiva",
      descripcion: "El ENTP atrae por su energía mental contagiosa — estar cerca de un ENTP se siente como vivir en un estado de expansión continua. Su capacidad de ver posibilidades en todo y de hacer que el otro se sienta más inteligente y más capaz es profundamente atractiva. La rareza de alguien que genuinamente disfruta ser desafiado completa el cuadro.",
      maximiza: [
        "Ten perspectivas propias bien desarrolladas que estés dispuesto a defender. El ENTP se aburre de los que ceden en el primer desafío.",
        "Muéstrate intelectualmente curioso y dispuesto a explorar terrenos no convencionales.",
        "Proyecta independencia real. El ENTP no quiere ser el más brillante de la pareja — quiere que su par brille también."
      ],
      errores: [
        "Intentar predecirlo o encasillarlo. Ne no tiene una trayectoria lineal y cualquier intento de forzarla genera rechazo.",
        "Tomar sus argumentos exploratorios como posiciones fijas y atacarlas como tal.",
        "Exigir la consistencia emocional que su Si inferior no puede proporcionar de forma natural sin desarrollo consciente."
      ],
      estrategias: [
        "Inicia exploraciones intelectuales genuinas — no debates performativos, sino curiosidad real.",
        "Muéstrate cómodo con la incertidumbre y el cambio. El ENTP necesita sentir que su naturaleza exploratoria no amenaza la relación.",
        "Calibra cuándo entrar en modo juego intelectual y cuándo simplemente conectar emocionalmente — el ENTP aprecia quien distingue esos dos modos."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "INFJ", por_que: "El INFJ aporta profundidad, valores y la capacidad de anclar la exploración del ENTP en algo significativo. El ENTP expande el mundo del INFJ y desafía su pensamiento de formas que ningún otro tipo puede igualar.", como_atraerla: "Muestra que bajo la exploración hay valores reales. El INFJ no invierte en quienes parecen tener solo brillo sin sustancia." },
        { tipo: "INTP", por_que: "Dos mentes con Ne activo que pueden explorar juntos indefinidamente. El INTP aporta un rigor Ti que desafía y refina las ideas del ENTP; el ENTP aporta la energía externa que el INTP raramente genera solo.", como_atraerla: "Llega con rigor, no solo entusiasmo. El INTP respeta la capacidad de sostener una posición bajo análisis real." },
        { tipo: "ENFJ", por_que: "El ENFJ aporta calidez, estructura social y la capacidad de convertir las ideas del ENTP en conexión humana real. El ENTP desafía el consenso del ENFJ de formas que lo hacen crecer.", como_atraerla: "Muéstrate genuinamente comprometido con el bienestar de las personas que importan. El ENFJ necesita ver que el brillo del ENTP está al servicio de algo más que el juego intelectual." }
      ],
      evitar: { tipo: "ISTJ", razon: "El ISTJ valora la consistencia, los sistemas probados y la responsabilidad estructural. El ENTP valora la exploración, la novedad y la libertad de cambiar de dirección. Lo que el ISTJ percibe como compromiso necesario, el ENTP puede sentir como rigidez; lo que el ENTP percibe como adaptabilidad, el ISTJ puede ver como irresponsabilidad." }
    }
  },

  ISTJ: {
    funciones: {
      stack: "Si → Te → Fi → Ne",
      dominante: {
        nombre: "Sensación Introvertida",
        codigo: "Si",
        descripcion: "El ISTJ construye su mundo sobre datos experienciales verificados. Si almacena con alta fidelidad las experiencias pasadas y las usa como referencia para navegar el presente. Esto da al ISTJ una confiabilidad extraordinaria — no improvisa, aplica lo que ha demostrado funcionar. La memoria del ISTJ no es nostálgica; es un sistema de referencia operacional."
      },
      auxiliar: {
        nombre: "Pensamiento Extrovertido",
        codigo: "Te",
        descripcion: "La función ejecutora que convierte la experiencia acumulada del ISTJ en sistemas y procedimientos eficientes. Te organiza el entorno externo con lógica práctica: cada proceso tiene una razón, cada responsabilidad tiene un dueño, cada resultado tiene un estándar. El ISTJ no solo hace las cosas — las hace dentro de estructuras que garantizan consistencia."
      },
      terciaria: {
        nombre: "Sentimiento Introvertido",
        codigo: "Fi",
        descripcion: "Los valores personales del ISTJ. Opera silenciosamente pero establece líneas éticas absolutas. El ISTJ puede parecer emocionalmente reservado, pero tiene un núcleo de principios inamovibles que guían cada decisión importante. Cuando algo viola esos principios, la respuesta del ISTJ es firme aunque raramente expresada de forma dramática."
      },
      inferior: {
        nombre: "Intuición Extrovertida",
        codigo: "Ne",
        descripcion: "El dominio menos desarrollado: la exploración de posibilidades no probadas, el cambio sin precedente, la ambigüedad estructural. Bajo estrés, el ISTJ puede catastrofizar con una Ne en espiral — imaginando los peores escenarios posibles de forma sistemática. En modo sano, Ne integrado le permite al ISTJ ver oportunidades y adaptarse a cambios sin paralizarse."
      },
      resumen: "El ISTJ es el guardián más confiable del sistema. Si ancla en lo verificado; Te organiza la ejecución; Fi mantiene la brújula ética; Ne inferior es su puerta menos desarrollada hacia lo nuevo. Es el tipo más consistente y fiable del sistema — lo que promete, lo entrega."
    },
    descripcion: "El ISTJ es la columna vertebral de cualquier sistema que funciona. Mientras otros tipos generan ideas o inspiran a otros, el ISTJ garantiza que las cosas realmente sucedan — a tiempo, dentro del estándar acordado, sin excusas. Esta orientación hacia la responsabilidad no es conformismo; es un código de honor interno que el ISTJ aplica con igual rigor a sí mismo que a cualquier otro compromiso.\n\nSu relación con el cambio es compleja. El ISTJ no rechaza el cambio per se — rechaza el cambio sin justificación verificada. Si puedes demostrar con evidencia concreta que el nuevo enfoque es superior al establecido, el ISTJ lo adoptará con la misma disciplina con que aplicó el anterior. Lo que no tolerará es el cambio por moda, por novedad o por preferencia subjetiva sin sustento en resultados probados.\n\nEn relaciones, el ISTJ es uno de los compañeros más sólidos del sistema MBTI — pero requiere tiempo para abrir capas. La lealtad del ISTJ no se declara; se demuestra a través de años de acciones consistentes. Quien tiene un ISTJ comprometido en su vida tiene algo extraordinariamente raro en el mundo contemporáneo: alguien en quien puede confiar completamente, sin condiciones ni sorpresas.",
    social: {
      nivel: "Bajo-Funcional",
      descripcion: "El ISTJ no necesita socialización para su bienestar emocional de la misma forma que los tipos extrovertidos. Prefiere interacciones con propósito claro — trabajo, responsabilidades compartidas, círculos de confianza establecidos. No es antisocial; es selectivo con donde invierte su energía social.",
      sabotaje: "La rigidez percibida en contextos casuales. El ISTJ puede ser percibido como distante o poco dispuesto a fluir, especialmente en situaciones sociales donde la improvisación y la ligereza son valoradas. Esto puede crear una primera impresión menos favorable que no refleja la profundidad real de la persona."
    },
    apego: {
      estilo: "Seguro",
      descripcion: "El ISTJ tiende hacia un estilo de apego relativamente seguro — sabe lo que quiere, es claro en sus compromisos, y no juega juegos emocionales. Su constancia y confiabilidad crean una base estable para las relaciones, aunque su expresión emocional limitada puede hacer que esa seguridad no sea obvia para el otro.",
      en_pareja: "Necesita consistencia y respeto por sus sistemas y rutinas. No es inflexible — es predecible, lo cual es una fortaleza enorme. Con una pareja que aprecia la confiabilidad sobre la emoción superficial, el ISTJ puede construir una relación extraordinariamente sólida a largo plazo.",
      trigger: "La irresponsabilidad repetida, los compromisos rotos sin causa justificada, y el caos introducido en sistemas que funcionaban. También le cuesta mucho la inestabilidad emocional impredecible del otro."
    },
    lenguajes: [
      { nombre: "Actos de Servicio", posicion: 1, descripcion: "El ISTJ expresa amor haciendo. Repara, organiza, resuelve, mantiene. Si el ISTJ está invirtiendo su tiempo y energía práctica en mejorar tu vida cotidiana, eso es amor en su forma más natural y genuina." },
      { nombre: "Palabras de Afirmación", posicion: 2, descripcion: "El ISTJ valora el reconocimiento genuino de su confiabilidad y su contribución real. No necesita halagos — necesita que sus acciones constantes sean vistas y nombradas. El agradecimiento específico es el combustible de su compromiso." },
      { nombre: "Tiempo de Calidad", posicion: 3, descripcion: "El tiempo compartido en actividades concretas — proyectos, responsabilidades, rituales cotidianos — es como el ISTJ construye vínculo. No necesita que ese tiempo sea extraordinario; necesita que sea consistente." }
    ],
    fortalezas: [
      { titulo: "Confiabilidad absoluta", desc: "Lo que el ISTJ dice que hará, lo hace. Esta consistencia entre palabra y acción es uno de los activos más valiosos en cualquier contexto personal o profesional." },
      { titulo: "Atención al detalle", desc: "Ve los detalles que otros pasan por alto. Esta capacidad de procesar con precisión es crítica en cualquier dominio donde los errores tienen costo real." },
      { titulo: "Resistencia y disciplina", desc: "Puede sostener esfuerzo constante durante periodos prolongados sin necesitar validación externa o motivación emocional. La disciplina del ISTJ es estructural, no dependiente del estado de ánimo." },
      { titulo: "Juicio basado en evidencia", desc: "No toma decisiones por intuición ni por presión emocional. Basa sus conclusiones en hechos verificados y experiencia probada, lo que da a sus juicios una fiabilidad que pocos tipos igualan." },
      { titulo: "Gestión de responsabilidades", desc: "Puede manejar múltiples compromisos simultáneamente sin perder ninguno de vista. Su Si dominante actúa como un sistema de tracking interno que no falla." },
      { titulo: "Integridad ética consistente", desc: "Sus principios no cambian con el contexto ni con la conveniencia. Esta consistencia ética genera confianza en todos los que lo conocen bien." },
      { titulo: "Eficiencia práctica", desc: "Encuentra el camino más directo y confiable entre el punto A y el punto B. No busca la solución más elegante — busca la que funciona de forma probada." }
    ],
    debilidades: [
      { titulo: "Resistencia al cambio no justificado", desc: "Puede mantener sistemas o enfoques que ya no son óptimos simplemente porque han funcionado antes. La evidencia de que algo nuevo es mejor necesita ser sustancial para mover al ISTJ." },
      { titulo: "Expresión emocional limitada", desc: "Sus emociones son reales pero raramente salen. Esto puede generar una percepción de frialdad en personas que necesitan expresión emocional visible para sentirse conectadas." },
      { titulo: "Dificultad con la ambigüedad", desc: "Los entornos sin estructura clara o con reglas cambiantes generan un nivel de estrés en el ISTJ que puede traducirse en rigidez o bloqueo." },
      { titulo: "Tendencia al juicio implícito", desc: "Sus estándares altos pueden traducirse en un juicio silencioso — pero perceptible — hacia quienes no los cumplen. Esto puede generar tensión en relaciones con personas más caóticas o impulsivas." },
      { titulo: "Dificultad para ver oportunidades no probadas", desc: "Su Ne inferior significa que puede perderse oportunidades genuinamente nuevas por no tener precedente en su base de experiencias." }
    ],
    atraccion: {
      tipo: "Atracción por solidez y confiabilidad demostrada",
      descripcion: "El ISTJ atrae con una presencia que comunica solidez, confiabilidad y seriedad sin necesidad de declararlo. En un mundo de performance y exceso de promesas, alguien que simplemente hace lo que dice genera una atracción específica y poderosa en personas que valoran la sustancia sobre el espectáculo.",
      maximiza: [
        "Mantén compromisos de forma consistente. El ISTJ no está impresionado por la grandeza ocasional — está impresionado por la confiabilidad cotidiana.",
        "Demuestra responsabilidad en tu propia vida. El ISTJ valora profundamente a quien tiene su mundo en orden.",
        "Respeta sus sistemas y rutinas. No los veas como rigidez — entiéndelos como la arquitectura que permite su alto funcionamiento."
      ],
      errores: [
        "Incumplir compromisos repetidamente. Para el ISTJ, esto es una señal de incompatibilidad de valores, no solo de comportamiento.",
        "Introducir caos o cambio constante sin justificación. El ISTJ necesita estabilidad para operar a su nivel óptimo.",
        "Esperar expresiones dramáticas de afecto. El ISTJ expresa amor a través de acciones consistentes — aprenderlas a leer es fundamental."
      ],
      estrategias: [
        "Construye un historial de confiabilidad. El ISTJ invierte en quienes demuestran consistencia a lo largo del tiempo, no en quienes impresionan momentáneamente.",
        "Sé claro y directo en tus intenciones. El ISTJ no lee bien las señales indirectas — la comunicación explícita construye más confianza.",
        "Comparte proyectos y responsabilidades concretas. El ISTJ conecta a través de la acción compartida más que a través de la conversación abstracta."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ESFJ", por_que: "El ESFJ aporta la calidez social y la orientación hacia las personas que el ISTJ tiene menos desarrollada. El ISTJ aporta la solidez estructural y la confiabilidad que el ESFJ necesita como base para su mundo relacional.", como_atraerla: "Muestra consistencia y fiabilidad. El ESFJ valora profundamente sentirse seguro con alguien." },
        { tipo: "ISFJ", por_que: "Dos tipos Si dominantes que comparten la misma orientación hacia la responsabilidad y la confiabilidad. Profunda comprensión mutua sin necesidad de traducción. La diferencia Fe/Te aporta complementariedad en los estilos de expresión.", como_atraerla: "Demuestra cuidado genuino a través de acciones concretas. El ISFJ lee el amor en los detalles del servicio." },
        { tipo: "ESTJ", por_que: "Orientación compartida hacia la responsabilidad, los sistemas y la ejecución. Ambos operan desde Te y comparten valores de integridad y competencia. La diferencia Si/Se aporta perspectivas complementarias.", como_atraerla: "Muestra rigor en tu propio dominio. El ESTJ respeta la competencia demostrada por encima de cualquier otra señal." }
      ],
      evitar: { tipo: "ENFP", razon: "El ENFP vive en posibilidades, espontaneidad y exploración constante — exactamente lo opuesto a la base verificada y consistente que el ISTJ necesita. Lo que el ENFP percibe como libertad y creatividad, el ISTJ puede vivir como caos e irresponsabilidad." }
    }
  },

  ISFJ: {
    funciones: {
      stack: "Si → Fe → Ti → Ne",
      dominante: {
        nombre: "Sensación Introvertida",
        codigo: "Si",
        descripcion: "El ISFJ construye su mundo sobre experiencias verificadas y memorias ricas en detalle. Si almacena no solo hechos sino el contexto emocional de las experiencias, lo que permite al ISFJ recordar con precisión cómo se sentía cada persona en cada momento. Esta función hace al ISFJ extraordinariamente sensible a los detalles que importan a las personas que le importan."
      },
      auxiliar: {
        nombre: "Sentimiento Extrovertido",
        codigo: "Fe",
        descripcion: "La función social del ISFJ. Fe le da una comprensión intuitiva de las necesidades emocionales del entorno y un impulso genuino de satisfacerlas. El ISFJ no solo detecta cuando alguien está mal — siente el impulso interno de hacer algo al respecto. Esta función es la fuente de su profunda orientación al cuidado y su capacidad de crear entornos donde otros se sienten verdaderamente vistos."
      },
      terciaria: {
        nombre: "Pensamiento Introvertido",
        codigo: "Ti",
        descripcion: "El sistema lógico interno del ISFJ. No tan prominente como en los tipos T, pero presente como árbitro interno que evalúa si algo tiene sentido. Ti le da al ISFJ la capacidad de análisis práctico que equilibra la orientación emocional de Fe — puede tomar decisiones difíciles cuando el razonamiento lo requiere."
      },
      inferior: {
        nombre: "Intuición Extrovertida",
        codigo: "Ne",
        descripcion: "El dominio de las posibilidades no probadas y el cambio disruptivo. El ISFJ tiende a preferir lo conocido y verificado sobre lo potencialmente mejor pero no probado. Bajo estrés, Ne puede generar preocupación catastrófica sobre futuros posibles. En modo sano, Ne integrado amplía la perspectiva del ISFJ y le permite adaptarse con más fluidez."
      },
      resumen: "El ISFJ es el cuidador más profundo del sistema. Si captura el detalle experiencial que permite el cuidado personalizado; Fe impulsa la orientación genuina hacia el bienestar del otro; Ti ofrece análisis cuando la emoción no es suficiente; Ne inferior es su mayor área de crecimiento — aprender a abrazar lo no probado."
    },
    descripcion: "El ISFJ ve el mundo como una red de personas que necesitan cuidado, y se siente responsable de proporcionar ese cuidado a quienes están dentro de su círculo. Esta orientación no es debilidad — es una forma de amor en acción. El ISFJ recuerda el cumpleaños de cada persona que importa, nota cuando algo ha cambiado en el estado emocional de quien conoce bien, y actúa silenciosamente para hacer que las cosas estén bien para los que quiere.\n\nSu mayor vulnerabilidad es la tendencia a dar sin comunicar lo que necesita. El ISFJ puede generar expectativas tácitas — espera que el mismo nivel de atención y cuidado que él proporciona sea correspondido, y cuando no lo es, la decepción puede acumularse en capas silenciosas que eventualmente se convierten en resentimiento. La expresión directa de necesidades es el área de mayor crecimiento para el ISFJ.\n\nEn relaciones íntimas, el ISFJ es uno de los compañeros más devotos y consistentes del sistema. No busca drama ni intensidad artificial — busca profundidad construida a lo largo del tiempo a través del cuidado mutuo y la confianza acumulada. Quien gana la lealtad de un ISFJ tiene un aliado para la vida, alguien que literalmente recuerda y atesora cada detalle de lo que compartieron.",
    social: {
      nivel: "Moderado-Orientado al Círculo Íntimo",
      descripcion: "El ISFJ funciona mejor en grupos pequeños donde puede conocer a las personas en profundidad. En grupos grandes, puede parecer reservado, pero dentro de su círculo de confianza es notablemente cálido, atento y presente. Su energía social está orientada a la profundidad, no a la amplitud.",
      sabotaje: "La dificultad para establecer límites claros. El ISFJ puede decir sí cuando quería decir no, acomodar a otros a costo de su propio bienestar, y después resentirse silenciosamente. Esta pauta genera dinámicas relacionales donde otros inconscientemente toman más de lo que deberían porque el ISFJ nunca indica cuándo se ha cruzado una línea."
    },
    apego: {
      estilo: "Ansioso",
      descripcion: "El ISFJ tiende hacia un estilo de apego ansioso — su orientación natural hacia el cuidado del otro puede combinarse con una necesidad de confirmación de que el vínculo es recíproco. Cuando esa confirmación no llega de forma clara, el ISFJ puede entrar en ciclos de hipervigilancia relacional o de supercuidado como forma de asegurar la conexión.",
      en_pareja: "Necesita expresiones claras y consistentes de que es valorado y que la relación es sólida. No le pide declaraciones dramáticas — le piden consistencia y pequeños gestos que confirmen que está en la mente del otro. Con una pareja segura que comunica con claridad, el ISFJ puede desarrollar un apego profundamente estable.",
      trigger: "La ambigüedad sobre el estado de la relación, la frialdad repentina sin explicación, y sentir que su cuidado constante no está siendo visto ni correspondido."
    },
    lenguajes: [
      { nombre: "Actos de Servicio", posicion: 1, descripcion: "El ISFJ da amor a través del servicio detallado y personalizado — no servicio genérico, sino acciones que demuestran que prestó atención a lo que específicamente necesitas. Recibir ese mismo cuidado específico de vuelta es profundamente significativo para él." },
      { nombre: "Palabras de Afirmación", posicion: 2, descripcion: "El ISFJ necesita escuchar que lo que hace importa, que su presencia es valorada. No el halago general — el reconocimiento específico de los cuidados concretos que ha proporcionado." },
      { nombre: "Tiempo de Calidad", posicion: 3, descripcion: "El tiempo compartido en actividades significativas — rituales, tradiciones, momentos cotidianos que se convierten en historia compartida — es donde el ISFJ construye el sentido de pertenencia más profundo." }
    ],
    fortalezas: [
      { titulo: "Memoria emocional excepcional", desc: "Recuerda con alta precisión lo que importa a cada persona que conoce — sus preferencias, sus miedos, sus momentos difíciles. Esta capacidad permite un nivel de cuidado personalizado que pocos tipos pueden igualar." },
      { titulo: "Consistencia en el cuidado", desc: "No cuida solo cuando tiene energía o estado de ánimo favorable. El ISFJ cuida de forma constante y sistemática, convirtiendo el amor en hábito." },
      { titulo: "Creación de entornos seguros", desc: "Tiene una habilidad natural para hacer que los espacios y las interacciones se sientan seguros para los demás. Bajo su presencia, las personas tienden a abrirse y sentirse vistas." },
      { titulo: "Atención al detalle práctico", desc: "Ve los detalles que hacen que la vida cotidiana funcione bien. Esta atención crea entornos de alta funcionalidad que otros disfrutan sin necesariamente entender cómo se mantienen." },
      { titulo: "Lealtad de largo plazo", desc: "Una vez que ha decidido que alguien importa, esa decisión es prácticamente irreversible. El ISFJ es el tipo de persona que sigue siendo leal años después de que otros habrían seguido adelante." },
      { titulo: "Paciencia genuina", desc: "Puede sostener paciencia real con las imperfecciones y los procesos de crecimiento de quienes quiere. Esta paciencia no es resignación — es fe en las personas." },
      { titulo: "Habilidades prácticas de apoyo", desc: "No solo quiere ayudar — sabe exactamente cómo hacerlo de formas concretas y útiles. El ISFJ traduce el cuidado abstracto en acciones específicas y prácticas." }
    ],
    debilidades: [
      { titulo: "Dificultad para establecer límites", desc: "Su Fe dominante crea un impulso constante de acomodar las necesidades de otros, a veces a costo de las propias. Los límites se sienten como abandono del cuidado, no como autoprotección necesaria." },
      { titulo: "Tendencia a acumular resentimiento silencioso", desc: "Cuando da mucho sin comunicar lo que necesita, el resentimiento puede acumularse silenciosamente hasta que emerge de formas que sorprenden a quienes creían que todo estaba bien." },
      { titulo: "Resistencia al cambio no gradual", desc: "Los cambios abruptos en sistemas o relaciones generan un nivel de estrés significativo. El ISFJ prefiere las transiciones lentas y verificadas." },
      { titulo: "Autocrítica excesiva", desc: "Aplica a sí mismo estándares más altos que a cualquier otro. Cuando falla en sus propias expectativas de cuidado, la autocrítica puede ser desproporcionada." },
      { titulo: "Dificultad para priorizar sus propias necesidades", desc: "En la jerarquía natural del ISFJ, las necesidades propias frecuentemente quedan al final. Esto puede generar desgaste real a largo plazo." }
    ],
    atraccion: {
      tipo: "Atracción por calidez auténtica y presencia confiable",
      descripcion: "El ISFJ atrae con una calidez que se siente genuina y personalizada — no es amabilidad genérica, es atención real. En un mundo de interacciones superficiales, alguien que genuinamente recuerda quién eres y se preocupa por cómo estás genera una atracción poderosa en personas que valoran la profundidad relacional.",
      maximiza: [
        "Reconoce y agradece específicamente lo que el ISFJ hace. El reconocimiento concreto de sus cuidados es el combustible de su compromiso.",
        "Muestra que eres confiable y que tus palabras coinciden con tus acciones.",
        "Respeta sus valores y su orientación hacia el cuidado — no los trates como exceso de sensibilidad."
      ],
      errores: [
        "Tomar su cuidado como garantizado sin correspondencia. El ISFJ monitorea silenciosamente la reciprocidad — la asimetría sostenida genera retirada.",
        "Introducir cambios abruptos o inestabilidad en la dinámica relacional sin preparación.",
        "Ignorar los pequeños detalles que él cuida. Para el ISFJ, los detalles son el lenguaje del amor — ignorarlos es ignorar el mensaje."
      ],
      estrategias: [
        "Construye un historial de cuidado recíproco — no grandes gestos, sino atención consistente a lo que importa.",
        "Comunica claramente cómo estás y qué necesitas. El ISFJ quiere saber — la ambigüedad lo pone en alerta.",
        "Crea rituales y tradiciones compartidas. El ISFJ atesora la historia construida juntos más que cualquier regalo material."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ESFJ", por_que: "Orientación compartida hacia el cuidado de otros (Fe auxiliar en ambos con Si). Profunda comprensión mutua de la forma en que el amor se expresa a través del servicio y la atención. La diferencia Si-dominante vs Fe-dominante crea complementariedad.", como_atraerla: "Sé cálido y genuinamente atento. El ESFJ reconoce el cuidado real y responde con igual profundidad." },
        { tipo: "ISTJ", por_que: "Dos tipos Si dominantes con orientación hacia la responsabilidad y la confiabilidad. El ISTJ aporta solidez estructural; el ISFJ aporta calidez emocional. Juntos crean entornos de alta seguridad y funcionamiento.", como_atraerla: "Muestra consistencia y seriedad. El ISTJ es atraído por la confiabilidad demostrada más que por cualquier brillo inicial." },
        { tipo: "INFJ", por_que: "El INFJ aporta profundidad intuitiva y visión que amplía el mundo del ISFJ más allá de lo conocido. El ISFJ aporta calidez práctica y la consistencia que da a la visión del INFJ un ancla en el mundo real.", como_atraerla: "Comparte con profundidad genuina. El INFJ está buscando conexión real, no interacción de superficie." }
      ],
      evitar: { tipo: "ENTP", razon: "El ENTP valora el debate, el cambio constante y la exploración sin ancla. El ISFJ valora la armonía, la estabilidad y el cuidado concreto. Lo que el ENTP percibe como estimulación intelectual, el ISFJ puede vivir como confrontación innecesaria; lo que el ISFJ valora como consistencia, el ENTP puede ver como resistencia al crecimiento." }
    }
  },

  ESTJ: {
    funciones: {
      stack: "Te → Si → Ne → Fi",
      dominante: {
        nombre: "Pensamiento Extrovertido",
        codigo: "Te",
        descripcion: "El ESTJ organiza el mundo externo con una eficiencia que es casi instintiva. Te evalúa constantemente qué funciona, qué es ineficiente, qué estructura es necesaria para que las cosas se hagan. Esta función hace al ESTJ un líder natural en contextos donde hay responsabilidades claras que cumplir — no por ambición abstracta, sino porque genuinamente puede ver cómo organizarlo todo."
      },
      auxiliar: {
        nombre: "Sensación Introvertida",
        codigo: "Si",
        descripcion: "La base experiencial del ESTJ. Si ancla las decisiones de Te en métodos que han demostrado funcionar. El ESTJ no solo ejecuta — ejecuta con base en lo que ha aprendido de experiencias concretas. Esta función da al ESTJ su respeto por las tradiciones y sistemas establecidos: no son obstáculos, son depósitos de sabiduría probada."
      },
      terciaria: {
        nombre: "Intuición Extrovertida",
        codigo: "Ne",
        descripcion: "El ESTJ tiene capacidad de ver posibilidades alternativas, aunque no sea su orientación natural. Ne terciario le permite considerar contingencias y planificar para escenarios no estándar cuando la situación lo requiere. En modo sano, este Ne aporta adaptabilidad al sistema estructural del ESTJ."
      },
      inferior: {
        nombre: "Sentimiento Introvertido",
        codigo: "Fi",
        descripcion: "La dimensión emocional más personal del ESTJ. Bajo estrés extremo, Fi puede emerger como hipersensibilidad a críticas que sienten como ataques a su integridad. En modo integrado, Fi da al ESTJ acceso a sus valores más profundos y le permite liderar no solo con eficiencia sino con principios que van más allá de los resultados."
      },
      resumen: "El ESTJ es el director ejecutivo natural del sistema. Te organiza el mundo externo con eficiencia; Si ancla en métodos verificados; Ne aporta capacidad de adaptación cuando es necesaria; Fi inferior es la dimensión emocional que el ESTJ raramente expone pero que define sus líneas éticas más profundas."
    },
    descripcion: "El ESTJ es la personificación de la responsabilidad ejecutiva. En cualquier sistema — familia, empresa, comunidad — el ESTJ naturalmente asume la responsabilidad de que las cosas funcionen. No lo hace para ser reconocido; lo hace porque tiene una profunda intolerancia a la ineficiencia y un sentido de responsabilidad que se activa automáticamente cuando hay un vacío de liderazgo.\n\nSu relación con las normas y estructuras es más sofisticada de lo que parece. El ESTJ no respeta las reglas por servilismo — las respeta porque cree genuinamente que los sistemas bien diseñados son la base de cualquier funcionamiento colectivo. Y cuando las reglas no funcionan, el ESTJ puede ser quien más enérgicamente promueve el cambio — siempre que ese cambio esté basado en evidencia y tenga un sistema alternativo claro.\n\nEn relaciones, el ESTJ expresa compromiso a través de la provisión y la protección. Se asegura de que las personas que le importan tengan lo que necesitan, de que las cosas estén en orden, de que haya estructura y previsibilidad. Este estilo de amor puede parecer poco romántico a tipos más orientados emocionalmente, pero para el ESTJ es la expresión más genuina de que algo o alguien importa.",
    social: {
      nivel: "Alto-Estructurado",
      descripcion: "El ESTJ es uno de los tipos más capaces de funcionar bien en grupos grandes y entornos sociales estructurados. Toma el rol de organizador naturalmente, y en contextos con responsabilidades claras — trabajo, familia, comunidad — es donde más brilla socialmente.",
      sabotaje: "La tendencia a corregir o a reorganizar en contextos donde nadie le pidió que lo hiciera. El ESTJ puede entrar en modo director en situaciones donde su rol no ha sido establecido, generando la percepción de que quiere controlar cuando en realidad está intentando ayudar."
    },
    apego: {
      estilo: "Seguro",
      descripcion: "El ESTJ tiene un estilo de apego fundamentalmente seguro — sabe lo que quiere en una relación, es claro en sus compromisos, y no juega con la ambigüedad. Su confiabilidad estructural crea una base sólida para las relaciones, aunque su expresión emocional limitada puede hacer difícil leer la profundidad real del vínculo.",
      en_pareja: "Necesita una pareja que respete sus sistemas y que comparta la orientación hacia la responsabilidad. No busca emoción constante — busca solidez construida a lo largo del tiempo. Con alguien que aprecia la provisión y la estructura, el ESTJ puede ser un compañero extraordinariamente estable y comprometido.",
      trigger: "La irresponsabilidad crónica, el incumplimiento de compromisos sin causa justificada, y la introducción de caos en sistemas que funciona. La inestabilidad emocional impredecible también le cuesta mucho."
    },
    lenguajes: [
      { nombre: "Actos de Servicio", posicion: 1, descripcion: "El ESTJ expresa amor proveyendo — asegurándose de que todo esté en orden, de que las necesidades prácticas estén cubiertas, de que el camino esté despejado. Para el ESTJ, organizar y resolver es la forma más directa de decir que algo le importa." },
      { nombre: "Palabras de Afirmación", posicion: 2, descripcion: "El ESTJ valora el reconocimiento de su competencia y su responsabilidad. Cuando sus contribuciones son vistas y nombradas con precisión, siente que lo que hace tiene impacto real más allá de la tarea misma." },
      { nombre: "Tiempo de Calidad", posicion: 3, descripcion: "El tiempo que el ESTJ dedica — especialmente a actividades con propósito compartido — es significativo. Construye vínculo a través de la acción conjunta: proyectos, responsabilidades, tradiciones." }
    ],
    fortalezas: [
      { titulo: "Liderazgo de responsabilidad", desc: "Asume la responsabilidad de que las cosas sucedan y las ejecuta. No lidera solo con palabras — lidera con ejemplo y resultado." },
      { titulo: "Organización de sistemas complejos", desc: "Puede tomar entornos caóticos y estructurarlos de forma funcional con una eficiencia que parece innata. Ve qué piezas van dónde y quién debe hacer qué." },
      { titulo: "Consistencia bajo presión", desc: "No pierde funcionalidad bajo presión. Su Te dominante evalúa lo que hay que hacer y lo ejecuta independientemente del estado emocional del entorno." },
      { titulo: "Claridad de comunicación", desc: "No habla en ambigüedades. El ESTJ dice exactamente lo que piensa y lo que espera, lo cual — aunque puede resultar directo para algunos — elimina la ambigüedad que genera conflictos innecesarios." },
      { titulo: "Sentido de responsabilidad colectiva", desc: "No solo cumple sus compromisos — se asegura de que el sistema colectivo funcione. Este sentido de responsabilidad amplificada es extraordinariamente valioso en roles de liderazgo." },
      { titulo: "Integridad en el trato", desc: "Sus estándares éticos son consistentes. Aplica las mismas reglas a todos, incluido él mismo, y esto genera un nivel de confianza institucional que otros tipos raramente igualan." },
      { titulo: "Capacidad de entrenamiento y desarrollo", desc: "Cuando está en rol de mentor, puede transferir competencias de forma estructurada y eficiente. No solo sabe hacer — sabe enseñar a hacer." }
    ],
    debilidades: [
      { titulo: "Rigidez ante la disrupción", desc: "Los cambios sin justificación clara en sistemas que funcionan generan resistencia significativa. El ESTJ puede defender el status quo más tiempo del que sería óptimo." },
      { titulo: "Expresión emocional limitada en relaciones íntimas", desc: "Su Fi inferior raramente se muestra. En relaciones donde el lenguaje emocional es esperado, esta limitación puede crear una sensación de distancia." },
      { titulo: "Tendencia a la microgestión", desc: "Cuando el resultado importa, puede tener dificultad para delegar con confianza y puede supervisar de formas que se perciben como control." },
      { titulo: "Baja tolerancia a la incompetencia persistente", desc: "Puede ser duro con quienes no cumplen sus estándares, especialmente cuando la incompetencia parece producto de falta de esfuerzo." },
      { titulo: "Dificultad para reconocer cuando las reglas no aplican", desc: "En situaciones que requieren flexibilidad o excepción, el ESTJ puede aplicar el sistema cuando la situación requería juicio contextual." }
    ],
    atraccion: {
      tipo: "Atracción por responsabilidad y solidez demostrada",
      descripcion: "El ESTJ atrae con una presencia que comunica que tiene su mundo en orden — financiera, estructural y éticamente. En un contexto donde la provisión y la estabilidad son valores, el ESTJ proyecta exactamente eso sin necesidad de performarlo.",
      maximiza: [
        "Ten tu propia vida estructurada y responsable. El ESTJ valora la autonomía funcional en su pareja.",
        "Comunica con claridad y cumple lo que dices. Para el ESTJ, la coherencia entre palabra y acción es el filtro más importante.",
        "Respeta su necesidad de estructura y predictibilidad en la dinámica relacional."
      ],
      errores: [
        "Ser impredecible o irresponsable de forma crónica. Para el ESTJ, esto es incompatibilidad de valores.",
        "Ignorar o desestimar los sistemas que ha construido. Son una expresión de cuidado, no de control.",
        "Esperar que cambie radicalmente su orientación hacia la estructura por razones emocionales."
      ],
      estrategias: [
        "Construye un historial de confiabilidad. El ESTJ invierte profundamente en quienes demuestran consistencia sostenida.",
        "Participa activamente en las responsabilidades compartidas. El ESTJ se siente más cercano a quien se involucra con igual seriedad.",
        "Aprecia explícitamente su esfuerzo. El ESTJ raramente sabe que su contribución está siendo vista a menos que se lo digas directamente."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ISFJ", por_que: "El ISFJ aporta la calidez y el cuidado emocional que el ESTJ tiene menos desarrollado. El ESTJ aporta la estructura y la dirección que da seguridad al mundo del ISFJ. Complementariedad profunda entre Te externo y Fe social.", como_atraerla: "Muestra calidez genuina y consistencia. El ISFJ valora sentirse seguro y visto." },
        { tipo: "ISTJ", por_que: "Orientación compartida hacia la responsabilidad y la ejecución. Profunda comprensión mutua sin necesidad de traducción. Diferencia en Te-dominante vs Si-dominante crea perspectivas complementarias.", como_atraerla: "Demuestra competencia real en tu dominio. El ISTJ respeta el desempeño probado." },
        { tipo: "ENTJ", por_que: "Dos tipos Te dominantes con visión y capacidad de ejecución. El ENTJ aporta visión de largo plazo y ambición expansiva; el ESTJ aporta solidez operacional y responsabilidad estructural.", como_atraerla: "El ENTJ respeta quien tiene dirección y puede ejecutar sin necesitar supervisión constante." }
      ],
      evitar: { tipo: "INFP", razon: "El INFP opera desde valores internos abstractos y necesita flexibilidad y autonomía emocional. El ESTJ opera desde sistemas externos concretos y necesita estructura y responsabilidad. Lo que el ESTJ percibe como necesario, el INFP puede sentir como represivo; lo que el INFP valora, el ESTJ puede ver como impracticable." }
    }
  },

  ESFJ: {
    funciones: {
      stack: "Fe → Si → Ne → Ti",
      dominante: {
        nombre: "Sentimiento Extrovertido",
        codigo: "Fe",
        descripcion: "El ESFJ tiene un radar social extraordinariamente sensible. Su Fe dominante procesa constantemente el estado emocional del entorno y genera un impulso genuino de mantener la armonía y el bienestar colectivo. Esta función hace al ESFJ casi instintivamente capaz de detectar cuando alguien está incómodo o necesita apoyo — y de actuar al respecto."
      },
      auxiliar: {
        nombre: "Sensación Introvertida",
        codigo: "Si",
        descripcion: "La memoria experiencial que ancla el cuidado del ESFJ en formas concretas y probadas. Si da al ESFJ un arsenal de gestos, rituales y acciones que sabe que funcionan porque los ha observado producir bienestar en el pasado. También genera su orientación hacia las tradiciones — los rituales familiares, los aniversarios, las costumbres compartidas que crean sentido de pertenencia."
      },
      terciaria: {
        nombre: "Intuición Extrovertida",
        codigo: "Ne",
        descripcion: "Capacidad de ver posibilidades y conexiones que van más allá del presente inmediato. Ne terciario le da al ESFJ mayor adaptabilidad que al ISTJ o ISFJ, y la capacidad de encontrar soluciones creativas cuando los métodos establecidos no son suficientes. En modo sano, abre el mundo del ESFJ a perspectivas no convencionales."
      },
      inferior: {
        nombre: "Pensamiento Introvertido",
        codigo: "Ti",
        descripcion: "El análisis lógico independiente del ESFJ. Ti inferior significa que sus decisiones pueden ser influenciadas más por el consenso social o la armonía del grupo que por el rigor lógico individual. Bajo estrés, puede manifestarse como hipercrítica de sí mismo o de los sistemas que percibe como injustos. En modo integrado, Ti le da la capacidad de tomar posiciones firmes basadas en razón cuando la presión social lo empuja en otra dirección."
      },
      resumen: "El ESFJ es el conector social más activo del sistema. Fe lee y cuida el tejido emocional del entorno; Si ancla ese cuidado en formas concretas y probadas; Ne aporta adaptabilidad; Ti inferior es la dimensión de autonomía de juicio que el ESFJ necesita desarrollar para no depender del consenso externo para validar sus decisiones."
    },
    descripcion: "El ESFJ es el pegamento social de cualquier grupo al que pertenece. Su Fe dominante no solo detecta las necesidades emocionales del entorno — se siente responsable de satisfacerlas. El ESFJ organiza los cumpleaños, recuerda las preferencias de todos, crea los rituales que dan identidad al grupo. Este rol no le cansa — es donde se siente más vivo y más él mismo.\n\nSu mayor fortaleza interpersonal es también su mayor vulnerabilidad: la necesidad de aprobación externa. El ESFJ tiene dificultad para separar su sentido de valor propio de la percepción que los demás tienen de él. Cuando recibe crítica o rechazo, el impacto es más profundo que en tipos con funciones F introvertidas, porque su Fe procesa el estado del entorno como dato sobre sí mismo. El trabajo más importante del ESFJ es desarrollar un locus de evaluación interno que complemente su orientación natural hacia el exterior.\n\nEn relaciones íntimas, el ESFJ es extraordinariamente generoso y atento — recuerda cada preferencia, anticipa cada necesidad, crea un entorno donde el otro se siente profundamente cuidado. El reto es que necesita ese mismo nivel de atención de vuelta, y cuando no llega, puede entrar en ciclos de sobredependencia emocional o de cuidado compulsivo como forma de asegurar el vínculo.",
    social: {
      nivel: "Alto-Orientado a la Armonía",
      descripcion: "El ESFJ prospera en contextos sociales donde puede conectar, cuidar y contribuir al bienestar del grupo. Es uno de los tipos más capaces de mantener conversaciones cálidas y genuinas con una amplia variedad de personas. Su inteligencia social es alta — no solo entiende qué decir, sino exactamente cuándo y cómo.",
      sabotaje: "La necesidad de aprobación que puede traducirse en exceso de adaptación. El ESFJ puede moldear su presentación para obtener la aprobación del grupo a costo de su autenticidad, lo que genera una relación con su propia identidad que puede volverse confusa a largo plazo."
    },
    apego: {
      estilo: "Ansioso",
      descripcion: "El ESFJ tiende hacia un estilo de apego ansioso — su orientación natural hacia el cuidado del vínculo puede combinarse con una necesidad de confirmación constante de que la relación está bien. Su Fe dominante procesa señales de distancia o frialdad como indicadores de amenaza al vínculo, generando ciclos de hipercuidado o búsqueda de confirmación.",
      en_pareja: "Necesita expresiones claras y consistentes de afecto y valoración. Con una pareja segura que comunica con calidez y claridad, el ESFJ puede desarrollar un apego estable y profundamente nutritivo. El reto es cuando la pareja tiene un estilo naturalmente más reservado — el ESFJ puede interpretar esa reserva como señal de problema cuando en realidad es simplemente un estilo diferente.",
      trigger: "La frialdad repentina sin explicación, la sensación de ser ignorado o no valorado, y cualquier señal que interprete como rechazo o desaprobación del vínculo."
    },
    lenguajes: [
      { nombre: "Palabras de Afirmación", posicion: 1, descripcion: "El ESFJ necesita escuchar con frecuencia que es amado, valorado y apreciado. No por inseguridad patológica — por la forma en que su Fe procesa el mundo: las palabras son datos sobre el estado del vínculo, y los datos positivos sostenidos crean la seguridad que necesita para dar lo mejor de sí mismo." },
      { nombre: "Actos de Servicio", posicion: 2, descripcion: "El ESFJ expresa amor a través del servicio detallado y recibirlo de vuelta le confirma que el cuidado es mutuo. Los gestos prácticos de consideración son su idioma nativo del amor." },
      { nombre: "Tiempo de Calidad", posicion: 3, descripcion: "El tiempo compartido — especialmente en las tradiciones y rituales que dan continuidad a la relación — es profundamente significativo. El ESFJ construye su sentido de pertenencia a través de la historia compartida acumulada." }
    ],
    fortalezas: [
      { titulo: "Inteligencia emocional social", desc: "Puede leer el clima emocional de un grupo con precisión y adaptar su comportamiento para maximizar la armonía y el bienestar colectivo. Esta habilidad es extraordinariamente valiosa en entornos relacionales complejos." },
      { titulo: "Red de relaciones profundas", desc: "Invierte en relaciones de calidad y las mantiene activamente. Tiene una red de vínculos genuinos que pocos tipos igualan en anchura y profundidad simultáneas." },
      { titulo: "Creación de sentido de comunidad", desc: "Tiene una habilidad natural para hacer que grupos de personas se sientan conectados entre sí. Este talento de construcción de comunidad es uno de los más difíciles de enseñar y uno de los más valiosos." },
      { titulo: "Generosidad práctica consistente", desc: "No solo tiene buenas intenciones — actúa en consecuencia de forma repetida y constante. Su generosidad no es episódica; es estructural." },
      { titulo: "Memoria de lo que importa a cada uno", desc: "Recuerda las preferencias, las fechas, las historias y los detalles de cada persona que le importa. Esta memoria personalizada hace que quienes están en su círculo se sientan verdaderamente vistos." },
      { titulo: "Habilidad para mediar conflictos", desc: "Su orientación hacia la armonía lo convierte en un mediador natural — puede ver las necesidades de ambas partes y encontrar el punto de encuentro donde el conflicto se disuelve." },
      { titulo: "Consistencia en el compromiso social", desc: "Cumple con sus responsabilidades sociales y relacionales de forma sistemática. Las personas que dependen de él saben que puede contar con esa consistencia." }
    ],
    debilidades: [
      { titulo: "Dependencia de la aprobación externa", desc: "Su sentido de valor puede estar excesivamente ligado a cómo lo perciben los demás. La crítica, especialmente de personas que le importan, tiene un impacto desproporcionado." },
      { titulo: "Dificultad para establecer límites", desc: "Su Fe dominante genera un impulso constante de acomodar, lo cual puede traducirse en sobreextensión y resentimiento cuando ese acomodo no es correspondido." },
      { titulo: "Tendencia a la conformidad social excesiva", desc: "Puede adaptar sus opiniones y comportamientos para encajar con las expectativas del grupo, perdiendo autenticidad en el proceso." },
      { titulo: "Hipersensibilidad al rechazo percibido", desc: "Señales sutiles de distancia o desacuerdo pueden ser interpretadas como rechazo cuando en realidad son simplemente diferencias de estilo." },
      { titulo: "Dificultad para separar sus necesidades de las del grupo", desc: "En su orientación constante hacia el bienestar de otros, puede perder contacto con lo que él mismo genuinamente necesita o quiere." }
    ],
    atraccion: {
      tipo: "Atracción por calidez genuina y habilidad de conexión",
      descripcion: "El ESFJ atrae con una calidez que hace que el otro se sienta inmediatamente visto y valorado. Su habilidad de hacer que cualquier persona se sienta especial es genuina — no es performance, es su orientación natural. Esto crea una atracción poderosa en personas que valoran la conexión emocional.",
      maximiza: [
        "Expresa aprecio y reconocimiento con frecuencia y especificidad. El ESFJ necesita saber que lo que hace importa.",
        "Muéstrate interesado en su mundo y en las personas que le importan.",
        "Participa activamente en los rituales y tradiciones que valora — son el idioma a través del cual construye vínculo."
      ],
      errores: [
        "Ignorar o minimizar sus esfuerzos de cuidado. Para el ESFJ, el cuidado ignorado es una declaración sobre el valor del vínculo.",
        "Ser emocionalmente reservado sin explicar el porqué. La reserva sin contexto se interpreta como señal de problema.",
        "Criticar sus tradiciones o rituales relacionales — son su arquitectura del amor, no excesos sentimentales."
      ],
      estrategias: [
        "Sé expresivo y consistente en mostrar afecto. El ESFJ florece con confirmaciones regulares de que el vínculo es sólido.",
        "Involúcrate en las redes relacionales que valora. Para el ESFJ, quien se interesa por su comunidad se interesa por él.",
        "Crea tradiciones compartidas — pequeños rituales que pertenecen solo a los dos. Para el ESFJ, esto es la construcción más profunda de pertenencia."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ISFJ", por_que: "Dos tipos Si con orientación hacia el cuidado (Fe auxiliar en ISFJ, Fe dominante en ESFJ). Comprensión profunda y mutua de la forma en que el amor se expresa. El ESFJ aporta energía social expansiva; el ISFJ aporta profundidad interior.", como_atraerla: "Muéstrate cálido y genuinamente interesado en el bienestar de las personas que le importan." },
        { tipo: "ISTJ", por_que: "El ISTJ aporta la solidez estructural y la confiabilidad que el ESFJ necesita como base. El ESFJ aporta la calidez y el tejido relacional que el ISTJ tiene menos desarrollado. Complementariedad profunda.", como_atraerla: "Demuestra confiabilidad sostenida. El ISTJ se convierte en anclaje para el ESFJ que más lo necesita." },
        { tipo: "ENFJ", por_que: "Dos tipos Fe con visión y orientación hacia las personas. El ENFJ aporta profundidad intuitiva y visión de largo plazo; el ESFJ aporta cuidado práctico y construcción de comunidad concreta.", como_atraerla: "El ENFJ busca alineación de valores y dirección. Muestra que tu cuidado está al servicio de algo más que la armonía inmediata." }
      ],
      evitar: { tipo: "INTP", razon: "El INTP opera desde el análisis lógico interno y tiene poca orientación natural hacia las necesidades emocionales del entorno. El ESFJ puede sentirse constantemente ignorado emocionalmente; el INTP puede sentirse ahogado por las demandas de conexión y expresión afectiva que son naturales para el ESFJ." }
    }
  },

  ISTP: {
    funciones: {
      stack: "Ti → Se → Ni → Fe",
      dominante: {
        nombre: "Pensamiento Introvertido",
        codigo: "Ti",
        descripcion: "El ISTP analiza cómo funcionan las cosas desde adentro. Su Ti construye modelos internos precisos de cualquier sistema — mecánico, lógico, técnico — y los usa para intervenir con exactitud mínima. No complica lo que no necesita ser complicado. La eficiencia del ISTP viene de su comprensión profunda de los principios fundamentales que gobiernan cada sistema."
      },
      auxiliar: {
        nombre: "Sensación Extrovertida",
        codigo: "Se",
        descripcion: "La conexión del ISTP con el mundo físico inmediato. Se lo ancla en el presente con una intensidad que pocos tipos igualan — puede procesar información sensorial en tiempo real y responder con una velocidad y precisión que parece reflejos. Esta función hace al ISTP extraordinariamente efectivo en situaciones que requieren respuesta física inmediata."
      },
      terciaria: {
        nombre: "Intuición Introvertida",
        codigo: "Ni",
        descripcion: "La visión de largo plazo del ISTP. No tan desarrollada como en los tipos Ni dominantes, pero presente como una capacidad de proyectar consecuencias y ver el destino de las cosas. El ISTP a veces tiene intuiciones sorprendentemente precisas que no puede explicar completamente — ese es Ni operando en el trasfondo."
      },
      inferior: {
        nombre: "Sentimiento Extrovertido",
        codigo: "Fe",
        descripcion: "La dimensión social y emocional del ISTP. Su Fe inferior significa que la gestión de las emociones del entorno social y la expresión afectiva pública son áreas de menor desarrollo natural. Bajo estrés extremo, puede tener expresiones emocionales inesperadas y desproporcionadas — el Fe inferior en espiral. En modo sano, Fe integrado le permite al ISTP conectar genuinamente con personas seleccionadas."
      },
      resumen: "El ISTP es el maestro técnico del presente. Ti entiende cómo funciona todo; Se responde al mundo físico con precisión; Ni provee visión de trasfondo; Fe inferior es su puerta menos desarrollada hacia la conexión humana. Es el tipo más competente en intervención técnica precisa bajo presión real."
    },
    descripcion: "El ISTP es el operativo de alto desempeño del sistema MBTI. Donde otros analizan la situación, el ISTP ya está actuando. Esta orientación hacia la acción precisa no es impulsividad — es confianza en un sistema interno de análisis que opera a velocidad suficiente para que la respuesta parezca instintiva. El ISTP ha descompuesto mentalmente el problema antes de que otros hayan terminado de formularlo.\n\nSu relación con el mundo es fundamentalmente práctica. Las ideas abstractas que no tienen aplicación real no le generan interés sostenido. Pero cuando algo tiene un componente físico, técnico o de respuesta inmediata, el ISTP se enfoca con una intensidad que pocos tipos pueden sostener. Esta orientación hacia lo concreto lo hace extremadamente valioso en contextos donde la teoría cede ante la competencia real.\n\nEn relaciones, el ISTP es más cálido de lo que su distancia inicial sugiere, pero esa calidez no se expresa en lenguaje emocional convencional. Se expresa en presencia física, en compartir habilidades, en resolver problemas reales del otro. Quien aprende a leer ese idioma descubre a alguien profundamente leal dentro de su propio estilo de conexión.",
    social: {
      nivel: "Bajo-Independiente",
      descripcion: "El ISTP no necesita socialización frecuente para su bienestar. Puede pasar periodos largos en proyectos solitarios sin que eso sea un indicador de problema. Cuando socializa, prefiere actividades con componente práctico o físico — hacer algo juntos más que hablar de hacer cosas.",
      sabotaje: "La aparente indiferencia emocional que puede leerse como desinterés cuando es simplemente su modo de procesamiento. El ISTP no monitorea ni produce las señales emocionales que otros tipos esperan como confirmación de conexión, lo cual puede hacer que relaciones potencialmente valiosas se disuelvan antes de que tengan la oportunidad de desarrollarse."
    },
    apego: {
      estilo: "Evitativo",
      descripcion: "El ISTP tiene un estilo de apego predominantemente evitativo — altamente autosuficiente, incómodo con la dependencia emocional, y naturalmente orientado hacia la independencia. No es que rechace la intimidad; es que su forma de procesar la intimidad es diferente a la que muchos esperan.",
      en_pareja: "Necesita espacio real — físico y temporal — para recargar y operar en su modo natural. Con una pareja que entiende que el espacio no es rechazo sino necesidad estructural, el ISTP puede ser un compañero sorprendentemente leal y presente en los momentos que importan.",
      trigger: "Las demandas de procesamiento emocional constante, la percepción de que está siendo presionado a comprometerse más de lo que puede dar en ese momento, y los conflictos que se prolongan indefinidamente sin resolución práctica."
    },
    lenguajes: [
      { nombre: "Actos de Servicio", posicion: 1, descripcion: "El ISTP expresa afecto resolviendo — arreglando lo que está roto, optimizando lo que funciona mal, aplicando sus habilidades concretas al beneficio del otro. Si el ISTP dedica su competencia técnica a mejorar tu vida, eso es amor en su idioma más nativo." },
      { nombre: "Tiempo de Calidad", posicion: 2, descripcion: "El tiempo que el ISTP elige compartir — especialmente en actividades físicas o prácticas — es significativo. No comparte tiempo por obligación social; cuando está ahí, es porque genuinamente quiere estar." },
      { nombre: "Contacto Físico", posicion: 3, descripcion: "El ISTP tiende a expresar conexión a través del contacto físico más que a través de palabras. Los gestos físicos concretos — más que las declaraciones verbales — son su canal de intimidad más natural." }
    ],
    fortalezas: [
      { titulo: "Competencia técnica excepcional", desc: "La combinación de Ti profundo y Se preciso produce maestría en cualquier dominio técnico o físico que el ISTP elija desarrollar. No solo entiende — puede hacer." },
      { titulo: "Respuesta bajo presión", desc: "Mantiene la calma y la efectividad en situaciones de alta presión donde otros pierden la compostura. Su capacidad de acción precisa en momentos críticos es uno de los activos más valiosos del sistema." },
      { titulo: "Eficiencia sin ornamento", desc: "Encuentra la solución más directa y efectiva sin necesidad de hacerla elaborada. Esta economía de medios es una forma de inteligencia práctica rara." },
      { titulo: "Independencia funcional", desc: "No necesita validación, supervisión ni apoyo externo para operar en alta efectividad. Esta autosuficiencia es un diferenciador extraordinario en prácticamente cualquier contexto." },
      { titulo: "Observación sin proyección", desc: "Ve lo que está ahí, no lo que espera ver. Esta capacidad de observación sin distorsión es extraordinariamente valiosa en contextos que requieren evaluación objetiva." },
      { titulo: "Tolerancia al riesgo calculado", desc: "Puede evaluar riesgos con frialdad y actuar con confianza dentro de parámetros que entiende. No es temerario — es competente en la evaluación de su propia capacidad." },
      { titulo: "Adaptación táctica inmediata", desc: "Puede ajustar su respuesta en tiempo real cuando el contexto cambia. Esta fluidez táctica es extremadamente valiosa en entornos de alta variabilidad." }
    ],
    debilidades: [
      { titulo: "Dificultad con compromisos a largo plazo", desc: "Su orientación hacia el presente y la autonomía puede hacer que los compromisos de largo plazo — que requieren consistencia más allá del interés inmediato — sean genuinamente difíciles de sostener." },
      { titulo: "Expresión emocional limitada", desc: "Su Fe inferior raramente produce el lenguaje emocional que las relaciones íntimas esperan. Esto puede crear distancia real en vínculos que el ISTP genuinamente valora pero no sabe cómo expresar." },
      { titulo: "Impaciencia con lo ineficiente", desc: "Puede ser cortante o desestimador con personas o procesos que percibe como innecesariamente lentos o complicados." },
      { titulo: "Dificultad con la planificación de largo plazo", desc: "Su orientación natural es el presente. Los proyectos que requieren visión y planificación de largo plazo pueden quedar incompletos cuando el presente inmediato se vuelve más interesante." },
      { titulo: "Puede parecer distante o desinteresado", desc: "Su procesamiento interno y su bajo nivel de señalización emocional puede crear la percepción de indiferencia cuando en realidad está completamente presente — solo en su propio modo." }
    ],
    atraccion: {
      tipo: "Atracción por competencia silenciosa y presencia física",
      descripcion: "El ISTP atrae con una combinación de competencia obvia, calma bajo presión y la sensación de que está completamente presente sin necesitar nada del otro. Esta combinación de independencia y presencia física intensa puede ser profundamente atractiva.",
      maximiza: [
        "Sé independiente y competente en tu propio dominio. El ISTP no se impresiona con la necesidad — se impresiona con la capacidad.",
        "Participa en actividades físicas o prácticas. El ISTP conecta mejor a través de la acción compartida que a través de la conversación.",
        "Respeta su espacio sin interpretarlo como rechazo. La comprensión de su necesidad de autonomía es la señal más poderosa de compatibilidad."
      ],
      errores: [
        "Exigir expresión emocional verbal que no es natural para él. Busca su lenguaje — está ahí, solo no es el estándar.",
        "Presionarlo a comprometerse antes de que haya llegado a esa decisión de forma orgánica.",
        "Interpretar su silencio como falta de interés. El ISTP silencioso en tu presencia puede estar completamente presente contigo."
      ],
      estrategias: [
        "Invítalo a hacer cosas juntos más que a hablar de hacer cosas. El vínculo del ISTP se construye en la acción compartida.",
        "Muéstrate capaz de cuidarte solo. El ISTP se siente atraído por quien no necesita ser rescatado.",
        "Dale espacio de calidad — tiempo sin demandas. El ISTP que regresa de su espacio lo hace con más presencia real que si se hubiera quedado bajo presión."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ESTP", por_que: "Dos tipos Se con Ti/Fe compartidos en diferente orden. El ESTP aporta la energía social externa que el ISTP raramente genera; el ISTP aporta la profundidad de análisis que el ESTP necesita para dar solidez a su acción.", como_atraerla: "El ESTP respeta la competencia y la presencia. Muestra lo que sabes hacer." },
        { tipo: "ISFP", por_que: "Complementariedad entre Ti y Fi, con Se compartido. El ISFP aporta la profundidad emocional y la autenticidad de valores que el ISTP tiene menos desarrollada; el ISTP aporta la capacidad analítica y la estabilidad bajo presión.", como_atraerla: "El ISFP necesita sentir que es visto en su autenticidad. Sé genuino y presente." },
        { tipo: "ENTJ", por_que: "El ENTJ provee la dirección de largo plazo y la estructura que el ISTP raramente genera solo. El ISTP provee la competencia técnica de ejecución que el ENTJ necesita para hacer real su visión.", como_atraerla: "Muestra competencia en tu dominio. El ENTJ construye alianzas con quien puede ejecutar, no solo con quien puede imaginar." }
      ],
      evitar: { tipo: "ENFJ", razon: "El ENFJ necesita conexión emocional profunda, comunicación afectiva constante y compromisos de largo plazo — exactamente las dimensiones donde el ISTP tiene más dificultad. El ENFJ puede sentirse emocionalmente abandonado; el ISTP puede sentirse sofocado por las demandas de intimidad emocional." }
    }
  },

  ISFP: {
    funciones: {
      stack: "Fi → Se → Ni → Te",
      dominante: {
        nombre: "Sentimiento Introvertido",
        codigo: "Fi",
        descripcion: "El ISFP tiene un núcleo de valores personales tan profundo y específico que es casi como una huella digital. Fi no evalúa según normas externas — evalúa según su propio sistema de qué está bien y qué no lo está, construido a lo largo del tiempo a través de experiencias profundamente procesadas. Esta función hace al ISFP extraordinariamente auténtico y también extraordinariamente difícil de mover de sus posiciones cuando algo viola ese núcleo."
      },
      auxiliar: {
        nombre: "Sensación Extrovertida",
        codigo: "Se",
        descripcion: "La conexión del ISFP con el mundo físico y estético. Se le da una presencia sensorial extraordinaria — puede experimentar la belleza de una escena, un sonido, una textura con una intensidad que pocos tipos igualan. Esta función también le da capacidad de respuesta física precisa y le ancla completamente en el presente cuando algo vale su atención."
      },
      terciaria: {
        nombre: "Intuición Introvertida",
        codigo: "Ni",
        descripcion: "La capacidad del ISFP de tener visiones y presentimientos sobre el futuro. Ni terciario opera silenciosamente, generando intuiciones que el ISFP a veces no puede explicar racionalmente pero que con frecuencia resultan precisas. También genera su capacidad de ver el significado más profundo detrás de las experiencias superficiales."
      },
      inferior: {
        nombre: "Pensamiento Extrovertido",
        codigo: "Te",
        descripcion: "La función de organización y ejecución sistemática del ISFP. Te inferior significa que los sistemas, la planificación de largo plazo y la organización no son sus puntos fuertes naturales. Bajo estrés extremo, Te puede emerger como hipercrítica externa o esfuerzo de control desproporcionado. En modo sano, Te integrado le da al ISFP la capacidad de dar estructura a sus valores y traducirlos en impacto real."
      },
      resumen: "El ISFP es el artista más auténtico del sistema. Fi establece los valores que no se negocian; Se los expresa a través del mundo físico y estético; Ni da profundidad de significado a las experiencias; Te inferior es la función que más necesita desarrollar para convertir su riqueza interior en realidad tangible."
    },
    descripcion: "El ISFP no habla de sus valores — los vive. Esta congruencia entre ser interno y expresión externa es una de las formas más raras de integridad. El ISFP no hace cosas que no están alineadas con lo que es, aunque el costo de esa integridad sea externo. Esta autenticidad puede leerse como inflexibilidad, pero es en realidad una forma de honestidad profunda que pocos tipos pueden sostener.\n\nSu relación con la belleza y la experiencia estética no es superficial. Para el ISFP, la belleza es una forma de verdad. Un espacio bien diseñado, una melodía que captura algo inexpresable, un momento de luz perfecta — estas cosas no son decoración sino señales de que algo en la realidad está alineado. Esta sensibilidad estética impregna todas las dimensiones de su vida, desde cómo organiza su espacio hasta cómo elige sus relaciones.\n\nEn relaciones, el ISFP es profundamente afectuoso pero casi completamente no verbal en esa afección. Su amor se expresa en presencia, en gestos físicos, en crear momentos de belleza para el otro, en la lealtad silenciosa que no necesita ser declarada para ser absolutamente real. Quien aprende a leer el idioma del ISFP descubre que lo que parecía distancia era en realidad la forma más profunda de intimidad que saben generar.",
    social: {
      nivel: "Bajo-Selectivo",
      descripcion: "El ISFP no necesita socialización amplia para sentirse completo. Prefiere conexiones profundas con pocas personas seleccionadas sobre redes amplias de contacto superficial. En grupos donde se siente seguro, puede sorprender con una calidez y presencia que contradice completamente la primera impresión de reserva.",
      sabotaje: "La dificultad para articular sus necesidades y límites en voz alta. El ISFP puede sentirse invadido o ignorado sin decirlo, y esa acumulación silenciosa eventualmente se convierte en retirada súbita que el otro no entiende porque no recibió señales."
    },
    apego: {
      estilo: "Temeroso-Evitativo",
      descripcion: "El ISFP tiene frecuentemente un estilo de apego temeroso-evitativo — quiere la conexión profunda pero teme la vulnerabilidad que requiere. Su Fi lo hace profundamente sensible al rechazo a nivel de valores, lo que puede traducirse en un patrón de aproximación-retirada en relaciones íntimas.",
      en_pareja: "Necesita un espacio donde pueda ser completamente auténtico sin miedo a juicio. Con una pareja que genuinamente respeta su naturaleza y no intenta moldearla, el ISFP puede desarrollar un apego profundo y sorprendentemente estable. El reto es que ese espacio de seguridad requiere tiempo para construirse y señales inequívocas de aceptación.",
      trigger: "Sentirse juzgado o no aceptado en su autenticidad, la presión para ser diferente de lo que es, y la sensación de que el vínculo depende de performar en lugar de simplemente ser."
    },
    lenguajes: [
      { nombre: "Contacto Físico", posicion: 1, descripcion: "El ISFP expresa y recibe amor primariamente a través del contacto físico. Los gestos de proximidad física son su idioma de intimidad más directo — no el abrazo performativo, sino la presencia física genuina." },
      { nombre: "Actos de Servicio", posicion: 2, descripcion: "Cuando el ISFP hace algo concreto para mejorar tu experiencia — especialmente si involucra atención a los detalles estéticos o personales — es una expresión directa de que te tiene en mente y que tu bienestar importa." },
      { nombre: "Tiempo de Calidad", posicion: 3, descripcion: "El tiempo que el ISFP elige compartir — especialmente en contextos sensorialmente ricos o estéticamente significativos — es donde construye su conexión más profunda. Estar presente con él en un momento bello es una de sus formas de mayor intimidad." }
    ],
    fortalezas: [
      { titulo: "Autenticidad inquebrantable", desc: "Opera desde sus valores reales con una consistencia que es extraordinariamente rara. Esta congruencia entre ser y hacer genera una presencia de alta integridad que impacta a quienes la perciben." },
      { titulo: "Sensibilidad estética excepcional", desc: "Percibe la belleza con una profundidad que pocos tipos igualan. Esta sensibilidad se traduce en capacidad de crear experiencias, entornos y conexiones de alta calidad estética." },
      { titulo: "Presencia física completa", desc: "Cuando el ISFP está presente, está completamente presente. Su Se le ancla en el momento con una intensidad que hace que la persona con quien está se sienta genuinamente vista y acompañada." },
      { titulo: "Lealtad de valores", desc: "No abandona a las personas ni los compromisos cuando se vuelve difícil — siempre que esos compromisos estén alineados con sus valores fundamentales. Esta lealtad es profunda y completamente real." },
      { titulo: "Adaptabilidad táctica", desc: "Puede ajustarse a entornos cambiantes con fluidez cuando sus valores no están en juego. La flexibilidad situacional del ISFP es alta dentro de sus líneas de integridad." },
      { titulo: "Empatía sin proyección", desc: "Puede sintonizar con el estado emocional de otra persona sin imponer su propia interpretación. Esta empatía limpia es una forma rara de inteligencia emocional." },
      { titulo: "Capacidad de vivir el presente plenamente", desc: "Puede experimentar momentos de presencia total con una intensidad que tipos más orientados al futuro raramente alcanzan. Esta capacidad de estar completamente aquí es un don real." }
    ],
    debilidades: [
      { titulo: "Dificultad para planificar y estructurar", desc: "Su Te inferior hace que los sistemas de largo plazo, la organización y la planificación sean genuinamente difíciles. Puede vivir en reactividad constante sin arquitectura que convierta su potencial en resultado." },
      { titulo: "Dificultad para articular necesidades", desc: "Su modo de procesamiento interno puede hacer que sus necesidades y límites raramente sean expresados verbalmente, generando dinámicas donde los demás no saben cómo cuidarlo bien." },
      { titulo: "Vulnerabilidad a la crítica de valores", desc: "La crítica que toca su núcleo de Fi puede tener un impacto desproporcionado, generando retirada o defensividad que desde afuera parece excesiva." },
      { titulo: "Patrón de aproximación-retirada en intimidad", desc: "El miedo a la vulnerabilidad puede generar un patrón de acercarse y alejarse que confunde a personas que genuinamente quieren conectar." },
      { titulo: "Dificultad para manejar conflicto explícito", desc: "El conflicto directo puede activar su modo de retirada en lugar de resolución. Prefiere la distancia al enfrentamiento, lo que puede dejar conflictos sin resolver." }
    ],
    atraccion: {
      tipo: "Atracción por autenticidad y presencia estética",
      descripcion: "El ISFP atrae con una combinación de autenticidad que no puede ser falsificada, presencia física intensa y una sensibilidad estética que hace que todo lo que toca tenga más belleza. Esta rareza de alguien completamente real en un mundo de performance es profundamente atractiva.",
      maximiza: [
        "Sé genuinamente auténtico — el ISFP detecta la performance con una precisión casi sobrenatural.",
        "Aprecia la belleza en lo cotidiano. El ISFP conecta con quien puede ver lo que él ve.",
        "Respeta su necesidad de espacio y autenticidad. No intentes moldearlo — ámalo como es."
      ],
      errores: [
        "Juzgar su modo de ser o intentar cambiarlo. El Fi del ISFP tiene líneas absolutas y la presión de cambio activa el modo de retirada.",
        "Esperar que exprese su afecto en lenguaje verbal estándar. Su idioma es diferente — aprende a leerlo.",
        "Demandarlo cuando necesita espacio. El ISFP que es presionado se retira más, no menos."
      ],
      estrategias: [
        "Crea experiencias de belleza compartida. El ISFP construye sus vínculos más profundos a través de momentos estéticos compartidos.",
        "Muéstrate completamente tú mismo — sin filtro de aprobación. El ISFP valora la autenticidad por encima de todo.",
        "Dale tiempo para acercarse a su ritmo. El ISFP que llega por elección propia llega con mucho más de lo que uno que llega bajo presión."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ESFP", por_que: "Se compartido y complementariedad Fi-Fe. El ESFP aporta energía social y presencia extrovertida; el ISFP aporta profundidad de valores y autenticidad. Juntos crean una presencia de alta intensidad sensorial y emocional.", como_atraerla: "El ESFP valora quien puede seguirle el ritmo de experiencias. Muéstrate presente y dispuesto a explorar." },
        { tipo: "ISTP", por_que: "Se compartido con Ti/Fi complementarios. El ISTP aporta análisis y estabilidad bajo presión; el ISFP aporta profundidad emocional y valores que anclan. Comprensión mutua del espacio y la independencia.", como_atraerla: "El ISTP valora la competencia y la autenticidad. Muéstrate real y capaz en tu propio dominio." },
        { tipo: "INFP", por_que: "Fi dominante compartido — comprensión profunda y mutua de la forma en que los valores guían todas las decisiones. El INFP aporta visión y profundidad intuitiva; el ISFP aporta presencia física y anclaje en lo concreto.", como_atraerla: "El INFP busca autenticidad y alineación de valores. Sé genuinamente tú mismo en cada interacción." }
      ],
      evitar: { tipo: "ENTJ", razon: "El ENTJ opera con una eficiencia y una orientación hacia resultados que puede sentirse como agresividad para el ISFP. Lo que el ENTJ percibe como ejecución necesaria, el ISFP puede vivir como violación de su ritmo orgánico y sus valores de autenticidad. La diferencia de orientación es profunda." }
    }
  },

  ESTP: {
    funciones: {
      stack: "Se → Ti → Fe → Ni",
      dominante: {
        nombre: "Sensación Extrovertida",
        codigo: "Se",
        descripcion: "El ESTP vive en el presente con una intensidad que pocos tipos pueden igualar. Su Se dominante procesa el entorno físico en tiempo real con una resolución extraordinaria — ve oportunidades, detecta cambios, responde a señales antes de que los demás las hayan registrado conscientemente. Esta función lo convierte en uno de los operadores más efectivos del sistema en entornos de alta variabilidad."
      },
      auxiliar: {
        nombre: "Pensamiento Introvertido",
        codigo: "Ti",
        descripcion: "El árbitro lógico del ESTP. Ti evalúa en tiempo real si lo que ve Se tiene sentido. Esta función le da al ESTP una capacidad de análisis rápido que distingue entre intuición real y sesgo. El ESTP no actúa solo desde instinto — actúa desde instinto evaluado por lógica interna, lo que hace sus intervenciones más precisas de lo que parecen desde afuera."
      },
      terciaria: {
        nombre: "Sentimiento Extrovertido",
        codigo: "Fe",
        descripcion: "La inteligencia social del ESTP. Fe terciario le da una comprensión intuitiva de la dinámica emocional de grupos y personas. No es tan profunda como en los tipos Fe dominantes, pero sí suficiente para que el ESTP pueda leer la sala, calibrar su impacto y ajustar su presencia para maximizar la respuesta del entorno social."
      },
      inferior: {
        nombre: "Intuición Introvertida",
        codigo: "Ni",
        descripcion: "La visión de largo plazo del ESTP. Ni inferior significa que la planificación de largo plazo y la consideración de consecuencias no inmediatas son las dimensiones menos desarrolladas. Bajo estrés extremo, Ni puede manifestarse como visiones apocalípticas o paranoicas sobre el futuro. En modo sano, Ni integrado le permite al ESTP considerar el impacto de sus acciones más allá del presente inmediato."
      },
      resumen: "El ESTP es el operador más presente del sistema. Se lee el mundo en tiempo real con extraordinaria precisión; Ti evalúa la lógica de cada respuesta; Fe calibra el impacto social; Ni inferior es su mayor área de crecimiento — la capacidad de ver más allá del presente inmediato. En el presente inmediato, es prácticamente insuperable."
    },
    descripcion: "El ESTP no vive en teorías sobre la vida — vive en la vida misma, con una intensidad de presencia que pocos tipos pueden sostener. Su Se dominante lo hace extraordinariamente receptivo al momento presente — puede sentir la energía de una habitación antes de analizar su composición, puede leer la disposición de una persona en segundos a través de señales físicas que otros no registran conscientemente, puede reaccionar a una oportunidad antes de que otros la hayan procesado.\n\nSu capacidad de persuasión no viene de manipulación sino de presencia real. El ESTP que quiere algo lo comunica con una directedad y una energía que genera movimiento. No convence a través de argumentos elaborados — convence a través del impacto de su presencia y la claridad de su intención. Este estilo es extremadamente efectivo en negociación, ventas de alto nivel y cualquier contexto donde la capacidad de crear movimiento en tiempo real es el factor diferenciador.\n\nEn relaciones, el ESTP es uno de los compañeros más vitalizantes del sistema — su presencia hace que la vida se sienta más vívida, más intensa, más llena de posibilidad. El desafío es que su orientación natural hacia el presente puede hacer que los compromisos de largo plazo sean genuinamente difíciles de sostener cuando el presente deja de ser estimulante.",
    social: {
      nivel: "Alto-Energético",
      descripcion: "El ESTP prospera en entornos sociales de alta energía. Su Se lo hace naturalmente adaptable a una amplia variedad de contextos y personas — puede entrar a casi cualquier grupo y encontrar rápidamente cómo conectar. Su presencia física y su capacidad de leer la dinámica social lo hacen un actor de alto impacto en prácticamente cualquier entorno social.",
      sabotaje: "La impulsividad que puede resultar en acción sin suficiente consideración de consecuencias relacionales. El ESTP puede actuar o decir algo que en el momento tiene total sentido estratégico pero que no consideró el impacto a largo plazo en las personas involucradas."
    },
    apego: {
      estilo: "Evitativo-Seguro",
      descripcion: "El ESTP tiene una configuración de apego mixta. Su Se dominante lo hace seguro y presente en el momento — no hay ansiedad en su presencia inmediata. Pero su Ni inferior hace que los compromisos de largo plazo y la visión de futuro relacional sean áreas de menor seguridad, derivando a veces en patrones evitativos cuando la relación exige proyección a futuro.",
      en_pareja: "Necesita una relación que se mantenga estimulante — no necesariamente con drama o conflicto, sino con novedad real y presencia de alta energía. Con una pareja que puede seguir su ritmo sin exigir compromisos que su Ni inferior no puede sostener de forma natural, el ESTP puede ser extraordinariamente leal dentro del presente.",
      trigger: "La monotonía prolongada sin variación real, las demandas de planificación de largo plazo que requieren visión de futuro que genuinamente no tiene desarrollada, y la percepción de que la relación se ha convertido en una rutina sin contenido real."
    },
    lenguajes: [
      { nombre: "Contacto Físico", posicion: 1, descripcion: "El ESTP expresa y recibe afecto primariamente a través del contacto físico y la proximidad corporal. Para él, la presencia física es el modo de conexión más directo y significativo." },
      { nombre: "Palabras de Afirmación", posicion: 2, descripcion: "El ESTP valora el reconocimiento de su competencia, su capacidad y su presencia. No halago vacío — reconocimiento específico de lo que hace bien y del impacto que tiene." },
      { nombre: "Tiempo de Calidad", posicion: 3, descripcion: "El tiempo del ESTP es su recurso más presente. Cuando elige compartirlo en actividades de alta energía y presencia real, está invirtiendo lo que más valora en el vínculo." }
    ],
    fortalezas: [
      { titulo: "Presencia física y carisma de acción", desc: "Genera impacto inmediato en cualquier entorno a través de la combinación de presencia física, energía real y capacidad de acción. Este carisma no es performance — es presencia genuina." },
      { titulo: "Lectura del entorno en tiempo real", desc: "Puede leer una situación — personas, dinámica, oportunidades, riesgos — con una velocidad y precisión que parece instintiva. Es la inteligencia situacional más alta del sistema." },
      { titulo: "Acción bajo presión sin parálisis", desc: "No pierde funcionalidad cuando la presión sube. Al contrario — la presión activa su Se en su nivel más alto de efectividad." },
      { titulo: "Capacidad de negociación y persuasión directa", desc: "Su combinación de Se y Fe le da la habilidad de leer lo que el otro necesita y presentar su propuesta de forma que active exactamente ese resorte. Efectividad de alto nivel en cualquier negociación real." },
      { titulo: "Adaptabilidad táctica extrema", desc: "Puede cambiar de estrategia en tiempo real cuando el contexto lo requiere, sin el costo emocional que ese cambio tiene para tipos más rígidos." },
      { titulo: "Tolerancia al riesgo y a la incertidumbre", desc: "Puede operar efectivamente en entornos de alta ambigüedad y riesgo real. La incertidumbre no lo paraliza — lo activa." },
      { titulo: "Impacto social inmediato", desc: "Puede entrar a prácticamente cualquier contexto social y generar movimiento, energía y conexión con una rapidez que pocos tipos igualan." }
    ],
    debilidades: [
      { titulo: "Dificultad con consecuencias de largo plazo", desc: "Su Ni inferior hace que la consideración de impactos no inmediatos sea genuinamente menos natural. Puede actuar con excelente lógica táctica pero sin suficiente visión de lo que esa acción genera a largo plazo." },
      { titulo: "Impulsividad en decisiones de alto riesgo", desc: "La misma disposición al riesgo que lo hace efectivo puede llevarlo a apostar más de lo que puede permitirse perder cuando el presente parece ofrecer garantías que no existen." },
      { titulo: "Dificultad para sostener compromisos sin estimulación", desc: "Cuando una relación, proyecto o situación pierde la calidad estimulante que lo enganchó, puede ser difícil mantener el nivel de inversión que los compromisos previos requerirían." },
      { titulo: "Expresión emocional inconsistente", desc: "Su Fe terciario tiene acceso limitado a la dimensión emocional profunda. Sus expresiones de afecto pueden ser intensas cuando está presente y escasas cuando no lo está, sin que esa variación refleje la realidad del vínculo." },
      { titulo: "Tendencia a vivir al máximo hasta el agotamiento", desc: "Su orientación hacia la experiencia intensa puede traducirse en excesos que tienen costo real en salud, finanzas o relaciones." }
    ],
    atraccion: {
      tipo: "Atracción por presencia física y energía vital",
      descripcion: "El ESTP atrae por su capacidad de hacer que el presente se sienta más vivo. Su energía, su presencia física y su confianza real — no performada — crean una experiencia de atracción intensa en personas que valoran la vitalidad y la presencia sobre la seguridad y la planificación.",
      maximiza: [
        "Proyecta confianza y presencia real. El ESTP no se siente atraído por quien necesita ser activado — busca quien ya está encendido.",
        "Muéstrate capaz de seguir su ritmo y de crear tu propio. El ESTP quiere un par, no un seguidor.",
        "Sé directo sobre lo que quieres. El ESTP valora la claridad sobre la estrategia de conquista indirecta."
      ],
      errores: [
        "Intentar controlarlo o predecirlo. Su Se necesita libertad de respuesta en tiempo real.",
        "Demandarlo cuando está en modo de retirada. El ESTP presionado se aleja más — el espacio produce el retorno que la demanda nunca logra.",
        "Exigir planificación de largo plazo al inicio de la relación. Su Ni inferior necesita tiempo para desarrollarse en la dirección de la proyección futura."
      ],
      estrategias: [
        "Crea experiencias de alta intensidad y presencia. El ESTP asocia el vínculo con la calidad de las experiencias compartidas.",
        "Sé impredecible de forma sana. El ESTP se mantiene enganchado donde hay novedad real.",
        "Muéstrate completamente presente en los momentos que compartes. Para el ESTP, la presencia completa es el mayor regalo que puedes darle."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ISTP", por_que: "Se compartido con Ti/Fe en diferente expresión. Profunda comprensión mutua del presente, la acción y la independencia. El ISTP aporta profundidad de análisis; el ESTP aporta energía social y expansión.", como_atraerla: "El ISTP respeta la competencia real. Muestra lo que sabes hacer, no lo que dices que podrías hacer." },
        { tipo: "ESFP", por_que: "Se dominante compartido. Orientación mutua hacia la presencia y la experiencia. El ESFP aporta calidez emocional y conexión afectiva; el ESTP aporta rigor analítico y estabilidad bajo presión.", como_atraerla: "El ESFP conecta con quien puede crear experiencias de calidad. Muéstrate presente y dispuesto a explorar." },
        { tipo: "ISFP", por_que: "Se compartido con Fi/Ti complementarios. El ISFP aporta profundidad de valores y autenticidad; el ESTP aporta energía y expansión del presente. La diferencia de introversión-extroversión crea una complementariedad real.", como_atraerla: "El ISFP valora la autenticidad sobre todo. Muéstrate genuinamente tú mismo, sin performance." }
      ],
      evitar: { tipo: "INFJ", razon: "El INFJ opera desde Ni dominante — visión de largo plazo, profundidad emocional, compromisos de sentido. El ESTP opera desde Se dominante — presente, acción inmediata, adaptación táctica. Lo que el INFJ necesita para sentirse conectado, el ESTP raramente puede proporcionar de forma natural; lo que el ESTP necesita para sentirse vivo, el INFJ puede percibir como superficialidad." }
    }
  },

  ESFP: {
    funciones: {
      stack: "Se → Fi → Te → Ni",
      dominante: {
        nombre: "Sensación Extrovertida",
        codigo: "Se",
        descripcion: "El ESFP está completamente presente en el mundo físico. Su Se dominante procesa el entorno sensorial con una riqueza y una intensidad extraordinarias — los colores son más vívidos, la música más envolvente, los momentos de conexión más intensos. Esta función lo convierte en el tipo más capaz de hacer que el presente se sienta como exactamente donde deberías estar."
      },
      auxiliar: {
        nombre: "Sentimiento Introvertido",
        codigo: "Fi",
        descripcion: "El núcleo de autenticidad del ESFP. Fi le da una claridad sobre quién es y qué valora que contrasta con su apariencia de espontaneidad total. El ESFP puede parecer improvisado desde afuera, pero tiene líneas de valores absolutas que no se cruzan. Esta función es la que diferencia la calidez del ESFP de la del ENFJ — la del ESFP es profundamente personal, no estratégica."
      },
      terciaria: {
        nombre: "Pensamiento Extrovertido",
        codigo: "Te",
        descripcion: "La capacidad organizativa del ESFP. Te terciario le da acceso a lógica práctica cuando la situación lo requiere. No es su orientación natural, pero cuando hay que ejecutar algo concreto con eficiencia, el ESFP puede movilizar Te con una efectividad que sorprende a quienes solo habían visto su lado expansivo."
      },
      inferior: {
        nombre: "Intuición Introvertida",
        codigo: "Ni",
        descripcion: "La visión de largo plazo del ESFP. Ni inferior significa que la planificación estratégica y la consideración de consecuencias distantes no son su fortaleza natural. Bajo estrés extremo, puede manifestarse como paranoias sobre el futuro o catastrofización. En modo sano, Ni integrado da al ESFP la profundidad de perspectiva que transforma su energía presente en dirección de largo plazo."
      },
      resumen: "El ESFP es la presencia más luminosa del sistema. Se experimenta el mundo con intensidad; Fi ancla esa experiencia en valores auténticos; Te organiza cuando hay que ejecutar; Ni inferior es el área de mayor crecimiento — la capacidad de ver más allá del presente con la misma claridad con que vive en él."
    },
    descripcion: "El ESFP tiene un don extraordinariamente raro: hace que las personas que están cerca de él se sientan más vivas. No es una estrategia — es la expresión natural de alguien que genuinamente disfruta el presente con la intensidad suficiente para que ese disfrute sea contagioso. El ESFP no necesita esforzarse para ser atractivo socialmente — simplemente existe y el entorno responde.\n\nSu autenticidad es real. Aunque puede parecer superficial desde afuera, el ESFP tiene un núcleo de valores muy específico (Fi auxiliar) que hace que su simpatía no sea interesada. Le cae bien genuinamente la gente, le importa genuinamente que los demás se sientan bien, y cuando algo o alguien viola sus valores, la retirada puede ser tan rápida como la apertura inicial fue generosa.\n\nEn relaciones, el ESFP es uno de los compañeros más vitalizantes y más vulnerables del sistema. Vitalizante porque su presencia hace que la vida cotidiana tenga una calidad de experiencia superior. Vulnerable porque su necesidad de afecto explícito y de confirmar que el vínculo es sólido puede crear ciclos de inseguridad cuando la pareja tiene un estilo naturalmente más reservado. El ESFP en una relación segura florece de formas que ningún otro tipo puede igualar en calidez y presencia.",
    social: {
      nivel: "Alto-Magnético",
      descripcion: "El ESFP es uno de los tipos más socialmente magnéticos del sistema. Su combinación de Se y Fi crea una presencia que es simultáneamente enérgica y genuina — no solo atrae a la gente sino que hace que se sientan mejor con ellos mismos cuando están cerca de él. Esta capacidad de elevar el estado emocional del entorno es un talento extraordinario.",
      sabotaje: "La evitación del conflicto cuando el conflicto es necesario. El ESFP puede postergar conversaciones difíciles hasta que el problema se ha hecho más grande, prefiriendo mantener la armonía del momento sobre resolver lo que podría generar tensión."
    },
    apego: {
      estilo: "Ansioso-Seguro",
      descripcion: "El ESFP tiene una configuración mixta de apego. Su Se dominante lo hace presente y seguro en el momento — no hay ansiedad existencial en quien está completamente vivo en el presente. Pero su Fi auxiliar, con su profunda necesidad de autenticidad y su sensibilidad al rechazo de valores, puede generar patrones ansiosos cuando el vínculo no se siente completamente seguro.",
      en_pareja: "Necesita expresiones frecuentes y genuinas de afecto y valoración. Con una pareja que comunica con calidez y consistencia, el ESFP puede desarrollar un apego profundamente estable y una lealtad que sorprende a quienes habían asumido que su naturaleza espontánea era incompatible con el compromiso.",
      trigger: "La frialdad emocional prolongada, la sensación de no ser visto o valorado, y cualquier señal de que el vínculo depende de que sea diferente de lo que es autenticamente."
    },
    lenguajes: [
      { nombre: "Palabras de Afirmación", posicion: 1, descripcion: "El ESFP necesita escuchar con frecuencia que es amado, apreciado y valorado. Esta necesidad no es fragilidad — es la forma en que su Fi confirma que el vínculo es real y que puede abrirse completamente sin riesgo." },
      { nombre: "Contacto Físico", posicion: 2, descripcion: "El contacto físico es el idioma de presencia más directo para el ESFP. Los gestos de calidez física confirman en tiempo real lo que las palabras afirman — la presencia del otro es real y el vínculo está vivo." },
      { nombre: "Tiempo de Calidad", posicion: 3, descripcion: "El ESFP construye sus conexiones más profundas a través de experiencias compartidas de alta calidad sensorial. Los momentos que crean historia — aventuras, celebraciones, momentos de belleza — son el material del que está hecho su amor." }
    ],
    fortalezas: [
      { titulo: "Presencia que eleva el estado emocional del entorno", desc: "Tiene un efecto medible en el bienestar de las personas que están cerca de él. Esta capacidad de elevar la energía sin esfuerzo consciente es uno de los dones más raros del sistema." },
      { titulo: "Autenticidad sin filtro", desc: "Lo que ves es lo que hay — sin agenda oculta, sin imagen calculada. Esta transparencia genera confianza instantánea en personas que pueden leer la diferencia entre la apertura real y la apertura performativa." },
      { titulo: "Inteligencia emocional en tiempo real", desc: "Puede leer el estado emocional de las personas con alta precisión y responder de formas que los hacen sentir vistos y apoyados. Esta habilidad es especialmente poderosa en el plano interpersonal inmediato." },
      { titulo: "Capacidad de crear momentos memorables", desc: "Tiene un talento natural para crear experiencias que las personas recuerdan. No planifica estas experiencias — simplemente está tan presente que los momentos se convierten en recuerdos." },
      { titulo: "Generosidad de espíritu genuina", desc: "Le importa genuinamente el bienestar de quienes están en su círculo. Esta orientación hacia la generosidad no es estratégica — es la expresión natural de quien valora la conexión por encima del cálculo." },
      { titulo: "Adaptabilidad social extraordinaria", desc: "Puede entrar a prácticamente cualquier contexto social y encontrar cómo conectar genuinamente. Esta adaptabilidad no compromete su autenticidad — es la expresión de una autenticidad suficientemente amplia para encontrar algo real en casi cualquier persona." },
      { titulo: "Energía vital contagiosa", desc: "Su presencia activa algo en los demás — los hace más dispuestos a disfrutar, más capaces de conectar, más presentes en el momento que comparten. Esta activación es un talento que ningún otro tipo tiene en la misma medida." }
    ],
    debilidades: [
      { titulo: "Dificultad con la planificación de largo plazo", desc: "Su Ni inferior hace que la visión de futuro y la planificación estratégica sean genuinamente difíciles. Puede vivir en el presente de forma extraordinaria pero con una arquitectura de largo plazo insuficiente." },
      { titulo: "Tendencia a evitar conversaciones difíciles", desc: "Prefiere la armonía presente al conflicto necesario, lo que puede dejar problemas sin resolver hasta que han crecido más de lo necesario." },
      { titulo: "Vulnerabilidad a la crítica de valores", desc: "Cuando algo o alguien viola su núcleo de Fi, la reacción puede ser desproporcionada para quien no sabía que esa línea existía." },
      { titulo: "Necesidad de validación que puede crear dependencia", desc: "Su necesidad de palabras de afirmación frecuentes puede crear dinámicas de dependencia emocional cuando la pareja no entiende la profundidad de esa necesidad." },
      { titulo: "Dificultad para sostener el seguimiento de compromisos complejos", desc: "Los proyectos o compromisos que requieren estructura de largo plazo sin recompensa inmediata pueden quedar incompletos." }
    ],
    atraccion: {
      tipo: "Atracción por presencia luminosa y calidez auténtica",
      descripcion: "El ESFP atrae haciendo que el otro se sienta extraordinariamente bien en su presencia. No es un truco — es el resultado de alguien que genuinamente está presente, genuinamente le importa la experiencia del otro, y genuinamente disfruta el momento que comparten. Esta rareza de alguien completamente presente y completamente real genera una atracción que es difícil de explicar y casi imposible de ignorar.",
      maximiza: [
        "Expresa afecto con frecuencia y genuinamente. El ESFP necesita saber que el vínculo es real y seguro.",
        "Sé completamente presente en los momentos que comparten. Para el ESFP, estar aquí es la forma más alta de respeto.",
        "Crea experiencias de calidad — no tienen que ser costosas, tienen que ser memorables."
      ],
      errores: [
        "Ser emocionalmente reservado sin explicación. La reserva sin contexto activa la inseguridad del Fi del ESFP.",
        "Minimizar su necesidad de afecto explícito como exceso emocional. Es una necesidad real — no abordarla genera distancia inevitable.",
        "Ser predecible hasta el punto de la monotonía. El Se del ESFP necesita experiencias que lo mantengan vivo."
      ],
      estrategias: [
        "Sé espontáneamente generoso en tu afecto — no esperes a tener la razón perfecta para expresarlo.",
        "Crea aventuras y momentos de novedad. El ESFP asocia el amor con la calidad del presente compartido.",
        "Muéstrate auténtico. El ESFP puede sentir la diferencia entre lo real y lo calculado con una precisión notable."
      ]
    },
    compatibilidad: {
      top: [
        { tipo: "ISFP", por_que: "Se compartido con Fi complementario. El ISFP aporta profundidad de valores y espacio de quietud que el ESFP necesita; el ESFP aporta la energía social y la expansión del mundo que el ISFP raramente genera solo.", como_atraerla: "El ISFP valora la autenticidad absoluta. Sé genuinamente tú mismo en cada momento." },
        { tipo: "ESTP", por_que: "Se dominante compartido — presencia y presente. El ESTP aporta rigor analítico y estabilidad bajo presión; el ESFP aporta calidez emocional y orientación hacia las personas. Complementariedad potente.", como_atraerla: "El ESTP respeta quien puede seguir su ritmo sin perderse a sí mismo. Muéstrate presente y capaz." },
        { tipo: "ESFJ", por_que: "Se y Fe compartidos en diferente configuración. El ESFJ aporta estructura, tradición y cuidado concreto; el ESFP aporta espontaneidad, energía y presencia luminosa. La combinación crea calidez y vitalidad simultáneas.", como_atraerla: "El ESFJ valora quien es consistente y genuinamente cálido. Muéstrate presente y considera las necesidades del entorno relacional." }
      ],
      evitar: { tipo: "INTJ", razon: "El INTJ opera desde Ni dominante — visión interior, futuro estratégico, mundo de ideas y sistemas. El ESFP opera desde Se dominante — presente sensorial, experiencia inmediata, conexión humana en tiempo real. La distancia entre estos dos mundos es la más amplia del sistema, y la frustración mutua puede ser la consecuencia de intentar cerrarla." }
    }
  },

};
