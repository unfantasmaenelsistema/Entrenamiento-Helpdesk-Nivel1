import { ScenarioStage, TacticalOption, TurnEvaluation } from '../types/helpdesk';

const EMPATHY_POSITIVE_PATTERNS = [
  'entiendo',
  'comprendo',
  'tranquil',
  'no se preocupe',
  'no te preocupes',
  'vamos a',
  'le ayudo',
  'te ayudo',
  'juntos',
  'paso a paso',
  'buenos días',
  'buenos dias',
  'buenas tardes',
  'hola',
  'por favor',
  'gracias',
  'normal',
  'enseguida',
  'rápido',
  'rapido',
  'solucionamos',
  'resolverlo',
  'no está perdido',
  'no se ha roto',
  'qué bien',
  'que bien',
  'perfecto',
  'alivio'
];

const EMPATHY_NEGATIVE_PATTERNS = [
  'culpa suya',
  'tu culpa',
  'no grite',
  'cálmese',
  'calmese',
  'es obvio',
  'es muy fácil',
  'es basico',
  'es básico',
  'no sabe',
  'torpe',
  'inútil',
  'deje de quejarse',
  'no es mi problema',
  'reinicie y punto',
  'búsquelo usted',
  'primero de informática',
  'máquina de escribir',
  'dramático',
  'dramatica'
];

const CLARITY_CONNECTORS = [
  'primero',
  'segundo',
  '1)',
  '2)',
  '1.',
  '2.',
  'haga clic',
  'haz clic',
  'pulse',
  'pulsa',
  'seleccione',
  'vaya a',
  'menú',
  'menu',
  'pestaña',
  'botón',
  'boton',
  'arriba',
  'abajo',
  'izquierda',
  'derecha',
  'después',
  'luego',
  'para que'
];

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function evaluateFreeTextResponse(
  studentText: string,
  stage: ScenarioStage,
  currentFrustration: number
): {
  evaluation: TurnEvaluation;
  userReply: string;
  advancesStage: boolean;
} {
  const trimmed = studentText.trim();
  const normalized = normalizeText(trimmed);
  const rawLower = trimmed.toLowerCase();

  // 1. Evaluate Technical Concepts
  const matchedConcepts: string[] = [];
  const missedConcepts: string[] = [];

  for (const group of stage.conceptGroups) {
    const isMatched = group.keywords.some((kw) => {
      const normKw = normalizeText(kw);
      return normalized.includes(normKw) || rawLower.includes(kw.toLowerCase());
    });
    if (isMatched) {
      matchedConcepts.push(group.name);
    } else {
      missedConcepts.push(group.name);
    }
  }

  const totalConcepts = stage.conceptGroups.length;
  const conceptRatio = totalConcepts > 0 ? matchedConcepts.length / totalConcepts : 1;

  let technicalScore = Math.round(conceptRatio * 90);
  if (conceptRatio === 1 && trimmed.length >= 50) {
    technicalScore = 98;
  } else if (conceptRatio >= 0.5) {
    technicalScore = Math.max(technicalScore, 68);
  } else if (trimmed.length > 25) {
    technicalScore = 25;
  } else {
    technicalScore = 10;
  }

  // 2. Evaluate Empathy & Patience
  let empathyHits = 0;
  for (const pattern of EMPATHY_POSITIVE_PATTERNS) {
    if (normalized.includes(normalizeText(pattern))) {
      empathyHits += 1;
    }
  }

  let negativeHits = 0;
  for (const pattern of EMPATHY_NEGATIVE_PATTERNS) {
    if (normalized.includes(normalizeText(pattern))) {
      negativeHits += 1;
    }
  }

  // Check if shouting in ALL CAPS
  const upperChars = trimmed.replace(/[^A-ZÁÉÍÓÚÑ]/g, '').length;
  const alphaChars = trimmed.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ]/g, '').length;
  const isShouting = alphaChars > 15 && upperChars / alphaChars > 0.65;

  let empathyScore = 62 + Math.min(empathyHits * 12, 36) - negativeHits * 32 - (isShouting ? 25 : 0);
  if (trimmed.length < 20) {
    empathyScore = Math.min(empathyScore, 40);
  }
  empathyScore = Math.max(10, Math.min(100, empathyScore));

  // 3. Evaluate Pedagogical Clarity
  let clarityHits = 0;
  for (const conn of CLARITY_CONNECTORS) {
    if (normalized.includes(normalizeText(conn))) {
      clarityHits += 1;
    }
  }

  let clarityScore = 55 + Math.min(clarityHits * 10, 38);
  if (trimmed.length >= 60 && trimmed.length <= 480) {
    clarityScore += 6;
  } else if (trimmed.length < 25) {
    clarityScore = 30;
  }
  if (negativeHits > 0 || isShouting) {
    clarityScore = Math.max(25, clarityScore - 20);
  }
  clarityScore = Math.max(15, Math.min(100, clarityScore));

  // 4. Calculate Frustration Delta & Stage Advancement
  const advancesStage = conceptRatio >= 0.5;
  let frustrationDelta = 0;

  if (advancesStage && empathyScore >= 70) {
    frustrationDelta = -32;
  } else if (advancesStage && empathyScore < 70) {
    frustrationDelta = negativeHits > 0 ? 12 : -10;
  } else if (!advancesStage && empathyScore >= 75) {
    frustrationDelta = -5;
  } else {
    frustrationDelta = 15;
  }

  const frustrationAfter = Math.max(5, Math.min(100, currentFrustration + frustrationDelta));

  // 5. Generate Constructive Coach Feedback & User Reply
  let feedbackSummary = '';
  let userReply = '';

  if (advancesStage && empathyScore >= 75) {
    feedbackSummary = `¡Excelente intervención! Has calmado al usuario con empatía (${empathyScore}%) y has explicado con precisión los puntos clave: ${matchedConcepts.join(', ')}.`;
    userReply = stage.successUserReply;
  } else if (advancesStage && empathyScore < 75) {
    feedbackSummary = `La indicación técnica ha resuelto el paso (${matchedConcepts.join(', ')}), pero el tono resultó frío o brusco (${empathyScore}% en empatía). Recuerda validar la emoción del usuario antes de dar órdenes.`;
    userReply = stage.coldSuccessUserReply;
  } else {
    const missingList = missedConcepts.join(' y ');
    feedbackSummary = `Aún falta concretar la solución técnica para avanzar de fase. Asegúrate de mencionar claramente: ${missingList}. Pista: ${stage.hint}`;
    userReply = stage.incompleteUserReply;
  }

  return {
    evaluation: {
      stageNumber: stage.stageNumber,
      stageTitle: stage.title,
      studentMessage: trimmed,
      modeUsed: 'free',
      empathyScore,
      clarityScore,
      technicalScore,
      frustrationBefore: currentFrustration,
      frustrationAfter,
      matchedConcepts,
      missedConcepts,
      feedbackSummary,
      modelResponse: stage.modelResponse
    },
    userReply,
    advancesStage
  };
}

