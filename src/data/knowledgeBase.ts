import { CategoryId } from '../types/helpdesk';

export interface KnowledgeGuide {
  id: string;
  category: CategoryId | 'soft-skills';
  categoryLabel: string;
  title: string;
  summary: string;
  symptom: string;
  rootCause: string;
  stepByStepSolution: string[];
  shortcutsAndCommands: { keys: string; action: string }[];
  empathyTip: string;
}

export const KNOWLEDGE_GUIDES: KnowledgeGuide[] = [
  {
    id: 'kb-email-cco-adjuntos',
    category: 'email',
    categoryLabel: 'Correo Electrónico',
    title: 'Límite de Archivos Adjuntos (25 MB) y Uso de Para / CC / CCO',
    summary:
      'Protocolo para envíos a múltiples destinatarios externos y archivos pesados sin infringir el RGPD ni saturar el servidor SMTP.',
    symptom:
      'El usuario recibe un error al adjuntar un archivo superior a 20-25 MB o pretende enviar un correo a decenas de clientes externos exponiendo sus direcciones en el campo "Para" o "CC".',
    rootCause:
      'Los servidores de correo electrónico estándar (Exchange, Gmail, IMAP/SMTP) limitan los adjuntos directos a 20-25 MB. Además, los campos "Para" y "CC" hacen visibles todas las direcciones a todos los receptores.',
    stepByStepSolution: [
      'Subir el archivo pesado (>25 MB) al almacenamiento en la nube corporativo (OneDrive, Google Drive o SharePoint).',
      'Generar un enlace compartido configurando los permisos en modo "Solo lectura / Puede ver" para evitar modificaciones accidentales.',
      'Pegar el enlace en el cuerpo del mensaje e introducir la propia dirección del remitente en el campo "Para".',
      'Colocar la lista de clientes externos en el campo "CCO" (Con Copia Oculta) para que ningún destinatario vea los correos de los demás.',
      'Tras pulsar Enviar, verificar que la "Bandeja de salida" queda vacía y que el correo figura en "Elementos enviados".'
    ],
    shortcutsAndCommands: [
      { keys: 'Ctrl + Enter', action: 'Enviar el mensaje de correo actual (con precaución)' },
      { keys: 'Ctrl + N / Ctrl + U', action: 'Crear un nuevo mensaje de correo' },
      { keys: 'Campo CCO (BCC)', action: 'Oculta la lista de destinatarios al resto de receptores' }
    ],
    empathyTip:
      'Nunca regañes al usuario mencionando "sanciones legales de RGPD" con tono amenazante. Preséntalo como una ayuda protectora: "¡Qué bien que lo vemos antes de enviar! Si los pasamos a CCO protegemos la privacidad de sus clientes".'
  },
  {
    id: 'kb-email-spam-desconectado',
    category: 'email',
    categoryLabel: 'Correo Electrónico',
    title: 'Diagnóstico de Bandeja que no Recibe Correos: Modo sin Conexión y Spam',
    summary:
      'Lista de comprobación de Nivel 1 cuando un usuario afirma que "el servidor de correo se ha caído" porque no le entran mensajes nuevos.',
    symptom:
      'La bandeja de entrada no muestra correos nuevos desde una hora concreta o falta el mensaje urgente de un proveedor nuevo con adjunto PDF.',
    rootCause:
      'Activación involuntaria del botón "Trabajar sin conexión" en la pestaña Enviar y recibir, o retención preventiva de remitentes desconocidos con archivos adjuntos en la carpeta "Correo no deseado (Spam)".',
    stepByStepSolution: [
      'Inspeccionar la barra de estado inferior derecha del cliente de correo: si indica "Trabajando sin conexión" o "Desconectado", ir a la pestaña "Enviar y recibir" y desactivar "Trabajar sin conexión".',
      'Pulsar F9 (Enviar y recibir todas las carpetas) para forzar la sincronización inmediata.',
      'Si falta un correo concreto de un remitente nuevo, revisar la carpeta "Correo no deseado (Spam)" y la "Papelera".',
      'Hacer clic derecho sobre el mensaje legítimo en Spam y marcar "No es correo no deseado" + "Confiar siempre en el remitente".',
      'Usar la barra de búsqueda superior activando el filtro "Tiene datos adjuntos" (icono del clip) o buscando por extensión ".pdf".'
    ],
    shortcutsAndCommands: [
      { keys: 'F9', action: 'Forzar Enviar y recibir todas las carpetas inmediatamente' },
      { keys: 'Ctrl + E / F3', action: 'Situar el cursor directamente en la barra de búsqueda de correo' },
      { keys: 'hasattachments:yes / .pdf', action: 'Filtro de búsqueda para localizar correos con documentos' }
    ],
    empathyTip:
      'Cuando un usuario frustrado acusa a Informática ("¡Habéis roto el servidor!"), jamás respondas a la defensiva. Valida su urgencia operativa y guíale suavemente a mirar la esquina inferior derecha de su pantalla.'
  },
  {
    id: 'kb-word-recuperacion',
    category: 'word',
    categoryLabel: 'Procesador de Textos',
    title: 'Recuperación de Documentos Cerrados sin Guardar (.asd) y Autoguardado',
    summary:
      'Procedimiento de rescate de emergencia cuando Word o Writer se cierra por accidente tras horas de trabajo sin guardar.',
    symptom:
      'El usuario abre de nuevo su documento tras un cierre brusco y solo encuentra la versión antigua del día anterior.',
    rootCause:
      'Los cambios recientes permanecían en el archivo temporal de Autorrecuperación (.asd) y aún no se habían volcado al archivo .docx definitivo.',
    stepByStepSolution: [
      'REGLA DE ORO: Pedir al usuario que NO pulse "Guardar" ni escriba sobre el documento antiguo recién abierto para no sobrescribir el historial temporal.',
      'Si el archivo ya existía previamente: ir a "Archivo > Información > Administrar documento" y seleccionar la versión etiquetada como "(cuando se cerró sin guardar)".',
      'Si era un documento nuevo que nunca llegó a guardarse: ir a "Archivo > Abrir > Recientes" y pulsar al final de la pantalla el botón "Recuperar documentos no guardados".',
      'Una vez abierto el borrador recuperado, pulsar inmediatamente el botón "Restaurar" de la barra superior amarilla o ir a "Archivo > Guardar como".',
      'Activar el interruptor de "Autoguardado" (solo funciona con archivos guardados en OneDrive o SharePoint) y verificar en "Archivo > Opciones > Guardar" que "Guardar información de Autorrecuperación" esté en 5 minutos.'
    ],
    shortcutsAndCommands: [
      { keys: 'Ctrl + G (o Ctrl + S)', action: 'Guardar cambios inmediatamente (Ctrl+G en español, Ctrl+S en inglés)' },
      { keys: 'F12', action: 'Abrir directamente la ventana de "Guardar como"' },
      { keys: 'Ctrl + Z', action: 'Deshacer el último borrado accidental de texto' }
    ],
    empathyTip:
      'El pánico por perder horas de trabajo bloquea la capacidad de leer la pantalla. Usa frases tranquilizadoras en los primeros 5 segundos: "Respire tranquilo, el programa guarda copias ocultas cada pocos minutos; no toque nada y vamos a rescatarla".'
  },
  {
    id: 'kb-word-maquetacion-pdf',
    category: 'word',
    categoryLabel: 'Procesador de Textos',
    title: 'Maquetación Estable: Marcas de Formato (¶), Saltos de Página y Exportación PDF',
    summary:
      'Solución al descuadre de páginas al editar documentos extensos y conservación de tipografías corporativas para imprenta.',
    symptom:
      'Al insertar un párrafo en las primeras páginas, todos los capítulos y tablas siguientes se desplazan. Al abrir el documento en otro ordenador, cambia la fuente tipográfica.',
    rootCause:
      'El usuario ha empujado el texto hacia abajo pulsando la tecla Enter decenas de veces en lugar de insertar un Salto de Página real. Además, envía un archivo editable (.docx) a un equipo que no tiene instaladas las fuentes.',
    stepByStepSolution: [
      'En la pestaña "Inicio" (grupo Párrafo), activar el icono "Mostrar todo (¶)" para hacer visibles los saltos de párrafo vacíos.',
      'Seleccionar y borrar con Suprimir todas las líneas de símbolos "¶" vacíos entre el final de un capítulo y el inicio del siguiente.',
      'Colocar el cursor justo delante del título del nuevo capítulo y pulsar "Ctrl + Enter" (o "Insertar > Salto de página").',
      'Volver a pulsar el icono "¶" para ocultar las marcas de edición.',
      'Para enviar a imprenta o clientes: ir a "Archivo > Exportar > Crear documento PDF/XPS" (o "Guardar como > PDF") para fijar maquetación y fuentes.'
    ],
    shortcutsAndCommands: [
      { keys: 'Ctrl + Enter', action: 'Insertar un Salto de Página limpio e inamovible' },
      { keys: 'Ctrl + Mayús + 8 (¶)', action: 'Mostrar u ocultar las marcas de formato y párrafos vacíos' },
      { keys: 'F12 -> Tipo PDF', action: 'Guardar una copia cerrada en PDF conservando las fuentes' }
    ],
    empathyTip:
      'Evita ridiculizar la costumbre de pulsar Enter repetidamente. Explícalo con naturalidad: "El símbolo ¶ nos deja ver los escalones invisibles; si los cambiamos por un Salto de Página con Ctrl + Enter, el título quedará clavado en su sitio".'
  },
  {
    id: 'kb-presentacion-proyector-moderador',
    category: 'presentation',
    categoryLabel: 'Presentaciones y Proyección',
    title: 'Proyección Dual (Win + P), Vista Moderador y Arranque de Diapositivas',
    summary:
      'Configuración rápida de salas de reuniones para proyectar diapositivas limpias al público mientras el ponente lee sus notas en el portátil.',
    symptom:
      'Al conectar el cable HDMI, el proyector solo muestra el fondo de pantalla de Windows sin iconos, o el usuario teme que el público vea sus notas privadas.',
    rootCause:
      'Windows está en modo de proyección "Extender" (escritorio extendido) sin haber lanzado aún la presentación a pantalla completa.',
    stepByStepSolution: [
      'Confirmar al usuario que si el proyector muestra el fondo de escritorio, el cable HDMI y la lámpara funcionan correctamente.',
      'Pulsar la combinación "Windows + P" para comprobar el modo de proyección: elegir "Duplicar" si se quiere ver exactamente lo mismo en ambas pantallas, o mantener "Extender" para usar la Vista Moderador.',
      'En el programa de presentaciones, ir a la pestaña "Presentación con diapositivas" y marcar la casilla "Usar vista Moderador".',
      'Pulsar la tecla "F5" para iniciar desde la primera diapositiva, o "Mayús + F5" para arrancar desde la diapositiva actual.',
      'Si las pantallas aparecen invertidas, pulsar arriba en "Mostrar configuración > Intercambiar Vista Moderador y Presentación de diapositivas".'
    ],
    shortcutsAndCommands: [
      { keys: 'Windows + P', action: 'Abrir el panel lateral de modos de proyección (Duplicar / Extender)' },
      { keys: 'F5', action: 'Iniciar presentación desde el principio (diapositiva 1)' },
      { keys: 'Mayús + F5', action: 'Iniciar presentación desde la diapositiva actual' }
    ],
    empathyTip:
      'Cuando el usuario tiene a toda la junta directiva mirándole en la sala, necesita instrucciones de menos de 15 segundos. Transmite seguridad absoluta desde la primera frase.'
  },
  {
    id: 'kb-presentacion-negro-audio',
    category: 'presentation',
    categoryLabel: 'Presentaciones y Proyección',
    title: 'Cortinilla Negra accidental (Tecla N), Audio por HDMI e Incrustación de Vídeo',
    summary:
      'Resolución de incidencias en directo durante formaciones: pantalla en negro por roce de teclado, sonido que no sale por la sala y vídeos rotos.',
    symptom:
      'A mitad de la exposición la pantalla se vuelve completamente negra al tocar el teclado, o un vídeo se ve en el proyector pero suena por el portátil.',
    rootCause:
      'Pulsación accidental de la tecla "N" (o "B" / ".") durante la presentación, salida de audio de Windows apuntando a los altavoces internos en lugar de HDMI, o vídeo insertado como vínculo externo en vez de incrustado.',
    stepByStepSolution: [
      'Si la pantalla se pone negra (o blanca) en modo presentación: pulsar de nuevo la tecla "N" (o "B", el punto "." o la barra espaciadora) para restaurar la imagen al instante.',
      'Si el vídeo no suena por la megafonía del proyector: hacer clic en el icono del "Altavoz" en la barra de tareas (esquina inferior derecha junto al reloj), abrir el selector de salida de audio y seleccionar el dispositivo "HDMI / Proyector".',
      'Al añadir vídeos a una presentación: ir a "Insertar > Vídeo > Este dispositivo" y pulsar "Insertar" (incrustar) en lugar de "Vincular al archivo".',
      'Como medida preventiva adicional, guardar siempre una copia del archivo .mp4 en la misma carpeta del pendrive junto al archivo .pptx.'
    ],
    shortcutsAndCommands: [
      { keys: 'Tecla N o Punto (.)', action: 'Poner la presentación en negro o devolver la imagen en directo' },
      { keys: 'Tecla B o Coma (,)', action: 'Poner la presentación en blanco o devolver la imagen' },
      { keys: 'Esc', action: 'Salir del modo presentación a pantalla completa' }
    ],
    empathyTip:
      'Incluso puedes ayudar al ponente a quedar bien ante su audiencia: "Pulse la tecla N y dígales a sus alumnos que apagó la pantalla a propósito para hacer una pausa de atención".'
  },
  {
    id: 'kb-soft-skills-heard',
    category: 'soft-skills',
    categoryLabel: 'Habilidades Blandas (Soft Skills)',
    title: 'Método HEARD para Desescalar Usuarios Frustrados en Helpdesk Nivel 1',
    summary:
      'Marco pedagógico para transformar una llamada tensa o desesperada en una experiencia de soporte colaborativa y educativa.',
    symptom:
      'El usuario entra gritando, culpando al departamento de sistemas, bloqueado por los nervios o con miedo a perder su trabajo.',
    rootCause:
      'La frustración tecnológica nace de la sensación de pérdida de control bajo presión de tiempo. Si el técnico responde con frialdad o tecnicismos, el bloqueo cognitivo aumenta.',
    stepByStepSolution: [
      'H - Hear (Escuchar sin interrumpir): Deja que el usuario exprese su urgencia sin cortarle ni discutir si la culpa es suya o del sistema.',
      'E - Empathize (Empatizar explícitamente): Usa frases puente reales ("Entiendo perfectamente la urgencia con la auditoría", "Es normal agobiarse cuando parece que se ha borrado").',
      'A - Assure (Asegurar y dar calma): Transmite que estás de su lado ("No se preocupe, vamos a resolverlo juntos paso a paso ahora mismo").',
      'R - Resolve (Resolver con lenguaje visual): En lugar de jerga abstracta ("cambie la ACL del vínculo"), usa referencias visuales ("haga clic arriba a la izquierda en el botón azul Archivo").',
      'D - Diagnose & Educate (Prevenir para el futuro): Antes de cerrar el ticket, regálale un truco sencillo (Ctrl + G, Mayús + F5, filtro de clip) sin tono condescendiente.'
    ],
    shortcutsAndCommands: [
      { keys: 'Evitar siempre', action: '"Cálmese", "Eso es culpa suya", "Es muy fácil", "Como ya le dije"' },
      { keys: 'Usar siempre', action: '"Entiendo la urgencia", "Vamos paso a paso", "¡Qué bien que me pregunta!"' }
    ],
    empathyTip:
      'Un usuario nunca recordará qué protocolo de red configuraste, pero siempre recordará cómo le hiciste sentir cuando estaba a punto de perder su presentación.'
  }
];
