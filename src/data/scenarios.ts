import { ScenarioTicket } from '../types/helpdesk';

export const SCENARIO_TICKETS: ScenarioTicket[] = [
  {
    id: 'ticket-email-cco-adjuntos',
    code: 'INC-1042',
    category: 'email',
    categoryLabel: 'Correo Electrónico',
    difficulty: 'Básico',
    title: 'Envío masivo a 40 clientes con archivo pesado (45 MB) y privacidad CCO',
    userName: 'Carmen Vázquez',
    userRole: 'Directora Financiera',
    userDepartment: 'Finanzas y Auditoría',
    initialFrustration: 85,
    initialMoodLabel: 'Muy alterada · A 10 min de cerrar auditoría',
    contextSummary:
      'Carmen intenta enviar el informe anual de auditoría (45 MB) a 40 clientes externos a la vez. El gestor de correo bloquea el envío por tamaño y además ha puesto las 40 direcciones en el campo "Para", con riesgo grave de filtración de datos (RGPD).',
    technicalSkillsTested: [
      'Límite estándar de adjuntos en correo (20-25 MB)',
      'Uso de enlace compartido en la nube (OneDrive / Google Drive)',
      'Diferencia entre Para, CC y CCO (Copia Oculta) para privacidad'
    ],
    softSkillsTested: [
      'Contención del estrés bajo presión de tiempo',
      'Explicación sin culpar al usuario por el error de tamaño y privacidad',
      'Guía estructurada en pasos breves'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Contención Emocional y Diagnóstico del Bloqueo',
        objective:
          'Calmar a Carmen validando su urgencia y explicarle de forma sencilla por qué el servidor rechaza el archivo de 45 MB (límite habitual de 25 MB).',
        userPrompt:
          '¡¡Por fin contestáis en soporte!! ¡Vuestro correo electrónico es una basura! Tengo que mandar AHORA MISMO el dossier de auditoría a 40 clientes, le doy a adjuntar el PDF de 45 megas y me sale una ventana roja diciendo que no se puede enviar. ¡Como no salga en 10 minutos me juego el puesto!',
        screenStateDescription:
          'Ventana de Nuevo Mensaje con alerta de error: "El archivo Dossier_Auditoria_2026.pdf (45,2 MB) supera el límite máximo permitido de 25 MB". En el campo "Para:" hay 40 direcciones de clientes externos visibles.',
        hint: 'Valida su urgencia con empatía ("Entiendo lo importante que es enviarlo a tiempo, no se preocupe") y explícale que el correo tiene un tope de 25 MB por mensaje, proponiendo subirlo a la nube corporativa (Drive/OneDrive).',
        conceptGroups: [
          {
            name: 'Límite de tamaño de adjuntos',
            description: 'Explicar que el correo electrónico limita los archivos adjuntos directos a unos 20-25 MB.',
            keywords: ['25', 'límite', 'limite', 'peso', 'tamaño', 'megas', 'mb', 'supera', 'pesado', 'grande']
          },
          {
            name: 'Alternativa de almacenamiento en la nube',
            description: 'Proponer subir el archivo a OneDrive, Google Drive o nube corporativa y compartir el enlace.',
            keywords: ['nube', 'drive', 'onedrive', 'enlace', 'link', 'compartir', 'subir', 'vínculo', 'vinculo']
          }
        ],
        modelResponse:
          'Buenos días, Carmen. Entiendo perfectamente la urgencia con la auditoría, no se preocupe que lo vamos a sacar adelante en un par de minutos. Lo que ocurre es que el correo tiene un límite de seguridad de 25 MB para adjuntos directos y su archivo pesa 45 MB. La solución más rápida es subirlo a su carpeta de OneDrive/Drive y pegar el enlace en el correo. ¿Le parece bien que lo hagamos juntos ahora mismo?',
        tacticalOptions: [
          {
            id: '1042-s1-opt1',
            label: 'Empática + Precisa (Recomendada)',
            responseText:
              'Buenos días, Carmen. Entiendo perfectamente la urgencia con la auditoría, tranquila que vamos a enviarlo a tiempo. El aviso sale porque el correo solo permite adjuntar hasta 25 MB directamente y su PDF pesa 45 MB. Vamos a subirlo en un segundo a su nube (Drive/OneDrive) para insertar el enlace de descarga.',
            empathyScore: 96,
            clarityScore: 95,
            technicalScore: 98,
            frustrationDelta: -30,
            coachFeedback:
              'Excelente intervención: validas su emoción sin ponerte a la defensiva y explicas con claridad la causa técnica (límite de 25 MB) junto con la solución inmediata.',
            userReply:
              'Uf... vale, gracias por contestar rápido. No sabía que el tope era de 25 megas. Tengo el icono de la nube aquí abierto, ¿cómo lo adjunto como enlace y qué más debo mirar antes de darle a Enviar?',
            advancesStage: true
          },
          {
            id: '1042-s1-opt2',
            label: 'Técnica pero Fría / Cortante',
            responseText:
              'El correo no es ninguna basura, funciona según el estándar SMTP. No puede meter 45 MB cuando el máximo del servidor es 25 MB. Súbalo a OneDrive o comprímalo en ZIP antes de quejarse.',
            empathyScore: 20,
            clarityScore: 65,
            technicalScore: 85,
            frustrationDelta: 15,
            coachFeedback:
              'Aunque el dato técnico de los 25 MB es correcto, confrontar al usuario ("antes de quejarse", hablar de estándar SMTP) dispara su frustración y deteriora la relación de soporte.',
            userReply:
              '¡Oiga, no me hable con esa prepotencia que bastante nerviosa estoy ya! Ya he visto que pesa mucho, ¿me dice de una vez cómo pongo el enlace de la nube sin que nadie me bloquee nada?',
            advancesStage: true
          },
          {
            id: '1042-s1-opt3',
            label: 'Amable pero Imprecisa',
            responseText:
              'Tranquila Carmen, seguro que es un fallo temporal de internet. Cierre el programa de correo, reinicie el ordenador y vuelva a intentar meter el archivo de 45 MB a ver si cuela.',
            empathyScore: 75,
            clarityScore: 60,
            technicalScore: 15,
            frustrationDelta: 10,
            coachFeedback:
              'Mantienes un tono amable, pero el diagnóstico técnico es erróneo: reiniciar el equipo no cambiará el límite de 25 MB del servidor de correo y le hará perder minutos críticos.',
            userReply:
              '¡Pero cómo voy a reiniciar el ordenador si me quedan 8 minutos! Además el cartel dice claramente que supera el límite de 25 MB. ¡Dígame una solución real para mandar este archivo tan grande!',
            advancesStage: false
          }
        ],
        successUserReply:
          'Uf, menos mal que alguien me explica el porqué con calma. No sabía lo del tope de 25 MB. Ya veo el botón de adjuntar desde la nube... ¿cómo lo configuro y qué hago con los 40 clientes que tengo puestos arriba?',
        coldSuccessUserReply:
          'Bueno, vale, ya me ha quedado claro que el límite son 25 MB, pero no hace falta que me conteste así. ¿Me dice entonces cómo comparto el enlace y envío el correo a los 40 clientes?',
        incompleteUserReply:
          'Agradezco que intente calmarme, pero el cartel sigue diciendo que 45 MB supera el máximo permitido. ¿Por qué no me deja adjuntarlo directamente y qué alternativa tengo para mandarlo ya?'
      },
      {
        stageNumber: 2,
        title: 'Privacidad de Destinatarios (CCO) y Permisos del Enlace',
        objective:
          'Guiar a Carmen para mover los 40 clientes del campo "Para" al campo "CCO" (Copia de Carbón Oculta) y configurar el enlace de la nube en modo "Solo lectura".',
        userPrompt:
          'Vale, ya he subido el PDF a la nube y se ha pegado el enlace en el cuerpo del mensaje. Tengo a los 40 clientes escritos en la casilla "Para:". ¿Le doy a Enviar ya mismo o tengo que cambiar algo para que no vean los correos de los demás ni me borren el archivo?',
        screenStateDescription:
          'Enlace de nube insertado en el cuerpo del correo. Los 40 correos de clientes externos siguen en el campo "Para:". El campo "CCO" está oculto o vacío.',
        hint: 'Indícale dos pasos clave: 1) Cortar y pegar las 40 direcciones en el campo CCO (Copia de Carbón Oculta) para que ningún cliente vea los correos de otros, y 2) Asegurar que el enlace de la nube tenga permisos de "Solo lectura / Ver".',
        conceptGroups: [
          {
            name: 'Campo CCO (Copia de Carbón Oculta)',
            description: 'Mover las direcciones de los 40 clientes al campo CCO para ocultar sus correos entre sí y cumplir con protección de datos.',
            keywords: ['cco', 'oculto', 'oculta', 'copia oculta', 'privacidad', 'no vean', 'bcc', 'protección de datos']
          },
          {
            name: 'Permisos de solo lectura en el enlace',
            description: 'Configurar el enlace compartido en modo lectura/visualización para evitar que modifiquen o borren el documento.',
            keywords: ['lectura', 'ver', 'permiso', 'permisos', 'editar', 'modifiquen', 'visualizar', 'descargar']
          }
        ],
        modelResponse:
          '¡Alto, aún no pulse Enviar! Qué bien que me ha preguntado. Primero: seleccione las 40 direcciones del campo "Para", córtelas y péguelas en el campo "CCO" (Copia de Carbón Oculta); así cada cliente recibirá el correo sin ver las direcciones de los demás. Segundo: haga clic sobre el enlace del archivo y marque "Cualquier persona con el enlace puede ver (Solo lectura)" para que nadie pueda modificarlo.',
        tacticalOptions: [
          {
            id: '1042-s2-opt1',
            label: 'Guía clara de CCO + Solo Lectura (Recomendada)',
            responseText:
              '¡Qué bien que me pregunta antes de enviar! Hagamos dos ajustes rápidos: 1) Mueva las 40 direcciones de la casilla "Para" a la casilla "CCO" (Copia Oculta); así ningún cliente verá el correo de los demás. 2) En el enlace del archivo, elija la opción "Solo lectura / Puede ver" para que puedan descargarlo sin modificar el original.',
            empathyScore: 95,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -35,
            coachFeedback:
              'Impecable: refuerzas positivamente al usuario por preguntar y le das dos instrucciones numeradas, claras y críticas para la seguridad y la ofimática.',
            userReply:
              '¡Madre mía, de la que me acaba de librar! Si llego a mandar los 40 correos en "Para" a la vista de todos, me cae una sanción de protección de datos. Ya están en CCO y el enlace en "Solo lectura".',
            advancesStage: true
          },
          {
            id: '1042-s2-opt2',
            label: 'Técnica con Jerga y Reproche',
            responseText:
              '¿Pero cómo iba a mandar 40 correos externos en el header TO? Eso es una brecha de RGPD de manual. Póngalos en BCC/CCO inmediatamente y cambie la ACL del vínculo de OneDrive a Read-Only.',
            empathyScore: 30,
            clarityScore: 55,
            technicalScore: 90,
            frustrationDelta: 10,
            coachFeedback:
              'Usas siglas en inglés ("header TO", "BCC", "ACL", "Read-Only") y regañas al usuario. Un técnico Nivel 1 debe traducir los conceptos al idioma de la interfaz del usuario con tacto.',
            userReply:
              '¡No me asuste así ni me hable en chino con lo de ACL y TO! Supongo que se refiere a ponerlos en CCO y en Solo lectura... Ya lo he cambiado, pero qué mal rato me está haciendo pasar.',
            advancesStage: true
          },
          {
            id: '1042-s2-opt3',
            label: 'Pasar a CC en lugar de CCO (Error técnico)',
            responseText:
              'Sí, no hay problema, simplemente mueva a los clientes al campo "CC" (Con Copia) y dele a Enviar directamente, que el enlace ya funciona solo.',
            empathyScore: 80,
            clarityScore: 75,
            technicalScore: 10,
            frustrationDelta: 15,
            coachFeedback:
              'Error grave de ofimática: el campo CC (Con Copia) sigue mostrando todas las direcciones de correo a todos los destinatarios. Para ocultar destinatarios entre sí es obligatorio usar CCO.',
            userReply:
              'Espere... si los pongo en "CC", ¿no siguen viendo todos los clientes las direcciones de la competencia? ¡Eso no puede ser! ¿Cuál es la casilla que oculta los correos?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡De menuda me acaba de salvar! Si llego a dejar a los 40 clientes en "Para" viendo los correos de la competencia, tenemos un lío legal enorme. Ya los he pasado a CCO y el enlace está en Solo lectura.',
        coldSuccessUserReply:
          'Vale, ya he pasado los correos a CCO y he puesto el permiso de solo lectura en el enlace, aunque podría explicarlo sin tanta superioridad.',
        incompleteUserReply:
          'Todavía tengo dudas: si los dejo en "Para" o en "CC", todos verán las direcciones de los demás. ¿En qué casilla exacta debo ponerlos para que vayan ocultos y qué permiso le pongo al enlace?'
      },
      {
        stageNumber: 3,
        title: 'Verificación de Envío y Consejo Preventivo',
        objective:
          'Confirmar que el mensaje ha salido correctamente (bandeja de Elementos enviados) y recomendar poner su propio correo en el campo "Para" al usar CCO.',
        userPrompt:
          'Ya tengo a los 40 clientes en CCO y el enlace de solo lectura listo, pero veo que el campo "Para:" se ha quedado en blanco. ¿Puedo poner mi propio correo en "Para:", darle a Enviar y cómo compruebo al 100% que ha salido?',
        screenStateDescription:
          'Campo "Para:" vacío, campo "CCO:" con 40 destinatarios, enlace de nube validado. Botón "Enviar" listo para pulsar.',
        hint: 'Confírmale que poner su propia dirección en "Para:" es una excelente práctica al usar CCO, y que tras pulsar Enviar puede verificarlo en la carpeta "Elementos enviados" (y revisar que no quede retenido en "Bandeja de salida").',
        conceptGroups: [
          {
            name: 'Autodestinatario en Para con CCO',
            description: 'Confirmar que poner el propio correo del remitente en el campo "Para" evita filtros antispam cuando todos los destinatarios van en CCO.',
            keywords: ['propio', 'su correo', 'para', 'usted misma', 'remitente', 'enviar']
          },
          {
            name: 'Verificación en Elementos Enviados / Bandeja de Salida',
            description: 'Comprobar en la carpeta "Elementos enviados" (Sent) y que no quede atascado en "Bandeja de salida".',
            keywords: ['enviados', 'elementos enviados', 'bandeja de salida', 'carpeta', 'comprobar', 'verificar']
          }
        ],
        modelResponse:
          '¡Exacto, Carmen! Poner su propio correo en la casilla "Para" cuando envía en CCO es la mejor práctica para evitar que los filtros antispam lo bloqueen. Póngase en "Para", pulse "Enviar" y compruebe en unos segundos que el mensaje aparece en la carpeta "Elementos enviados" y que la "Bandeja de salida" queda vacía.',
        tacticalOptions: [
          {
            id: '1042-s3-opt1',
            label: 'Confirmación + Verificación completa (Recomendada)',
            responseText:
              '¡Exacto, Carmen! Poner su propia dirección en "Para" al usar CCO es la mejor práctica para que ningún filtro de spam lo rechace. Pulse "Enviar" con tranquilidad y, para quedarse 100% segura, revise que la "Bandeja de salida" quede vacía y que el correo figure en su carpeta de "Elementos enviados".',
            empathyScore: 98,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -20,
            coachFeedback:
              'Cierre de ticket ejemplar: validas la iniciativa de la usuaria, explicas el motivo técnico (evitar filtros de spam con Para vacío) y le enseñas a diferenciar Bandeja de salida de Elementos enviados.',
            userReply:
              '¡Enviado! Ya aparece en Elementos enviados y me ha llegado mi propia copia al instante. Muchísimas gracias por la paciencia que ha tenido conmigo, me ha salvado la mañana.',
            advancesStage: true
          },
          {
            id: '1042-s3-opt2',
            label: 'Seca / Despachar rápido',
            responseText:
              'Sí, póngase en Para, dele a Enviar y mírelo en Enviados. Cierro el ticket que tengo más llamadas en cola.',
            empathyScore: 35,
            clarityScore: 70,
            technicalScore: 80,
            frustrationDelta: 5,
            coachFeedback:
              'Resuelves la duda técnica, pero despachar bruscamente al usuario en el último turno empaña la percepción de calidad del servicio.',
            userReply:
              'Vale, ya está en Enviados. Gracias por el arreglo, aunque vaya prisa tiene por colgarme.',
            advancesStage: true
          },
          {
            id: '1042-s3-opt3',
            label: 'Confusa sin método de verificación',
            responseText:
              'Dele a Enviar tal cual. Para saber si les ha llegado, llame por teléfono uno por uno a los 40 clientes para preguntarles.',
            empathyScore: 60,
            clarityScore: 50,
            technicalScore: 10,
            frustrationDelta: 15,
            coachFeedback:
              'No enseñas al usuario a utilizar las carpetas "Bandeja de salida" y "Elementos enviados" del cliente de correo.',
            userReply:
              '¿Pero cómo voy a llamar por teléfono a 40 clientes ahora mismo? ¿No hay una carpeta en el propio programa de correo donde se ve si el mensaje ha salido bien?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Listo! Ya ha salido de la Bandeja de salida y aparece en Elementos enviados. Muchísimas gracias por su paciencia y por explicármelo tan claro, ¡me ha salvado la auditoría!',
        coldSuccessUserReply:
          'Ya aparece en Elementos enviados. El problema técnico está resuelto, adiós.',
        incompleteUserReply:
          'Ya le he dado a Enviar poniéndome en Para, pero ¿en qué carpeta del programa de correo miro exactamente para confirmar que ya ha salido del servidor?'
      }
    ]
  },
  {
    id: 'ticket-word-archivo-perdido',
    code: 'INC-1048',
    category: 'word',
    categoryLabel: 'Procesador de Textos',
    difficulty: 'Básico',
    title: 'Pérdida de contrato de 35 páginas por cierre inesperado sin guardar',
    userName: 'Roberto Méndez',
    userRole: 'Jefe de Compras',
    userDepartment: 'Aprovisionamiento y Contratos',
    initialFrustration: 90,
    initialMoodLabel: 'Desesperado · Al borde del pánico',
    contextSummary:
      'Roberto llevaba 4 horas redactando un pliego contractual en el procesador de textos (Word) sin pulsar Guardar. La aplicación se cerró repentinamente y al abrir el archivo original solo ve el texto de ayer.',
    technicalSkillsTested: [
      'Precaución para no sobrescribir archivos temporales de autorrecuperación',
      'Ruta Archivo > Información > Administrar documento > Recuperar documentos no guardados',
      'Activación de Autoguardado y atajo Ctrl + G (o Ctrl + S)'
    ],
    softSkillsTested: [
      'Transmisión de calma inmediata ante pánico por pérdida de trabajo',
      'Instrucciones pausadas para evitar clics impulsivos',
      'Educación preventiva sin tono de reproche'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Frenar la Sobrescritura y Calmar el Pánico',
        objective:
          'Tranquilizar a Roberto informándole de que el procesador de textos guarda copias temporales automáticas y pedirle que NO pulse "Guardar" sobre el documento viejo abierto.',
        userPrompt:
          '¡¡SE ME HA BORRADO TODO!! ¡Llevo cuatro horas escribiendo el contrato de suministros de 35 páginas, se ha cerrado el programa de repente y al volver a abrir el archivo solo hay 5 páginas de ayer! ¡¡He perdido toda la mañana de trabajo, ayúdeme por favor!!',
        screenStateDescription:
          'Procesador de textos abierto con "Contrato_Suministros.docx" (versión antigua de 5 páginas). El panel lateral de Recuperación de documentos se cerró o no apareció.',
        hint: 'Transmítele tranquilidad explicando que el programa crea copias de autorrecuperación (archivos temporales .asd) cada pocos minutos, y pídele que NO guarde ni modifique ese documento antiguo para no sobrescribir el temporal.',
        conceptGroups: [
          {
            name: 'Existencia de Autorrecuperación / Copias temporales',
            description: 'Explicar que el procesador de textos guarda borradores automáticos de autorrecuperación en segundo plano.',
            keywords: ['autorrecuperación', 'autorrecuperacion', 'temporal', 'temporales', 'copia', 'automático', 'automatico', 'recuperar', 'borrador']
          },
          {
            name: 'Precaución de no guardar encima del archivo antiguo',
            description: 'Indicar que no pulse Guardar ni edite el archivo viejo todavía para no pisar la versión recuperable.',
            keywords: ['no guarde', 'no toque', 'no sobrescriba', 'no escriba', 'espere', 'sin guardar']
          }
        ],
        modelResponse:
          'Tranquilo, Roberto, respire hondo que hay muchas probabilidades de recuperar sus 35 páginas. El procesador de textos guarda copias temporales de autorrecuperación cada pocos minutos en segundo plano. Lo más importante ahora mismo: NO pulse Guardar ni escriba nada en ese documento de 5 páginas que tiene abierto para no pisar la copia temporal. ¿Me confirma que aún no lo ha guardado?',
        tacticalOptions: [
          {
            id: '1048-s1-opt1',
            label: 'Calma inmediata + Prevención de sobrescritura (Recomendada)',
            responseText:
              'Tranquilo, Roberto, no dé el trabajo por perdido. El procesador de textos realiza copias automáticas de autorrecuperación en segundo plano cada pocos minutos. Lo primero y más importante: NO pulse "Guardar" ni escriba nada sobre ese archivo antiguo de 5 páginas para no sobrescribir el temporal. Vamos a buscarlo juntos.',
            empathyScore: 98,
            clarityScore: 96,
            technicalScore: 98,
            frustrationDelta: -35,
            coachFeedback:
              'Brillante: reduces el pánico del usuario dándole una razón técnica real para tener esperanza y evitas el error clásico de guardar encima del documento antiguo.',
            userReply:
              '¡Ay, menos mal! No, no he tocado nada ni le he dado a guardar desde que se abrió. Estoy con las manos fuera del teclado. ¡Dígame por dónde busco esa copia automática, por favor!',
            advancesStage: true
          },
          {
            id: '1048-s1-opt2',
            label: 'Culpabilizadora ("Debería haber guardado")',
            responseText:
              'Pero hombre, ¿cómo se tira cuatro horas escribiendo 35 páginas sin darle a Guardar ni una sola vez? Eso es primero de informática. No toque el archivo actual, vamos a ver si por suerte hay algún temporal.',
            empathyScore: 15,
            clarityScore: 70,
            technicalScore: 75,
            frustrationDelta: 20,
            coachFeedback:
              'Regañar a un usuario que acaba de perder horas de trabajo ("eso es primero de informática") es el mayor error de empatía en un Helpdesk. Nunca culpabilices al usuario.',
            userReply:
              '¡¿Llama usted para ayudarme o para hundirme más?! ¡Ya sé que tendría que haber guardado, pero estaba concentrado redactando! Dígame de una vez dónde están esos archivos temporales.',
            advancesStage: true
          },
          {
            id: '1048-s1-opt3',
            label: 'Pesimista sin diagnóstico',
            responseText:
              'Uf, qué mala suerte Roberto. Si el programa se cerró sin guardar, lo que estaba en la memoria RAM se ha borrado para siempre. Tendrá que volver a escribir las 30 páginas desde cero.',
            empathyScore: 50,
            clarityScore: 60,
            technicalScore: 5,
            frustrationDelta: 25,
            coachFeedback:
              'Desconoces las funciones integradas de Autorrecuperación y Versiones de los procesadores de textos modernos.',
            userReply:
              '¡¿Cómo que se ha borrado para siempre?! ¡Seguro que el programa guarda copias temporales en algún sitio! ¡No me diga que lo escriba de nuevo sin mirar siquiera!',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Uf, me vuelve el alma al cuerpo! No he tocado nada ni le he dado a Guardar. Tengo la ventana abierta tal cual, ¿a qué menú voy ahora mismo para rescatar la copia?',
        coldSuccessUserReply:
          'Vale, no le he dado a guardar ni he tocado nada, pero ahórrese el sermón. ¿Dónde busco el archivo temporal?',
        incompleteUserReply:
          'Gracias por intentar animarme, pero sigo con el documento viejo en pantalla. ¿Hay alguna función automática de copias temporales en el programa y qué debo evitar tocar ahora mismo?'
      },
      {
        stageNumber: 2,
        title: 'Ruta de Recuperación de Documentos y Versiones',
        objective:
          'Guiar a Roberto paso a paso por el menú Archivo > Información > Administrar documento (o Abrir > Recientes > Recuperar documentos no guardados) para abrir el archivo temporal .asd.',
        userPrompt:
          'Estoy mirando la barra superior del procesador de textos. Veo las pestañas "Archivo", "Inicio", "Insertar"... ¿Dónde está escondida esa copia de las 35 páginas? ¡Guíeme paso a paso que con los nervios no veo nada!',
        screenStateDescription:
          'Cinta de opciones superior visible con el menú "Archivo" a la izquierda. En "Archivo > Información" aparecen las versiones de autorrecuperación de hace 6 minutos.',
        hint: 'Guíale a hacer clic en la pestaña "Archivo" (arriba a la izquierda), luego en "Información" -> "Administrar documento" (o en "Abrir" -> al final de la lista "Recuperar documentos no guardados") y elegir el borrador con la hora más reciente.',
        conceptGroups: [
          {
            name: 'Menú Archivo > Información / Abrir Recientes',
            description: 'Indicar que entre en el menú Archivo y acceda a Información o a la lista de documentos recientes.',
            keywords: ['archivo', 'información', 'informacion', 'abrir', 'recientes', 'menú', 'menu', 'pestaña']
          },
          {
            name: 'Administrar documento / Recuperar documentos no guardados',
            description: 'Seleccionar la opción Administrar documento, Historial de versiones o el botón Recuperar documentos no guardados.',
            keywords: ['administrar', 'recuperar', 'no guardados', 'versiones', 'historial', 'autoguardado', 'asd', 'borrador']
          }
        ],
        modelResponse:
          'Vamos paso a paso, es muy sencillo: 1) Haga clic arriba a la izquierda en la pestaña "Archivo". 2) Entre en el apartado "Información" y pulse el botón "Administrar documento" (justo ahí verá una versión con la etiqueta "Cuando se cerró sin guardar" de hace unos minutos). Si fuera un documento nuevo, también tiene el botón "Recuperar documentos no guardados" al final de "Archivo > Abrir". Haga clic en la versión más reciente.',
        tacticalOptions: [
          {
            id: '1048-s2-opt1',
            label: 'Guía paso a paso por menú Archivo (Recomendada)',
            responseText:
              'Vamos despacio: 1) Haga clic arriba a la izquierda en el menú "Archivo". 2) Seleccione "Información" y pulse en "Administrar documento" (ahí verá una lista con la versión automática donde pone "Cuando se cerró sin guardar"). También puede ir a "Archivo > Abrir" y pulsar abajo del todo el botón "Recuperar documentos no guardados". Abra el que tenga la hora más reciente.',
            empathyScore: 96,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -40,
            coachFeedback:
              'Excelente guía: ofreces las dos rutas exactas de ofimática (para archivos ya existentes en "Información > Administrar documento" y para archivos nuevos en "Recuperar documentos no guardados") con lenguaje visual y pausado.',
            userReply:
              '¡Espera, espera...Archivo, Información, Administrar documento... AQUÍ HAY UNO DE HACE 8 MINUTOS! ¡Lo acabo de abrir y ESTÁN LAS 35 PÁGINAS ENTERAS! ¡Casi lloro de la alegría!',
            advancesStage: true
          },
          {
            id: '1048-s2-opt2',
            label: 'Ruta avanzada por consola sin explicar menús',
            responseText:
              'Abra Ejecutar con Win+R, escriba %localappdata%\\Microsoft\\Office\\UnsavedFiles, busque el fichero con extensión .asd hexadecimal y ábralo forzando el binario desde Word.',
            empathyScore: 45,
            clarityScore: 40,
            technicalScore: 85,
            frustrationDelta: 10,
            coachFeedback:
              'Aunque la ruta %localappdata% existe, mandar a un usuario nervioso a escribir variables de entorno cuando tiene el botón directo en "Archivo > Información" complica innecesariamente la asistencia Nivel 1.',
            userReply:
              '¿Qué dice de porcentaje localappdata y binario? ¡Me ha costado horrores escribir esa ruta, pero al final he visto que dentro de Archivo > Información salía directo! Ya se han abierto las 35 páginas, pero me ha vuelto loco.',
            advancesStage: true
          },
          {
            id: '1048-s2-opt3',
            label: 'Indicación equivocada (Buscar en Papelera de Windows)',
            responseText:
              'Minimice el programa, abra la Papelera de reciclaje del escritorio y busque ahí las 30 páginas que faltan.',
            empathyScore: 70,
            clarityScore: 75,
            technicalScore: 10,
            frustrationDelta: 15,
            coachFeedback:
              'La Papelera de reciclaje solo contiene archivos eliminados del disco duro, no los cambios no guardados de un documento abierto.',
            userReply:
              '¡En la Papelera de reciclaje no hay nada! Yo no he borrado el archivo del escritorio, lo que pasó es que se cerró el programa sin guardar los cambios. ¿En qué menú del procesador de textos se recuperan?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Increíble! He ido a Archivo > Información > Administrar documento y ahí estaba la versión de hace unos minutos. ¡Están las 35 páginas completas! Arriba me sale una barra amarilla con un botón que dice "Restaurar"... ¿qué hago ahora?',
        coldSuccessUserReply:
          'Por fin lo he encontrado y están las 35 páginas. Arriba sale una barra de archivo recuperado, ¿cómo lo dejo guardado fijo?',
        incompleteUserReply:
          'Estoy dentro del menú superior del procesador de textos, pero no sé en qué opción exacta entrar para ver los documentos no guardados o las versiones anteriores. ¿Me indica los nombres de los botones?'
      },
      {
        stageNumber: 3,
        title: 'Guardado Definitivo y Prevención (Autoguardado / Ctrl + G)',
        objective:
          'Indicar a Roberto que pulse "Restaurar / Guardar como", y enseñarle el atajo de teclado de guardado rápido (Ctrl + G en español / Ctrl + S) y el intervalo de Autoguardado.',
        userPrompt:
          'Ya veo las 35 páginas en pantalla y arriba sale un aviso amarillo que dice "Archivo no guardado recuperado" con un botón. ¿Cómo me aseguro de guardarlo bien ahora mismo y qué truco me recomienda para que no me vuelva a pasar esto en la vida?',
        screenStateDescription:
          'Documento de 35 páginas recuperado en pantalla con barra superior amarilla: "ARCHIVO NO GUARDADO RECUPERADO: Este es un archivo almacenado temporalmente. [Restaurar / Guardar como]".',
        hint: 'Indícale que pulse el botón "Restaurar" o "Guardar como" inmediatamente, y enséñale a activar el interruptor de "Autoguardado" (o configurar Autorrecuperación cada 5 min) y el atajo de teclado Ctrl + G (Ctrl + S en inglés).',
        conceptGroups: [
          {
            name: 'Restaurar / Guardar como el archivo recuperado',
            description: 'Pulsar el botón Restaurar o Guardar como para consolidar el archivo temporal en el disco.',
            keywords: ['restaurar', 'guardar como', 'guardar', 'consolidar', 'fijo']
          },
          {
            name: 'Atajo Ctrl + G / Ctrl + S y Autoguardado',
            description: 'Enseñar el atajo de teclado Ctrl + G (o Ctrl + S) y la función de Autoguardado.',
            keywords: ['ctrl', 'control', 'autoguardado', 'automático', 'automatico', 'atajo', 'minutos', 'opciones']
          }
        ],
        modelResponse:
          '¡Qué alegría, Roberto! Ahora pulse inmediatamente ese botón de "Restaurar" (o vaya a "Archivo > Guardar como" y guárdelo con un nombre claro). Como consejo para que no vuelva a sufrir este susto: active la pestaña de "Autoguardado" arriba a la izquierda y acostúmbrese a pulsar el atajo "Ctrl + G" (o Ctrl + S si su versión está en inglés) cada vez que termine un apartado.',
        tacticalOptions: [
          {
            id: '1048-s3-opt1',
            label: 'Restaurar + Consejo educativo Ctrl+G y Autoguardado (Recomendada)',
            responseText:
              '¡Fantástica noticia, Roberto! Pulse ahora mismo el botón "Restaurar" (o "Guardar como") para dejarlo a salvo en su carpeta. Y para que nunca más se lleve este susto, le doy dos trucos muy cómodos: active el interruptor de "Autoguardado" arriba a la izquierda y pulse las teclas "Ctrl + G" de vez en cuando mientras escribe para guardar al instante.',
            empathyScore: 98,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -20,
            coachFeedback:
              'Cierre de 10: aseguras la persistencia inmediata de los datos y aportas educación preventiva práctica (Autoguardado + atajo Ctrl + G).',
            userReply:
              '¡Guardado y asegurado! Acabo de probar lo de Ctrl + G y he activado el Autoguardado. No sabe cuánto le agradezco la calma y la eficacia con la que me ha atendido hoy.',
            advancesStage: true
          },
          {
            id: '1048-s3-opt2',
            label: 'Cortante sin educación preventiva',
            responseText:
              'Dele al botón Restaurar y acuérdese de guardar la próxima vez para no tener que llamarnos. Hasta luego.',
            empathyScore: 30,
            clarityScore: 70,
            technicalScore: 65,
            frustrationDelta: 10,
            coachFeedback:
              'Desaprovechas la oportunidad educativa de enseñarle el atajo de teclado o el autoguardado y cierras con un reproche pasivo-agresivo.',
            userReply:
              'Ya le he dado a Restaurar. Gracias por recuperar el archivo, aunque el comentario final sobraba.',
            advancesStage: true
          },
          {
            id: '1048-s3-opt3',
            label: 'Cerrar sin pulsar Restaurar (Peligroso)',
            responseText:
              'Como ya lo ve en pantalla, ya está todo listo. Cierre la ventana con la X roja de arriba a la derecha.',
            empathyScore: 65,
            clarityScore: 60,
            technicalScore: 5,
            frustrationDelta: 20,
            coachFeedback:
              'Si cierra un archivo temporal recuperado sin pulsar "Restaurar" o "Guardar como", puede volver a perder los cambios.',
            userReply:
              '¡Espere! Si cierro con la X sin pulsar el botón "Restaurar" de la barra amarilla, ¿no se volverá a perder? ¿Cómo lo guardo definitivamente y qué atajo puedo usar en el futuro?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Ya está restaurado y guardado con copia de seguridad! Además me apunto el atajo Ctrl + G y el Autoguardado en un post-it en el monitor. ¡Mil gracias por su paciencia!',
        coldSuccessUserReply:
          'Ya está guardado en el disco. Adiós.',
        incompleteUserReply:
          'Ya le di a Restaurar, pero ¿existe algún atajo de teclado rápido o configuración de autoguardado en el programa para no tener que ir con el ratón al menú cada dos por tres?'
      }
    ]
  },
  {
    id: 'ticket-presentacion-proyector',
    code: 'INC-1053',
    category: 'presentation',
    categoryLabel: 'Presentaciones y Proyección',
    difficulty: 'Intermedio',
    title: 'Proyector muestra solo fondo vacío y ocultación de notas privadas (Vista Moderador)',
    userName: 'Elena Soriano',
    userRole: 'Directora Comercial',
    userDepartment: 'Ventas y Grandes Cuentas',
    initialFrustration: 80,
    initialMoodLabel: 'Acorralada · Con el Consejo de Administración en la sala',
    contextSummary:
      'Elena ha conectado el portátil por HDMI al proyector de la sala de juntas. El sistema está en modo "Ampliar" pero ella no sabe que es un escritorio extendido, por lo que en la pared solo se ve el fondo de pantalla vacío. Además, necesita leer sus notas de orador en su portátil sin que el Consejo las vea en la pantalla grande.',
    technicalSkillsTested: [
      'Atajo de proyección de pantalla Windows + P (Duplicar vs Ampliar/Extender)',
      'Iniciar presentación a pantalla completa (F5 / Mayús + F5)',
      'Uso de la Vista Moderador / Presentador en modo pantalla extendida'
    ],
    softSkillsTested: [
      'Acompañamiento discreto cuando el usuario está frente a público directivo',
      'Claridad espacial para explicar el concepto de pantalla extendida',
      'Seguridad y rapidez en atajos de teclado'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Diagnóstico del Escritorio Extendido y Atajo Win + P',
        objective:
          'Tranquilizar a Elena explicándole que el proyector NO está roto: está en modo "Ampliar/Extender pantalla", y enseñarle el atajo de teclado Windows + P.',
        userPrompt:
          '¡Oiga, baje ahora mismo a la Sala de Juntas o arrégleme esto por teléfono! ¡Tengo a los 8 miembros del Consejo mirándome! He enchufado el cable HDMI del proyector a mi portátil y en la pantalla de la pared solo sale la foto del paisaje de Windows vacía, ¡no sale mi PowerPoint ni mis iconos! ¡Este proyector está averiado!',
        screenStateDescription:
          'Portátil mostrando el programa de presentaciones abierto. Proyector de la sala mostrando únicamente el fondo de escritorio sin iconos (Modo de proyección actual: "Ampliar").',
        hint: 'Tranquilízala diciéndole que el cable y el proyector funcionan bien: simplemente está en modo "Ampliar" (segunda pantalla extendida). Enséñale a pulsar la tecla Windows + P para abrir el menú de Proyectar.',
        conceptGroups: [
          {
            name: 'Explicación de pantalla extendida / Modo Ampliar',
            description: 'Explicar que el proyector no está roto, sino funcionando como una segunda pantalla extendida (Ampliar).',
            keywords: ['ampliar', 'extendido', 'extendida', 'segunda pantalla', 'no está roto', 'funciona', 'duplicar']
          },
          {
            name: 'Atajo de teclado Windows + P',
            description: 'Indicar el atajo de teclado Windows + P (Win + P) para abrir el panel de modos de proyección.',
            keywords: ['win + p', 'windows + p', 'tecla windows', 'proyectar', 'win+p']
          }
        ],
        modelResponse:
          'Buenos días, Elena. Tranquila, le confirmo que ni su portátil ni el proyector están averiados, lo solucionamos en 15 segundos sin que nadie en la sala note nada. Como se ve el fondo de pantalla en la pared, significa que el cable HDMI funciona perfecto pero está en modo "Ampliar" (como si fuera un segundo monitor al lado del suyo). Pulse a la vez la tecla "Windows + P" en su teclado y dígame qué opciones le aparecen a la derecha.',
        tacticalOptions: [
          {
            id: '1053-s1-opt1',
            label: 'Tranquilizadora + Explicación de Ampliar y Win + P (Recomendada)',
            responseText:
              'Buenos días, Elena. Tranquila, el proyector y el cable están funcionando perfectamente; lo resolvemos en 15 segundos. En la pared solo ve el fondo vacío porque su equipo está en modo "Ampliar" (una segunda pantalla extendida). Pulse en su teclado la tecla "Windows + P" para abrir el menú de proyección.',
            empathyScore: 97,
            clarityScore: 96,
            technicalScore: 100,
            frustrationDelta: -30,
            coachFeedback:
              'Excelente: le das seguridad frente al Consejo de Administración, diagnosticas al instante por qué se ve solo el fondo de pantalla y le das el atajo universal Win + P.',
            userReply:
              '¡Ay, menos mal! He pulsado Windows + P y me ha salido una columna a la derecha con cuatro dibujos: "Solo pantalla de PC", "Duplicado", "Ampliar" y "Solo segunda pantalla". Ahora mismo está marcado "Ampliar".',
            advancesStage: true
          },
          {
            id: '1053-s1-opt2',
            label: 'Sarcástica sobre pantallas duales',
            responseText:
              'El proyector no está roto, es que no sabe cómo funciona un escritorio extendido en Windows. Pulse Windows + P en vez de echarle la culpa al cable HDMI.',
            empathyScore: 20,
            clarityScore: 70,
            technicalScore: 85,
            frustrationDelta: 15,
            coachFeedback:
              'Ridiculizar a un usuario que está pasando apuros frente a la directiva aumenta su tensión. El diagnóstico es correcto, pero la forma falla.',
            userReply:
              'Le recuerdo que estoy en altavoz bajito delante del director general, ¡ahórrese los comentarios! Ya he pulsado Windows + P y veo que está en "Ampliar". ¿Ahora qué hago?',
            advancesStage: true
          },
          {
            id: '1053-s1-opt3',
            label: 'Mandar desenchufar y reiniciar el proyector (Error)',
            responseText:
              'Si solo sale el fondo sin iconos es que el cable HDMI está mal conectado. Desenchúfelo y apague el proyector del techo con el mando.',
            empathyScore: 65,
            clarityScore: 60,
            technicalScore: 5,
            frustrationDelta: 20,
            coachFeedback:
              'Error técnico: si el proyector muestra el fondo de escritorio de Windows, la señal de vídeo HDMI llega perfectamente. Apagar el proyector le hará perder 5 minutos de enfriamiento de lámpara.',
            userReply:
              '¡¿Cómo voy a apagar el proyector si tarda 5 minutos en volver a encenderse?! ¡Además el fondo de mi ordenador sí se ve nítido en la pared! ¿No será una configuración de pantalla?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Qué alivio oír eso! Acabo de pulsar Windows + P y veo a la derecha que está marcado "Ampliar". Ahora bien: tengo apuntes confidenciales debajo de cada diapositiva que quiero leer en mi portátil sin que el Consejo los vea en la pared. ¿Cómo lanzo la presentación así?',
        coldSuccessUserReply:
          'Ya he pulsado Windows + P y sale marcado "Ampliar". Quiero que en la pared salga la diapositiva limpia y en mi portátil mis notas privadas. ¿Qué pulso?',
        incompleteUserReply:
          'Entiendo que el proyector no está roto, pero ¿qué combinación de teclas de Windows pulso exactamente para ver u ordenar los modos de proyección de pantalla?'
      },
      {
        stageNumber: 2,
        title: 'Vista Moderador y Lanzamiento con F5',
        objective:
          'Explicar a Elena que manteniendo el modo "Ampliar", al activar "Usar Vista Moderador" y pulsar F5 (o Mayús + F5), el público verá la diapositiva limpia en el proyector mientras ella ve sus notas privadas en el portátil.',
        userPrompt:
          'Escuche bien: en mi presentación tengo notas privadas con los márgenes de descuento en cada diapositiva. Si pongo "Duplicado", el Consejo verá mis notas en la pared. ¿Cómo hago para que en el proyector salga SOLO la diapositiva a pantalla completa y en mi portátil vea mis notas?',
        screenStateDescription:
          'Menú Windows + P en modo "Ampliar". Programa de presentaciones en vista de edición mostrando el panel inferior de notas confidenciales.',
        hint: 'Indícale que mantenga el modo "Ampliar" (porque permite mostrar cosas distintas en cada pantalla), que en la pestaña "Presentación con diapositivas" marque "Usar Vista Moderador" y que pulse la tecla F5 para iniciar desde el principio.',
        conceptGroups: [
          {
            name: 'Mantener modo Ampliar + Vista Moderador / Presentador',
            description: 'Explicar que el modo Ampliar junto con la "Vista Moderador" permite ver notas en el portátil y solo la diapositiva en el proyector.',
            keywords: ['moderador', 'presentador', 'vista moderador', 'ampliar', 'notas', 'presentación con diapositivas']
          },
          {
            name: 'Atajo F5 (o Mayús + F5) para iniciar presentación',
            description: 'Pulsar la tecla F5 (o el icono de copita/presentación) para lanzar las diapositivas a pantalla completa.',
            keywords: ['f5', 'pantalla completa', 'iniciar', 'desde el principio', 'copita']
          }
        ],
        modelResponse:
          '¡Precisamente para eso el modo "Ampliar" es perfecto! Déjelo en "Ampliar", vaya en su programa de presentaciones a la pestaña superior "Presentación con diapositivas", asegúrese de que la casilla "Usar vista Moderador" está marcada, y pulse la tecla "F5" en su teclado. Verá que en el proyector aparece la diapositiva limpia a pantalla completa y en su portátil se abre su consola privada con sus notas y el reloj.',
        tacticalOptions: [
          {
            id: '1053-s2-opt1',
            label: 'Mantener Ampliar + Vista Moderador + F5 (Recomendada)',
            responseText:
              '¡Para eso el modo "Ampliar" es su mejor aliado! Déjelo en "Ampliar" y haga esto: en la pestaña superior "Presentación con diapositivas", verifique que la casilla "Usar vista Moderador" esté marcada. Ahora pulse la tecla "F5". En el proyector saldrá solo la diapositiva limpia y en su portátil verá sus notas privadas y la diapositiva siguiente.',
            empathyScore: 98,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -35,
            coachFeedback:
              'Dominio total de ofimática: explicas por qué "Ampliar" es necesario para la Vista Moderador y le das el atajo directo F5 para arrancar con elegancia.',
            userReply:
              '¡Acabo de pulsar F5 y es magia pura! En la pared se ve la portada a pantalla completa y en mi portátil tengo mis notas de descuentos y el cronómetro. ¡Un último detalle rápido!',
            advancesStage: true
          },
          {
            id: '1053-s2-opt2',
            label: 'Cambiar a Duplicado (Expone las notas privadas)',
            responseText:
              'Elija "Duplicado" en el menú Windows + P y arrastre la ventana un poco hacia abajo para intentar esconder las notas fuera del borde.',
            empathyScore: 60,
            clarityScore: 65,
            technicalScore: 10,
            frustrationDelta: 20,
            coachFeedback:
              'Error grave: en modo "Duplicado" ambas pantallas muestran exactamente la misma imagen; el público verá la interfaz del programa y sus notas privadas.',
            userReply:
              '¡¿Pero qué dice?! ¡Si pongo "Duplicado" van a ver toda mi pantalla y mis notas de márgenes! ¿No existe un modo de presentador o moderador usando las dos pantallas separadas y una tecla para lanzar la presentación?',
            advancesStage: false
          },
          {
            id: '1053-s2-opt3',
            label: 'Correcta pero brusca',
            responseText:
              'Déjelo en Ampliar, active Vista Moderador en la pestaña Presentación y dele a F5. Es la función básica de cualquier presentación.',
            empathyScore: 35,
            clarityScore: 80,
            technicalScore: 95,
            frustrationDelta: 5,
            coachFeedback:
              'La solución técnica es exacta, pero la coletilla "es la función básica" resulta condescendiente.',
            userReply:
              'Ya he pulsado F5 con la Vista Moderador y se ve bien, aunque podría ahorrarse la ironía.',
            advancesStage: true
          }
        ],
        successUserReply:
          '¡Funciona de maravilla! En la pared está la portada limpia y en mi portátil veo mis notas confidenciales. Solo una cosa: si las pantallas salieran al revés (las notas en la pared y la diapositiva en mi portátil), ¿dónde se invierten y cómo avanzo desde una diapositiva concreta?',
        coldSuccessUserReply:
          'Ya está la Vista Moderador activa con F5. Si en otra sala me salen las pantallas invertidas o quiero empezar desde la diapositiva 10 sin pasar por la 1, ¿cómo se hace?',
        incompleteUserReply:
          'Todavía no he lanzado la presentación porque no sé qué casilla activar para ver mis notas solo en mi portátil ni qué tecla pulsar para que empiece a pantalla completa.'
      },
      {
        stageNumber: 3,
        title: 'Conmutación de Pantallas y Atajo Mayús + F5',
        objective:
          'Enseñar a Elena el botón "Configuración de visualización > Cambiar entre vista Moderador y Presentación" por si las pantallas salen invertidas, y el atajo Mayús + F5 para iniciar desde la diapositiva actual.',
        userPrompt:
          'Por si durante la reunión cierro la presentación para enseñar un Excel y luego quiero retomar en la diapositiva 12 sin volver a la 1, ¿qué atajo uso? ¿Y qué botón toco arriba si algún día me salen las notas en la pared y la diapositiva en el portátil?',
        screenStateDescription:
          'Vista Moderador activa en el portátil con barra superior mostrando "Configuración de visualización" (Cambiar entre vista Moderador y Presentación).',
        hint: 'Explícale dos trucos de oro: 1) Para reanudar desde la diapositiva actual se pulsa "Mayús + F5" (Shift + F5). 2) Si las pantallas salen al revés, arriba en la Vista Moderador se pulsa "Configuración de visualización > Cambiar entre vista Moderador y Presentación".',
        conceptGroups: [
          {
            name: 'Atajo Mayús + F5 (Diapositiva actual)',
            description: 'Explicar que Mayús + F5 (Shift + F5) inicia la presentación directamente desde la diapositiva seleccionada.',
            keywords: ['mayús + f5', 'mayus + f5', 'shift + f5', 'shift+f5', 'actual', 'diapositiva actual']
          },
          {
            name: 'Cambiar / Invertir pantallas en Configuración de visualización',
            description: 'Indicar el menú "Configuración de visualización > Cambiar entre vista Moderador y Presentación" en la parte superior.',
            keywords: ['configuración de visualización', 'configuracion de visualizacion', 'cambiar', 'invertir', 'intercambiar', 'arriba']
          }
        ],
        modelResponse:
          'Le dejo los dos trucos apuntados: 1) Para retomar directamente en la diapositiva en la que esté sin volver a la portada, pulse "Mayús + F5" (Shift + F5). 2) Si alguna vez le salen las pantallas invertidas, justo en el borde superior de su Vista Moderador verá "Configuración de visualización"; pulse ahí y elija "Cambiar entre vista Moderador y Presentación" para intercambiarlas al instante. ¡Mucha suerte con el Consejo!',
        tacticalOptions: [
          {
            id: '1053-s3-opt1',
            label: 'Mayús + F5 + Intercambiar pantallas (Recomendada)',
            responseText:
              'Dos trucos rapidísimos que le van a encantar: 1) Para arrancar directamente en la diapositiva actual (como la 12), pulse "Mayús + F5" (Shift + F5). 2) Si algún día las pantallas salen al revés, en la barra superior de su Vista Moderador pulse "Configuración de visualización" y elija "Cambiar entre vista Moderador y Presentación". ¡Mucho éxito en la reunión!',
            empathyScore: 98,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -20,
            coachFeedback:
              'Resolución sobresaliente: respondes con precisión quirúrgica a ambas dudas de ofimática y despides a la usuaria dándole confianza para su presentación.',
            userReply:
              '¡Apuntado Mayús + F5 y el botón de Configuración de visualización! Ha sido usted rapidísimo, claro y súper amable. ¡Empiezo la reunión ahora mismo, mil gracias!',
            advancesStage: true
          },
          {
            id: '1053-s3-opt2',
            label: 'Incompleta / Desconoce Mayús + F5',
            responseText:
              'No se puede empezar en la diapositiva 12 con el teclado, dele a F5 y pase rápido las 12 primeras con la flecha delante de todos.',
            empathyScore: 60,
            clarityScore: 65,
            technicalScore: 15,
            frustrationDelta: 15,
            coachFeedback:
              'Desconoces el atajo estándar Mayús + F5 (Iniciar desde la diapositiva actual) y el conmutador de pantallas de la Vista Moderador.',
            userReply:
              '¿Cómo voy a pasar 12 diapositivas a toda prisa delante del Consejo? ¡Seguro que hay una combinación con F5 para abrir directamente la diapositiva actual y un botón para intercambiar monitores!',
            advancesStage: false
          },
          {
            id: '1053-s3-opt3',
            label: 'Correcta pero apurada',
            responseText:
              'Use Shift + F5 para la diapositiva actual y el botón Cambiar pantallas en Configuración de visualización arriba. Le dejo que tengo más tickets.',
            empathyScore: 45,
            clarityScore: 80,
            technicalScore: 95,
            frustrationDelta: 0,
            coachFeedback:
              'Datos técnicos correctos, aunque el cierre resulta seco.',
            userReply:
              'Vale, tomo nota de Shift + F5 y Configuración de visualización. Gracias.',
            advancesStage: true
          }
        ],
        successUserReply:
          '¡Todo anotado! Mayús + F5 para la diapositiva actual y Configuración de visualización para intercambiar pantallas. ¡Muchísimas gracias por la ayuda tan profesional!',
        coldSuccessUserReply:
          'Anotado Mayús + F5 y el cambio de visualización. Gracias, empiezo la reunión.',
        incompleteUserReply:
          'Perdone, ¿me confirma qué tecla se combina con F5 para empezar en la diapositiva actual y cómo se llama el menú de arriba para intercambiar las pantallas?'
      }
    ]
  },
  {
    id: 'ticket-email-spam-desconectado',
    code: 'INC-1059',
    category: 'email',
    categoryLabel: 'Correo Electrónico',
    difficulty: 'Intermedio',
    title: 'Bandeja sin recibir correos urgentes: Modo sin conexión, Spam y Reglas',
    userName: 'Julián Ortega',
    userRole: 'Coordinador de Logística',
    userDepartment: 'Almacén y Transporte',
    initialFrustration: 88,
    initialMoodLabel: 'Furioso · Camiones esperando en el muelle de carga',
    contextSummary:
      'Julián asegura que el servidor de correo de la empresa está caído porque lleva desde las 9:00 sin recibir correos y un proveedor le acaba de enviar un albarán urgente. En realidad, activó por error el botón "Trabajar sin conexión" en su cliente de correo y además tiene correos del proveedor retenidos en "Correo no deseado (Spam)".',
    technicalSkillsTested: [
      'Verificación de estado "Trabajar sin conexión" en la barra de estado y pestaña Enviar y recibir',
      'Revisión de carpeta Correo no deseado (Spam) y marcaje de remitente seguro',
      'Búsqueda avanzada por remitente o adjunto (tiene:adjunto)'
    ],
    softSkillsTested: [
      'No confrontar cuando el usuario acusa injustamente al departamento de sistemas',
      'Guiar la inspección visual de la pantalla de abajo hacia arriba',
      'Refuerzo positivo al resolver la incidencia'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Desescalada y Detección de "Trabajar sin conexión"',
        objective:
          'Mantener la calma ante las quejas contra informática y guiar a Julián para que mire la esquina inferior derecha de su programa de correo, donde aparece "Trabajando sin conexión".',
        userPrompt:
          '¡Otra vez habéis roto el servidor de correo los de informática! Tengo tres camiones parados en el muelle de carga esperando los albaranes en PDF y mi bandeja de entrada no recibe ni un solo mensaje desde las 9:00 de la mañana. ¡Arreglad vuestro servidor AHORA MISMO!',
        screenStateDescription:
          'Cliente de correo abierto en Bandeja de entrada (último correo 08:58). En la barra inferior de estado aparece el texto "¡Trabajando sin conexión!" y en la pestaña "Enviar y recibir" el botón "Trabajar sin conexión" está sombreado.',
        hint: 'No entres al trapo de la acusación: empatiza con el bloqueo de los camiones y pídele que mire la barra inferior de su ventana de correo o la pestaña "Enviar y recibir" para ver si se pulsó sin querer el botón "Trabajar sin conexión".',
        conceptGroups: [
          {
            name: 'Comprobar estado "Trabajar sin conexión"',
            description: 'Revisar en la barra inferior de estado o en la pestaña "Enviar y recibir" si está activo el modo "Trabajar sin conexión".',
            keywords: ['sin conexión', 'sin conexion', 'desconectado', 'enviar y recibir', 'barra inferior', 'abajo', 'conectado']
          }
        ],
        modelResponse:
          'Buenos días, Julián. Entiendo el agobio de tener tres camiones esperando en el muelle, vamos a desbloquearlo enseguida. He comprobado el servidor general y está operativo, así que lo más probable es que su programa de correo haya quedado en pausa. ¿Puede mirar en la barra inferior de la ventana del correo si pone "Trabajando sin conexión", o entrar en la pestaña superior "Enviar y recibir" y pulsar el botón "Trabajar sin conexión" para reconectarlo?',
        tacticalOptions: [
          {
            id: '1059-s1-opt1',
            label: 'Empática + Verificación de "Trabajar sin conexión" (Recomendada)',
            responseText:
              'Buenos días, Julián. Comprendo perfectamente la urgencia con los tres camiones en el muelle, vamos a solucionarlo ya mismo. El servidor central está funcionando bien, pero a veces se pulsa sin querer un botón que pausa la entrada de mensajes. Mire abajo del todo en la barra de su correo si dice "Trabajando sin conexión", y en la pestaña "Enviar y recibir" pulse el botón "Trabajar sin conexión" para volver a conectarlo.',
            empathyScore: 96,
            clarityScore: 96,
            technicalScore: 100,
            frustrationDelta: -30,
            coachFeedback:
              'Excelente manejo de objeciones: no te pones a la defensiva, empatizas con el problema logístico y vas directo a la causa número 1 cuando no entran correos desde una hora exacta.',
            userReply:
              'A ver... miro abajo a la derecha... ¡Ostras, pues sí que pone "Trabajando sin conexión"! Le acabo de dar al botón en "Enviar y recibir" y están entrando 18 correos de golpe... ¡Pero espere, que el del proveedor del camión 3 sigue sin aparecer en la bandeja de entrada!',
            advancesStage: true
          },
          {
            id: '1059-s1-opt2',
            label: 'Defensiva y sarcástica',
            responseText:
              'Nosotros no hemos roto ningún servidor, deje de inventar caídas. Mire su pantalla abajo donde pone "Trabajando sin conexión" porque lo ha desactivado usted mismo con el ratón.',
            empathyScore: 15,
            clarityScore: 75,
            technicalScore: 85,
            frustrationDelta: 15,
            coachFeedback:
              'Aunque aciertas el diagnóstico técnico, acusar al usuario ("deje de inventar", "lo ha desactivado usted mismo") genera un conflicto innecesario.',
            userReply:
              '¡Oiga, baje esos humos que yo no lo he tocado a propósito! Ya le he dado al botón de Trabajar sin conexión y han entrado correos, pero el albarán de Transportes Iberia sigue sin salir aquí.',
            advancesStage: true
          },
          {
            id: '1059-s1-opt3',
            label: 'Pedirle cambiar la contraseña del correo (Incorrecto)',
            responseText:
              'Seguro que se le ha bloqueado la cuenta entera. Entre en la web de recursos humanos y solicite un cambio de contraseña de 24 horas.',
            empathyScore: 60,
            clarityScore: 55,
            technicalScore: 10,
            frustrationDelta: 20,
            coachFeedback:
              'Diagnóstico erróneo que paralizaría el muelle de carga durante horas sin haber revisado siquiera el estado de conexión del cliente de correo.',
            userReply:
              '¡¿Cómo que 24 horas si tengo tres camiones en la puerta?! Miremos antes mi programa de correo, que abajo a la derecha sale un cartelito raro de conexión.',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Tenía razón! Abajo ponía "Trabajando sin conexión", seguro que le di sin querer al limpiar el teclado. Ya han entrado los correos de los dos primeros camiones, ¡pero el albarán del tercer camión (de un proveedor nuevo) sigue sin aparecer en mi Bandeja de entrada!',
        coldSuccessUserReply:
          'Ya he quitado lo de "Trabajar sin conexión" y han entrado correos, pero falta el albarán del proveedor nuevo del tercer camión. ¿Dónde está?',
        incompleteUserReply:
          'Sigo sin recibir ni un solo correo desde las 9:00. ¿Dónde miro en la pantalla del programa de correo para saber si está desconectado o en pausa?'
      },
      {
        stageNumber: 2,
        title: 'Inspección de Correo no Deseado (Spam) y Búsqueda con Filtros',
        objective:
          'Guiar a Julián para revisar la carpeta "Correo no deseado (Spam)" y utilizar el buscador de correo para localizar el albarán del proveedor nuevo.',
        userPrompt:
          'El proveedor nuevo me acaba de mandar captura por WhatsApp demostrando que nos envió el albarán hace 15 minutos con un PDF adjunto, pero en mi Bandeja de entrada no está. ¿Dónde se ha podido meter ese mensaje?',
        screenStateDescription:
          'Estado: "Conectado". Bandeja de entrada actualizada. En el panel izquierdo de carpetas se ve "Correo no deseado [1]" en negrita.',
        hint: 'Al ser un proveedor nuevo con un PDF adjunto, es muy frecuente que el filtro antispam lo desvíe. Pídele que revise la carpeta "Correo no deseado (Spam)" en el panel izquierdo o que use la barra de búsqueda superior.',
        conceptGroups: [
          {
            name: 'Carpeta Correo no deseado / Spam',
            description: 'Indicar que revise la carpeta "Correo no deseado" o "Spam" en la columna izquierda de carpetas.',
            keywords: ['no deseado', 'spam', 'basura', 'carpeta', 'izquierda', 'filtro']
          },
          {
            name: 'Buscador de correo / RemitenteSeguro',
            description: 'Usar el buscador en "Todos los elementos" o marcar el correo como "No es correo no deseado / Remitente seguro".',
            keywords: ['buscar', 'buscador', 'seguro', 'no es spam', 'mover', 'bandeja de entrada', 'remitente']
          }
        ],
        modelResponse:
          'Como es la primera vez que ese proveedor le escribe y trae un PDF adjunto, es muy probable que el filtro de seguridad lo haya apartado. Mire en la columna de carpetas de la izquierda y haga clic en "Correo no deseado" (o "Spam"). Cuando lo vea ahí, haga clic derecho sobre el mensaje y seleccione "Correo no deseado > No es correo no deseado" (y marque "Confiar siempre en el remitente") para que pase a su Bandeja de entrada.',
        tacticalOptions: [
          {
            id: '1059-s2-opt1',
            label: 'Revisar Spam + Marcar Remitente Seguro (Recomendada)',
            responseText:
              'Al ser un proveedor nuevo con archivo PDF, seguro que el filtro preventivo lo ha retenido. Mire en la lista de carpetas de la izquierda y entre en "Correo no deseado" (Spam). Cuando lo vea, haga clic derecho sobre él y elija "No es correo no deseado" (marcando confiar en el remitente) para que vuelva a su Bandeja de entrada y le deje abrir el PDF.',
            empathyScore: 95,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -35,
            coachFeedback:
              'Explicas el motivo lógico por el que el correo fue a Spam y le enseñas a desmarcarlo como remitente seguro (necesario porque muchos gestores bloquean la descarga de adjuntos mientras el correo sigue dentro de la carpeta Spam).',
            userReply:
              '¡BINGO! ¡Estaba metido en Correo no deseado! Lo acabo de marcar como "No es correo no deseado" y ya se me ha pasado a la Bandeja de entrada con el PDF del albarán listo para imprimir.',
            advancesStage: true
          },
          {
            id: '1059-s2-opt2',
            label: 'Seca sin explicar cómo sacarlo de Spam',
            responseText:
              'Mire en la carpeta de Spam a la izquierda, que los usuarios nunca miráis ahí antes de llamar.',
            empathyScore: 25,
            clarityScore: 65,
            technicalScore: 70,
            frustrationDelta: 10,
            coachFeedback:
              'Comentario despectivo ("nunca miráis ahí antes de llamar") y además no le explicas cómo marcar el remitente como seguro para desbloquear el PDF.',
            userReply:
              'Ya lo he visto en Correo no deseado y lo he sacado a la bandeja de entrada, pero podría ahorrarse la pullita.',
            advancesStage: true
          },
          {
            id: '1059-s2-opt3',
            label: 'Decirle que el proveedor miente',
            responseText:
              'Si no sale en su Bandeja de entrada ahora que está conectado, es que el proveedor le ha engañado y no ha enviado nada.',
            empathyScore: 50,
            clarityScore: 60,
            technicalScore: 5,
            frustrationDelta: 20,
            coachFeedback:
              'Nunca descartes que un correo haya caído en "Correo no deseado (Spam)" o en otra carpeta antes de revisar el buzón completo.',
            userReply:
              '¡Que me acaba de mandar la foto de su pantalla con mi dirección bien escrita! ¿No habrá otra carpeta en mi correo donde vayan a parar los mensajes sospechosos?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Ahí estaba, en Correo no deseado! Ya lo he marcado como remitente seguro y acabo de mandar el albarán a la impresora del muelle. Por cierto, ¿cómo puedo buscar rápido en el futuro cualquier correo que tenga un PDF adjunto sin perder tiempo?',
        coldSuccessUserReply:
          'Ya he sacado el albarán de Correo no deseado. ¿Cómo busco rápido correos con adjuntos otra vez?',
        incompleteUserReply:
          'En la Bandeja de entrada principal no aparece. ¿En qué carpeta de la columna izquierda suelen quedarse retenidos los correos de proveedores nuevos y cómo lo paso a la bandeja normal?'
      },
      {
        stageNumber: 3,
        title: 'Búsqueda Rápida de Adjuntos y Cierre Preventivo',
        objective:
          'Enseñar a Julián a usar el filtro "Tiene archivos adjuntos" (o escribir tiene:adjunto / nombre del archivo) en la barra de búsqueda superior y verificar el estado "Conectado" abajo.',
        userPrompt:
          'Con el volumen de albaranes que recibo al día, ¿qué truco me enseña para filtrar en un segundo solo los correos que traigan archivos adjuntos y cómo distingo de un vistazo si mi correo está conectado?',
        screenStateDescription:
          'Bandeja de entrada con barra de búsqueda superior activa y botón de filtro rápido "Tiene archivos adjuntos". Barra inferior mostrando "Conectado a: Servidor de correo".',
        hint: 'Indícale que al hacer clic en la barra de búsqueda superior aparece el botón "Tiene archivos adjuntos" (o escribiendo tiene:adjunto / ext:pdf) y que abajo a la derecha siempre debe figurar "Conectado".',
        conceptGroups: [
          {
            name: 'Filtro de búsqueda "Tiene archivos adjuntos"',
            description: 'Usar la barra de búsqueda con el botón "Tiene archivos adjuntos" o buscar por ".pdf" / "tiene:adjunto".',
            keywords: ['adjuntos', 'tiene archivos adjuntos', 'tiene:adjunto', 'pdf', 'búsqueda', 'busqueda', 'filtrar', 'clip']
          },
          {
            name: 'Verificación visual de "Conectado" en barra inferior',
            description: 'Comprobar en la barra de estado inferior que ponga "Conectado" o "Todas las carpetas están actualizadas".',
            keywords: ['conectado', 'actualizadas', 'barra inferior', 'abajo', 'estado']
          }
        ],
        modelResponse:
          'Le va a resultar comodísimo: cuando haga clic en la barra de "Buscar" de arriba, pulse el botón con el icono del clip que dice "Tiene archivos adjuntos" (o escriba directamente ".pdf" junto al nombre de la empresa) y le filtrará al instante solo los albaranes en todas las carpetas. Y de un vistazo, fíjese siempre en que abajo a la derecha ponga "Conectado".',
        tacticalOptions: [
          {
            id: '1059-s3-opt1',
            label: 'Filtro de adjuntos + Chequeo visual de estado (Recomendada)',
            responseText:
              'Le doy un truco que usa mucho logística: haga clic en la barra de búsqueda de arriba y pulse el botón con el icono del clip "Tiene archivos adjuntos" (o escriba ".pdf" y el nombre del proveedor); así busca en todo el buzón a la vez. Y para quedarse tranquilo, mire siempre que en la esquina inferior derecha ponga "Conectado".',
            empathyScore: 98,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -25,
            coachFeedback:
              'Cierre pedagógico excelente: adaptas el consejo al puesto de trabajo del usuario (logística y albaranes PDF) y refuerzas la comprobación de la barra de estado.',
            userReply:
              '¡Oiga, qué maravilla lo del botón de "Tiene archivos adjuntos" y buscar por .pdf! Disculpe que haya entrado tan brusco al principio con los nervios de los camiones, me ha atendido usted de diez.',
            advancesStage: true
          },
          {
            id: '1059-s3-opt2',
            label: 'Breve pero funcional',
            responseText:
              'Use la lupa de arriba marcando "Tiene adjuntos" y mire que abajo ponga "Conectado". Cierro la incidencia.',
            empathyScore: 55,
            clarityScore: 75,
            technicalScore: 85,
            frustrationDelta: -5,
            coachFeedback:
              'Cumple técnicamente, aunque con poca calidez.',
            userReply:
              'Vale, entendido lo de la lupa de adjuntos y lo de Conectado abajo. Gracias.',
            advancesStage: true
          },
          {
            id: '1059-s3-opt3',
            label: 'Sin filtro de búsqueda',
            responseText:
              'No hay forma de filtrar por adjuntos, tiene que ir mirando correo por correo fijándose si tienen el dibujo del clip al lado.',
            empathyScore: 60,
            clarityScore: 60,
            technicalScore: 10,
            frustrationDelta: 15,
            coachFeedback:
              'Todos los clientes de correo incluyen el filtro de búsqueda por archivos adjuntos.',
            userReply:
              '¿En pleno siglo XXI tengo que mirar 300 correos a ojo buscando un clip? ¡Pero si al pinchar en la barra de buscar de arriba veo varios botones de filtro! ¿Cuál uso?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Acabo de probar la búsqueda filtrando por archivos adjuntos y salen todos los albaranes al instante! Perdone que me haya puesto tan nervioso al principio, ha sido usted súper paciente y eficaz.',
        coldSuccessUserReply:
          'Entendido el filtro de adjuntos y el estado Conectado. Gracias.',
        incompleteUserReply:
          'He hecho clic en la caja de búsqueda de arriba, pero ¿cómo filtro específicamente los mensajes que llevan archivos adjuntos o PDF y qué palabra debe salir en la barra de abajo del todo?'
      }
    ]
  },
  {
    id: 'ticket-word-formato-pdf',
    code: 'INC-1064',
    category: 'word',
    categoryLabel: 'Procesador de Textos',
    difficulty: 'Avanzado',
    title: 'Maquetación descuadrada al insertar líneas y cambio de fuentes al enviar a imprenta',
    userName: 'Lucía Pardo',
    userRole: 'Secretaria de Dirección',
    userDepartment: 'Presidencia',
    initialFrustration: 82,
    initialMoodLabel: 'Frustrada · Lleva 2 horas peleándose con los saltos de página',
    contextSummary:
      'Lucía ha separado los capítulos de la Memoria Anual pulsando la tecla Enter 30 veces seguidas en lugar de insertar Saltos de Página reales. Cada vez que añade una frase en la página 2, todo el resto del documento de 40 páginas se mueve y se descuadra. Además, al enviar el archivo editable a la imprenta, le dicen que la tipografía corporativa les sale cambiada.',
    technicalSkillsTested: [
      'Mostrar marcas de formato ocultas (icono ¶ o Ctrl + Mayús + 8)',
      'Sustituir líneas en blanco (Enter) por Salto de Página (Ctrl + Enter)',
      'Exportar / Guardar como PDF para conservar maquetación y tipografías'
    ],
    softSkillsTested: [
      'Empatizar con la frustración de maquetación en procesadores de texto',
      'Explicar el concepto de marcas invisibles (¶) de forma visual y amena',
      'Aportar autonomía profesional al usuario'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Diagnóstico con Marcas de Formato (Símbolo ¶)',
        objective:
          'Empatizar con Lucía y pedirle que pulse el botón "Mostrar todo (¶)" en la pestaña Inicio (o Ctrl + Mayús + 8) para descubrir por qué se empujan las páginas.',
        userPrompt:
          '¡Estoy a punto de tirar el ordenador por la ventana! Cada vez que añado DOS LÍNEAS en la introducción de la página 2, ¡todos los títulos y las tablas de las 40 páginas siguientes se bajan y se quedan cortados a mitad de hoja! ¡Llevo dos horas subiendo y bajando cosas a mano y este programa hace lo que le da la gana!',
        screenStateDescription:
          'Documento "Memoria_Anual_2026.docx" con títulos desplazados a mitad de página. Las marcas de formato (¶) están ocultas.',
        hint: 'Empatiza con ella (es uno de los problemas más frustrantes de Word) y pídele que en la pestaña "Inicio" pulse el icono con forma de P invertida "¶" (Mostrar todo, o atajo Ctrl + Mayús + 8) para ver si hay decenas de pulsaciones de la tecla Enter vacías.',
        conceptGroups: [
          {
            name: 'Mostrar marcas de formato (Icono ¶ / Mostrar todo)',
            description: 'Activar el botón "Mostrar todo" (símbolo calderón ¶ en la pestaña Inicio) para visualizar los saltos de párrafo vacíos.',
            keywords: ['mostrar todo', 'marcas', 'formato', 'símbolo', 'simbolo', 'párrafo', 'parrafo', 'inicio', '¶', 'ctrl']
          },
          {
            name: 'Causa del descuadre: pulsaciones repetidas de Enter / Intro',
            description: 'Explicar que empujar páginas a base de pulsar Enter hace que al añadir texto arriba se desplacen todas las páginas siguientes.',
            keywords: ['enter', 'intro', 'espacios', 'líneas en blanco', 'lineas en blanco', 'empujar', 'empuja']
          }
        ],
        modelResponse:
          'Hola, Lucía. La entiendo perfectamente, pelearse con las páginas que se mueven solas es desesperante, pero tiene un arreglo definitivo muy fácil. Eso ocurre cuando se ha bajado de una página a otra pulsando muchas veces la tecla "Enter" (Intro). Para verlo claro, vaya a la pestaña "Inicio" y pulse el icono que parece una P al revés ("¶", botón Mostrar todo). ¿Ve que aparecen un montón de símbolos "¶" seguidos en los huecos en blanco?',
        tacticalOptions: [
          {
            id: '1064-s1-opt1',
            label: 'Empática + Activar icono ¶ Mostrar todo (Recomendada)',
            responseText:
              'Hola, Lucía. La comprendo totalmente, es de las cosas que más rabia dan al maquetar, pero vamos a dejarlo fijo para siempre en dos minutos. Esto pasa porque las páginas se separaron pulsando muchas veces la tecla "Enter". En la pestaña "Inicio", pulse el botón con el símbolo "¶" (Mostrar todo). Verá que salen dibujados todos los saltos de línea invisibles.',
            empathyScore: 96,
            clarityScore: 97,
            technicalScore: 100,
            frustrationDelta: -30,
            coachFeedback:
              'Excelente: normalizas su frustración y le enseñas la herramienta profesional de diagnóstico de maquetación (el símbolo ¶ "Mostrar todo").',
            userReply:
              '¡Huy! Acabo de darle al símbolo "¶" y me han salido treinta símbolos de esos seguidos al final de cada página... Claro, es que yo le daba al Enter hasta pasar a la hoja siguiente. ¿Cómo los cambio para que no se mueva todo?',
            advancesStage: true
          },
          {
            id: '1064-s1-opt2',
            label: 'Burlona por usar Enter para bajar de página',
            responseText:
              'El programa no hace lo que le da la gana, es que usted maqueta dándole 30 veces al Enter como en una máquina de escribir de 1980. Pulse el icono ¶ en Inicio para ver el desastre que ha hecho.',
            empathyScore: 15,
            clarityScore: 70,
            technicalScore: 85,
            frustrationDelta: 20,
            coachFeedback:
              'Humillar al usuario comparándolo con una máquina de escribir de 1980 destruye la empatía de la sesión.',
            userReply:
              '¡Oiga, un respeto que a mí nadie me ha dado un curso de maquetación! Ya le he dado al icono ¶ y veo los símbolos de los Enter. ¿Me dice sin insultarme cómo se separa una página de otra?',
            advancesStage: true
          },
          {
            id: '1064-s1-opt3',
            label: 'Sugerir cambiar el tamaño de letra (Parche inútil)',
            responseText:
              'Cada vez que escriba dos líneas nuevas, ponga la letra un punto más pequeña en el resto del documento para compensar el hueco.',
            empathyScore: 65,
            clarityScore: 60,
            technicalScore: 5,
            frustrationDelta: 15,
            coachFeedback:
              'Mal consejo técnico: encoger la tipografía para compensar líneas en blanco arruina el formato corporativo y no resuelve la ausencia de saltos de página.',
            userReply:
              '¡Pero cómo voy a cambiar el tamaño de letra de cada página cada vez que corrija una frase! ¿No hay una manera de ver qué está empujando el texto y fijar dónde empieza cada capítulo?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Acabo de pulsar el icono "¶" y veo decenas de marcas de párrafo vacías empujando cada hoja! ¿Cómo las sustituyo para que cada capítulo empiece siempre arriba de su página aunque yo añada texto antes?',
        coldSuccessUserReply:
          'Ya veo las marcas "¶" de los Enter vacíos. ¿Qué pongo en su lugar para fijar los principios de página?',
        incompleteUserReply:
          'Todavía no veo qué es lo que empuja las páginas hacia abajo. ¿Qué botón de la pestaña Inicio me permite ver las marcas invisibles de los espacios y saltos de línea?'
      },
      {
        stageNumber: 2,
        title: 'Inserción de Saltos de Página Reales (Ctrl + Enter)',
        objective:
          'Guiar a Lucía para borrar las líneas vacías de "¶" y pulsar Ctrl + Enter (o Insertar > Salto de página) antes de cada nuevo capítulo, y luego desactivar el icono ¶.',
        userPrompt:
          'Tengo seleccionados los 25 símbolos "¶" vacíos que hay entre el final del capítulo 1 y el título del capítulo 2. Si los borro se me sube el título... ¿qué teclas pulso para mandarlo fijo a la página siguiente sin usar Enter?',
        screenStateDescription:
          'Marcas de formato ¶ visibles. Cursores posicionados entre el final del Capítulo 1 y el encabezado del Capítulo 2.',
        hint: 'Indícale que borre esos símbolos "¶" sobrantes, coloque el cursor justo delante del título del capítulo y pulse a la vez "Ctrl + Enter" (o vaya a Insertar > Salto de página).',
        conceptGroups: [
          {
            name: 'Borrar líneas vacías y usar Salto de página (Ctrl + Enter)',
            description: 'Eliminar los párrafos vacíos y pulsar Ctrl + Enter (o Insertar > Salto de página) para anclar el capítulo al inicio de la página siguiente.',
            keywords: ['ctrl + enter', 'control + enter', 'ctrl+enter', 'salto de página', 'salto de pagina', 'insertar', 'borrar']
          }
        ],
        modelResponse:
          '¡Eso es! Borre todos esos símbolos "¶" vacíos con la tecla Suprimir para que el título suba, coloque el cursor justo delante de la primera letra del título del Capítulo 2 y pulse a la vez "Ctrl + Enter" (o en el menú "Insertar > Salto de página"). Verá que aparece una línea punteada que dice "---Salto de página---". A partir de ahora, aunque escriba diez líneas más en el capítulo 1, el capítulo 2 nunca se moverá de su sitio.',
        tacticalOptions: [
          {
            id: '1064-s2-opt1',
            label: 'Borrar ¶ vacíos + Atajo Ctrl + Enter (Recomendada)',
            responseText:
              '¡Lo tiene chupado! Borre esos símbolos "¶" vacíos, ponga el cursor justo delante del título del Capítulo 2 y pulse a la vez "Ctrl + Enter" (también está en el menú "Insertar > Salto de página"). Verá una línea que dice "Salto de página": así el título queda clavado al principio de la hoja siguiente aunque añada más texto arriba. Cuando termine, vuelva a pulsar el icono "¶" para ocultar las marcas.',
            empathyScore: 98,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -35,
            coachFeedback:
              'Didáctica impecable: explicas cómo limpiar los párrafos vacíos, el atajo universal Ctrl + Enter, qué verá en pantalla ("---Salto de página---") y cómo volver a ocultar el símbolo ¶.',
            userReply:
              '¡Hala, qué maravilla! He puesto Ctrl + Enter en los capítulos y acabo de probar a escribir un párrafo entero en la página 2 y ¡NO SE HA DESCUADRADO NADA! Ahora solo me falta lo de la imprenta...',
            advancesStage: true
          },
          {
            id: '1064-s2-opt2',
            label: 'Técnica pero escueta',
            responseText:
              'Borre los calderones vacíos y pulse Ctrl + Enter delante de cada título para meter un salto de página duro.',
            empathyScore: 55,
            clarityScore: 70,
            technicalScore: 90,
            frustrationDelta: -10,
            coachFeedback:
              'La instrucción técnica es correcta, aunque usar el término tipográfico "calderones" sin aclararlo puede confundir a un usuario de ofimática.',
            userReply:
              'Supongo que "calderones" son los símbolos ¶. Ya los he borrado y he puesto Ctrl + Enter, ya no se descuadra. Ahora dígame lo de la imprenta.',
            advancesStage: true
          },
          {
            id: '1064-s2-opt3',
            label: 'Usar Mayús + Enter (Error: Salto de línea manual)',
            responseText:
              'En vez de darle a Enter normal, dele 25 veces a Mayús + Enter para que baje a la otra hoja.',
            empathyScore: 60,
            clarityScore: 60,
            technicalScore: 5,
            frustrationDelta: 15,
            coachFeedback:
              'Error técnico: Mayús + Enter inserta un salto de línea dentro del mismo párrafo, pero sigue desplazándose igual cuando se añade texto arriba. Debe ser Ctrl + Enter (Salto de página).',
            userReply:
              '¡Si le doy 25 veces a Mayús + Enter sigue bajándose todo cuando escribo arriba! ¿Cuál es la combinación para insertar un Salto de página de verdad?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Qué descanso! Con Ctrl + Enter se ha quedado toda la memoria cuadrada al milímetro y ya he ocultado el símbolo ¶. Ahora la última duda: cuando le mando este archivo a la imprenta, me dicen que se les cambia el tipo de letra y se les mueven los márgenes. ¿Cómo se lo envío para que se vea idéntico?',
        coldSuccessUserReply:
          'Ya están puestos los saltos de página con Ctrl + Enter. ¿Cómo hago para que en el ordenador de la imprenta no cambie el tipo de letra ni se mueva nada?',
        incompleteUserReply:
          'Ya he borrado los símbolos ¶ sobrantes, pero ¿qué combinación de teclas o botón del menú Insertar pulso delante del título para crear un salto de página fijo?'
      },
      {
        stageNumber: 3,
        title: 'Exportación a PDF e Incrustación de Fuentes',
        objective:
          'Explicar a Lucía que debe exportar o guardar una copia como archivo PDF (Archivo > Guardar como / Exportar > PDF) para congelar el diseño y las fuentes antes de enviarlo a la imprenta.',
        userPrompt:
          'En la imprenta no tienen instalada la fuente corporativa de nuestra empresa, así que cuando abren mi documento editable les sale otra letra rarísima. ¿En qué formato lo guardo o qué opción marco para que nadie pueda alterar ni una coma ni el tipo de letra?',
        screenStateDescription:
          'Documento de 40 páginas perfectamente maquetado con Saltos de página. Menú "Archivo > Guardar como / Exportar" listo.',
        hint: 'Indícale que vaya a "Archivo > Guardar como" (o "Exportar > Crear documento PDF/XPS") y elija el formato "PDF (*.pdf)", que congela la maquetación y las fuentes para impresión (o incrustar fuentes en Opciones > Guardar si necesitan el editable).',
        conceptGroups: [
          {
            name: 'Exportar / Guardar como PDF',
            description: 'Guardar o exportar el documento en formato PDF para que conserve exactamente las fuentes, márgenes y saltos de página en cualquier equipo.',
            keywords: ['pdf', 'exportar', 'guardar como', 'formato pdf', 'imprimir']
          },
          {
            name: 'Incrustar fuentes / Congelar diseño',
            description: 'Explicar que el PDF (o la opción Incrustar fuentes en el archivo) evita que cambie la tipografía aunque la imprenta no tenga la fuente instalada.',
            keywords: ['fuentes', 'letra', 'tipografía', 'tipografia', 'incrustar', 'idéntico', 'identico', 'mueva']
          }
        ],
        modelResponse:
          'Para enviar a imprenta o a clientes, lo ideal es convertirlo a PDF, porque congela el diseño exacto y las tipografías aunque ellos no tengan la fuente instalada: vaya a "Archivo > Exportar > Crear documento PDF" (o en "Archivo > Guardar como" despliegue el tipo de archivo y elija "PDF"). Y conserve siempre su archivo original editable para usted.',
        tacticalOptions: [
          {
            id: '1064-s3-opt1',
            label: 'Exportar a PDF + Explicación de fuentes (Recomendada)',
            responseText:
              'Para la imprenta, lo mejor es enviarlo en formato PDF, que "fotografía" las páginas e incrusta las letras exactas aunque ellos no tengan nuestra fuente instalada. Vaya a "Archivo > Guardar como" (o "Archivo > Exportar") y elija el tipo "PDF (*.pdf)". Así le queda su documento editable guardado para usted y un PDF inalterable para la imprenta.',
            empathyScore: 98,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -20,
            coachFeedback:
              'Cierre magistral: explicas con una metáfora clara por qué ocurre el problema de las fuentes y le enseñas a generar el PDF conservando su original editable.',
            userReply:
              '¡Ya tengo el PDF creado y se ve impecable! Hoy he aprendido más con usted en 5 minutos que en diez años peleándome con el programa. ¡Muchísimas gracias!',
            advancesStage: true
          },
          {
            id: '1064-s3-opt2',
            label: 'Correcta pero seca',
            responseText:
              'Guárdelo como PDF desde Archivo > Exportar para que no se muevan las fuentes. Cierro el ticket.',
            empathyScore: 45,
            clarityScore: 75,
            technicalScore: 90,
            frustrationDelta: 0,
            coachFeedback:
              'Solución técnica válida pero despachada con frialdad.',
            userReply:
              'Vale, ya lo he exportado a PDF. Gracias.',
            advancesStage: true
          },
          {
            id: '1064-s3-opt3',
            label: 'Hacer capturas de pantalla de las 40 páginas (Incorrecto)',
            responseText:
              'Haga 40 capturas de pantalla de su monitor y péguelas una por una en un correo para la imprenta.',
            empathyScore: 55,
            clarityScore: 50,
            technicalScore: 5,
            frustrationDelta: 20,
            coachFeedback:
              'Las capturas de pantalla tienen baja resolución (72-96 ppp) y no sirven para imprenta profesional; la exportación nativa a PDF vectorial es el estándar de ofimática.',
            userReply:
              '¡¿40 capturas de pantalla para una imprenta profesional?! ¡Saldría todo pixelado! ¿No puedo guardarlo directamente en algún formato de documento cerrado desde el menú Archivo?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Acabo de exportar el PDF y ya se lo he mandado a la imprenta! Me acaban de confirmar que ahora sí ven la letra corporativa perfecta. ¡Mil gracias por su paciencia y por explicármelo tan bien!',
        coldSuccessUserReply:
          'Ya he generado el PDF y se ve bien. Adiós.',
        incompleteUserReply:
          '¿A qué opción del menú Archivo voy exactamente y qué formato de archivo elijo para que el documento quede cerrado y no les cambie el tipo de letra en la imprenta?'
      }
    ]
  },
  {
    id: 'ticket-presentacion-pantalla-negra-audio',
    code: 'INC-1071',
    category: 'presentation',
    categoryLabel: 'Presentaciones y Proyección',
    difficulty: 'Avanzado',
    title: 'Pantalla en negro por error durante ponencia y vídeo sin sonido por HDMI',
    userName: 'Marcos Vidal',
    userRole: 'Formador de Prevención',
    userDepartment: 'Recursos Humanos y Formación',
    initialFrustration: 86,
    initialMoodLabel: 'Sudando frío · Frente a 50 trabajadores en el salón de actos',
    contextSummary:
      'Marcos estaba impartiendo un curso en el salón de actos y al apoyarse en el teclado pulsó sin querer la tecla "N" (o "."), que activa la pausa de pantalla en negro de las presentaciones. Además, en la siguiente diapositiva tiene un vídeo formativo que se reproduce pero no suena por los altavoces del salón (conectados por HDMI).',
    technicalSkillsTested: [
      'Teclas N / B / Punto (.) que ponen la diapositiva en negro o blanco durante la presentación',
      'Cambio del dispositivo de salida de audio en la barra de tareas hacia HDMI / Proyector',
      'Incrustar vídeo multimedia dentro del archivo de presentación en vez de vínculo externo'
    ],
    softSkillsTested: [
      'Calma instantánea cuando el usuario cree que el equipo se ha apagado en directo',
      'Instrucciones ultracortas de ejecución inmediata',
      'Prevención para futuras formaciones'
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Salir del Modo Pantalla en Negro (Tecla N o Cualquier Tecla)',
        objective:
          'Tranquilizar a Marcos al instante explicándole que el ordenador NO se ha apagado: solo ha rozado la tecla "N" (o ".") de pausa en negro del modo presentación, y que basta con pulsarla de nuevo o pulsar la barra espaciadora.',
        userPrompt:
          '¡¡Socorro, que estoy en mitad del curso con 50 personas en el salón de actos!! ¡Me he apoyado sin querer en el teclado del portátil y de golpe el proyector y mi pantalla se han puesto TOTALMENTE NEGROS! ¡El ordenador sigue encendido pero está todo negro, se ha muerto la tarjeta gráfica!',
        screenStateDescription:
          'Presentación activa a pantalla completa en estado de pausa de orador (Pantalla en negro activada al pulsar la tecla "N" o ".").',
        hint: '¡Tranquilízale al instante! No se ha roto la gráfica: en el modo presentación, rozar la tecla "N" (o "B" / el punto ".") pone la pantalla en negro para pausar la charla. Solo tiene que volver a pulsar "N" (o la barra espaciadora / cualquier tecla) y vuelve la diapositiva.',
        conceptGroups: [
          {
            name: 'Función de pausa en negro (Tecla N / B / Punto)',
            description: 'Explicar que en las presentaciones, tocar la tecla N (o B / punto) pone la pantalla en negro a propósito como pausa del ponente.',
            keywords: ['tecla n', 'letra n', 'punto', 'pausa', 'negro', 'no se ha roto', 'función', 'funcion', 'normal']
          },
          {
            name: 'Pulsar N o cualquier tecla para recuperar la imagen',
            description: 'Indicar que pulse de nuevo la tecla N, la barra espaciadora o cualquier tecla para que reaparezca la diapositiva.',
            keywords: ['barra espaciadora', 'cualquier tecla', 'volver a pulsar', 'pulse n', 'espacio', 'flecha']
          }
        ],
        modelResponse:
          '¡Tranquilo, Marcos, no se ha roto nada! Al apoyarse en el teclado ha rozado la tecla "N" (o el punto), que es una función del programa de presentaciones para oscurecer la pantalla cuando el profesor quiere que los alumnos le miren a él. Pulse ahora mismo la tecla "N" otra vez o la barra espaciadora y volverá su diapositiva al instante.',
        tacticalOptions: [
          {
            id: '1071-s1-opt1',
            label: 'Calma instantánea + Explicación de tecla N (Recomendada)',
            responseText:
              '¡Tranquilo, Marcos, su ordenador está perfecto! Al apoyarse en el teclado ha rozado la tecla "N" (o el punto "."), que sirve en las presentaciones para poner la pantalla en negro durante una explicación. Pulse otra vez la tecla "N" o la barra espaciadora ahora mismo y volverá la diapositiva al instante.',
            empathyScore: 98,
            clarityScore: 99,
            technicalScore: 100,
            frustrationDelta: -40,
            coachFeedback:
              'Respuesta perfecta de Nivel 1: desactivas el pánico en 5 segundos, explicas el porqué técnico de la función de orador y le das la acción de un solo toque.',
            userReply:
              '¡Ay madre, acabo de darle a la tecla N y ha vuelto la diapositiva de golpe! ¡Qué susto me he llevado delante de los 50 alumnos! Ahora viene la siguiente diapositiva que tiene un vídeo y antes en la prueba no sonaba por los altavoces de la sala...',
            advancesStage: true
          },
          {
            id: '1071-s1-opt2',
            label: 'Tono burlón',
            responseText:
              'No sea dramático con la tarjeta gráfica, simplemente ha apoyado el codo en la tecla N que oscurece la presentación. Dele a la N o al espacio otra vez.',
            empathyScore: 25,
            clarityScore: 80,
            technicalScore: 90,
            frustrationDelta: 10,
            coachFeedback:
              'Llamar "dramático" a un docente que está en directo ante 50 personas es poco profesional, aunque el dato de la tecla N sea exacto.',
            userReply:
              'Vale, ya ha vuelto la imagen al darle a la N, pero póngase usted delante de 50 personas cuando se apaga todo de golpe. Ahora dígame por qué no suena el vídeo.',
            advancesStage: true
          },
          {
            id: '1071-s1-opt3',
            label: 'Forzar apagado del portátil con el botón de encendido (Desastroso)',
            responseText:
              'Si la pantalla está toda negra es un cuelgue de vídeo. Mantenga pulsado el botón de encendido 10 segundos hasta que se apague el portátil del todo.',
            empathyScore: 55,
            clarityScore: 60,
            technicalScore: 0,
            frustrationDelta: 30,
            coachFeedback:
              'Error crítico: hacerle apagar el portátil en mitad de una ponencia cuando solo estaba activa la cortinilla negra (tecla N) de PowerPoint/Impress.',
            userReply:
              '¡Espere, antes de apagarlo he rozado el teclado y ha vuelto la diapositiva sola! ¡Si llego a apagar el ordenador delante de todos me muero! ¿Por qué se puso negra con el teclado?',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Ha vuelto la imagen al instante al pulsar la tecla N! Menudo alivio, hasta he quedado bien diciendo que era una pausa para hacerles una pregunta. Ahora paso a la diapositiva del vídeo de seguridad: el vídeo se mueve en el proyector, ¡pero se oye flojísimo por mi portátil en vez de por la megafonía HDMI de la sala!',
        coldSuccessUserReply:
          'Ya ha vuelto la diapositiva con la tecla N. En la siguiente tengo un vídeo y el sonido sale bajito por el portátil en lugar de por los altavoces HDMI del salón. ¿Dónde lo cambio?',
        incompleteUserReply:
          'La pantalla sigue negra con la presentación abierta. ¿Qué tecla he rozado sin querer que oscurece la presentación y cuál toco para que vuelva la diapositiva?'
      },
      {
        stageNumber: 2,
        title: 'Selección de Salida de Audio HDMI en la Barra de Tareas',
        objective:
          'Guiar a Marcos para que haga clic en el icono del altavoz de la esquina inferior derecha de la barra de tareas de Windows y cambie el dispositivo de salida de "Altavoces del portátil" a "HDMI / Proyector / Salón de Actos".',
        userPrompt:
          'El vídeo ya está pausado en pantalla. Cuando le doy al Play, se oye por los altavocillos pequeños de mi portátil y los de la fila de atrás no oyen nada, a pesar de que el cable HDMI lleva audio a los altavoces grandes del salón. ¿Cómo paso el sonido al HDMI sin cerrar todo?',
        screenStateDescription:
          'Diapositiva con vídeo pausado. En la bandeja del sistema (abajo a la derecha) el icono de volumen apunta a "Altavoces (Realtek Audio)" en lugar de "EPSON PJ / HDMI Audio".',
        hint: 'Indícale que pulse la tecla Windows (o mire en la esquina inferior derecha junto al reloj), haga clic en el icono del altavoz/sonido, abra el selector de dispositivos de salida (junto a la barra de volumen) y elija el dispositivo HDMI / Proyector.',
        conceptGroups: [
          {
            name: 'Icono de volumen / altavoz en la barra de tareas',
            description: 'Hacer clic en el icono del altavoz en la esquina inferior derecha de la barra de tareas (junto al reloj).',
            keywords: ['altavoz', 'volumen', 'sonido', 'abajo a la derecha', 'reloj', 'barra de tareas', 'icono']
          },
          {
            name: 'Seleccionar salida de audio HDMI / Proyector',
            description: 'Cambiar el dispositivo de reproducción/salida de los altavoces internos al dispositivo HDMI o Proyector.',
            keywords: ['hdmi', 'salida', 'dispositivo', 'proyector', 'cambiar', 'seleccionar', 'reproducción']
          }
        ],
        modelResponse:
          'Es rapidísimo: pulse la tecla "Windows" en su teclado para que asome la barra inferior en su portátil, haga clic abajo a la derecha en el icono del "Altavoz" (junto al reloj), pulse el botón de selección de salida de audio (la flechita al lado del control de volumen) y cambie "Altavoces del portátil" por el que ponga "HDMI / Proyector".',
        tacticalOptions: [
          {
            id: '1071-s2-opt1',
            label: 'Selector de salida de audio a HDMI en barra de tareas (Recomendada)',
            responseText:
              'Lo cambiamos en dos clics: mire en la esquina inferior derecha de su portátil (junto al reloj) y haga clic en el icono del "Altavoz". Justo al lado de la barra de volumen, pulse el selector de salida de audio y elija el dispositivo "HDMI / Proyector" en lugar de los altavoces internos del portátil.',
            empathyScore: 96,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -35,
            coachFeedback:
              'Guía concisa y exacta: diriges al usuario al selector de salida de audio de la bandeja del sistema para conmutar de Realtek interno a HDMI.',
            userReply:
              '¡Hecho! Le he dado al icono del altavoz abajo a la derecha, he elegido "HDMI Proyector" y ahora suena por toda la megafonía del salón de actos con una potencia brutal.',
            advancesStage: true
          },
          {
            id: '1071-s2-opt2',
            label: 'Seca pero funcional',
            responseText:
              'Pinche en el altavoz al lado del reloj abajo a la derecha y cambie la salida de audio a HDMI.',
            empathyScore: 55,
            clarityScore: 80,
            technicalScore: 90,
            frustrationDelta: -10,
            coachFeedback:
              'Técnicamente correcta, aunque muy escueta.',
            userReply:
              'Vale, ya lo he cambiado al HDMI desde el icono del altavoz y ya suena en la sala.',
            advancesStage: true
          },
          {
            id: '1071-s2-opt3',
            label: 'Acercar el micrófono a los altavoces del portátil (Chapuza)',
            responseText:
              'El cable HDMI solo lleva imagen, nunca lleva sonido. Ponga el micrófono de mano pegado a la rejilla del portátil para que se oiga.',
            empathyScore: 50,
            clarityScore: 60,
            technicalScore: 0,
            frustrationDelta: 20,
            coachFeedback:
              'Error técnico grave: el estándar HDMI transmite tanto vídeo digital como audio multicanal; solo hacía falta seleccionar la salida de audio HDMI en el sistema operativo.',
            userReply:
              '¡¿Cómo que el HDMI no lleva sonido si mi compañero puso un vídeo ayer con este mismo cable y sin micrófono?! ¡Seguro que se cambia en algún icono de sonido del ordenador!',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Suena de cine por los altavoces del salón! Mientras los alumnos ven este vídeo de 2 minutos, le hago una consulta rápida: en el curso de la semana pasada traje la presentación en un pendrive y el vídeo ponía "No se encuentra el archivo multimedia". ¿Cómo meto los vídeos dentro de la presentación para que no dependan de otra carpeta?',
        coldSuccessUserReply:
          'Ya suena por el HDMI. Una duda rápida: ¿cómo meto un vídeo dentro del archivo de la presentación para que no dé error al llevarlo en un pendrive?',
        incompleteUserReply:
          'El sonido sigue saliendo por los altavoces pequeños de mi portátil. ¿En qué icono de la barra inferior entro para elegir que el audio salga por el cable HDMI?'
      },
      {
        stageNumber: 3,
        title: 'Incrustar Vídeo frente a Vincular Archivo Externo',
        objective:
          'Explicar a Marcos la diferencia entre "Incrustar vídeo" (Insertar > Vídeo > Este dispositivo, que guarda el vídeo dentro del archivo .pptx) y "Vincular al archivo", recomendando también guardar una copia del vídeo en la misma carpeta del pendrive.',
        userPrompt:
          'Explíqueme rápido antes de que acabe el vídeo: ¿por qué el otro día me dio error al traer solo el archivo de la presentación en el USB y qué opción elijo al insertar un vídeo para que viaje siempre DENTRO de la presentación?',
        screenStateDescription:
          'Vídeo reproduciéndose correctamente por HDMI en el salón de actos. Menú conceptual: "Insertar > Multimedia > Vídeo > Insertar (Incrustar) vs Vincular al archivo".',
        hint: 'Explícale que al ir a "Insertar > Vídeo > Este dispositivo", debe pulsar el botón "Insertar" (que incrusta el vídeo dentro del archivo .pptx) en lugar de "Vincular al archivo" (que solo guarda una ruta a su disco duro), y aconseja llevar también el MP4 en la misma carpeta del pendrive por seguridad.',
        conceptGroups: [
          {
            name: 'Incrustar vídeo (Insertar > Vídeo) frente a Vincular',
            description: 'Explicar que hay que elegir "Insertar / Incrustar" en vez de "Vincular al archivo" para que el vídeo quede guardado dentro del archivo de la presentación.',
            keywords: ['incrustar', 'insertar', 'vincular', 'dentro', 'archivo', 'multimedia', 'vídeo', 'video']
          },
          {
            name: 'Respaldo del archivo MP4 en la misma carpeta / Comprimir medios',
            description: 'Recomendar llevar una copia del vídeo MP4 en la misma carpeta del pendrive o usar "Archivo > Información > Comprimir medios".',
            keywords: ['carpeta', 'pendrive', 'usb', 'copia', 'mp4', 'comprimir']
          }
        ],
        modelResponse:
          'Eso le pasó porque el vídeo estaba "vinculado" (el programa buscaba el vídeo en la carpeta C: de su ordenador de la oficina y no estaba en el pendrive). Para que no vuelva a pasar: cuando vaya a "Insertar > Vídeo > Este dispositivo", pulse el botón "Insertar" normal (no la flechita de "Vincular al archivo"), así el vídeo queda incrustado dentro de la propia presentación. Y como red de seguridad, guarde siempre el archivo MP4 original en la misma carpeta del USB junto a la presentación.',
        tacticalOptions: [
          {
            id: '1071-s3-opt1',
            label: 'Incrustar vídeo + Copia MP4 en carpeta del USB (Recomendada)',
            responseText:
              'Le ocurrió porque el vídeo estaba "vinculado" a una carpeta de su otro ordenador en vez de incrustado. Cuando añada un vídeo desde "Insertar > Vídeo > Este dispositivo", pulse directamente "Insertar" (nunca "Vincular al archivo"); así el vídeo viaja dentro de la propia presentación. Además, como seguro de vida para un formador, copie siempre el archivo MP4 en la misma carpeta del pendrive junto a la presentación.',
            empathyScore: 98,
            clarityScore: 98,
            technicalScore: 100,
            frustrationDelta: -25,
            coachFeedback:
              'Explicación didáctica de manual: aclaras la diferencia entre incrustar y vincular objetos multimedia y aportas la buena práctica de respaldo en la misma carpeta.',
            userReply:
              '¡Clarísimo! Ahora entiendo por qué pesaba tan poquito aquel archivo y por qué falló: le había dado a Vincular. Ya está terminando el vídeo y los alumnos aplauden. ¡Muchísimas gracias por salvarme la clase!',
            advancesStage: true
          },
          {
            id: '1071-s3-opt2',
            label: 'Correcta pero escueta',
            responseText:
              'Al meter el vídeo en Insertar > Vídeo elija Insertar en vez de Vincular para que se incruste, y lleve el MP4 en el USB por si acaso.',
            empathyScore: 60,
            clarityScore: 80,
            technicalScore: 90,
            frustrationDelta: -5,
            coachFeedback:
              'Técnicamente acertada, aunque más telegráfica.',
            userReply:
              'Perfecto, me quedo con lo de incrustar en vez de vincular y llevar el MP4. Gracias.',
            advancesStage: true
          },
          {
            id: '1071-s3-opt3',
            label: 'Decir que los vídeos nunca se pueden guardar en presentaciones',
            responseText:
              'En las presentaciones nunca se pueden meter vídeos dentro, solo fotografías fijas.',
            empathyScore: 50,
            clarityScore: 55,
            technicalScore: 5,
            frustrationDelta: 15,
            coachFeedback:
              'Información falsa: desde las versiones modernas (.pptx / .odp), los vídeos se pueden incrustar directamente dentro del contenedor del documento.',
            userReply:
              '¡Pero si ahora mismo estoy reproduciendo un vídeo incrustado en esta diapositiva! Lo que quiero saber es qué diferencia hay entre insertar normal y vincular cuando lo meto desde mi equipo.',
            advancesStage: false
          }
        ],
        successUserReply:
          '¡Ahora lo entiendo todo! Diferencia entre incrustar y vincular aprendida para siempre, más el respaldo del MP4 en el USB. ¡Mil gracias por su ayuda en directo!',
        coldSuccessUserReply:
          'Entendido lo de incrustar frente a vincular. Gracias, sigo dando la clase.',
        incompleteUserReply:
          'Cuando voy a Insertar > Vídeo, ¿qué diferencia hay entre incrustarlo y vincularlo, y qué me recomienda llevar en el pendrive por seguridad?'
      }
    ]
  }
];