export function evaluateTacticalOption(
  option: TacticalOption,
  stage: ScenarioStage,
  currentFrustration: number
): {
  evaluation: TurnEvaluation;
  userReply: string;
  advancesStage: boolean;
} {
  const frustrationAfter = Math.max(5, Math.min(100, currentFrustration + option.frustrationDelta));
  const allConceptNames = stage.conceptGroups.map((c) => c.name);

  const matchedConcepts = option.advancesStage ? allConceptNames : [];
  const missedConcepts = option.advancesStage ? [] : allConceptNames;

  return {
    evaluation: {
      stageNumber: stage.stageNumber,
      stageTitle: stage.title,
      studentMessage: option.responseText,
      modeUsed: 'tactical',
      empathyScore: option.empathyScore,
      clarityScore: option.clarityScore,
      technicalScore: option.technicalScore,
      frustrationBefore: currentFrustration,
      frustrationAfter,
      matchedConcepts,
      missedConcepts,
      feedbackSummary: option.coachFeedback,
      modelResponse: stage.modelResponse
    },
    userReply: option.userReply,
    advancesStage: option.advancesStage
  };
}

export function getGradeLabel(score: number): string {
  if (score >= 90) return 'Sobresaliente · Técnico Senior Nivel 1';
  if (score >= 78) return 'Notable · Soporte Resolutivo y Empático';
  if (score >= 65) return 'Aprobado · Apto con Margen de Mejora';
  return 'En Entrenamiento · Requiere Reforzar Protocolo';
}
