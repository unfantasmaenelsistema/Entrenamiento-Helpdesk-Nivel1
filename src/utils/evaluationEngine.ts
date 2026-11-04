import { ScenarioStage, TacticalOption, TurnEvaluation } from '../types/helpdesk';

/**
 * Motor de corrección de la redacción libre.
 *
 * Es un corrector por conceptos: busca expresiones concretas (palabras o frases
 * completas, nunca trozos de palabra) y no entiende el significado de la frase.
 * Por eso cada fase pide conceptos específicos ("CCO", "Ctrl + Enter",
 * "Mostrar todo"…) y no palabras comunes como "para" o "pestaña".
 */

const EMPATHY_POSITIVE_PATTERNS = [
  'entiendo',
  'comprendo',
  'tranquila',
  'tranquilo',
  'no se preocupe',
  'no te preocupes',
  'vamos a',
  'le ayudo',
  'te ayudo',
  'juntos',
  'paso a paso',
  'buenos días',
  'buenas tardes',
  'hola',
  'por favor',
  'gracias',
  'es normal',
  'enseguida',
  'lo solucionamos',
  'resolverlo',
  'no está perdido',
  'no se ha roto',
  'qué bien',
  'perfecto',
  'menos mal',
  'exacto',
  'eso es',
  'qué alegría',
  'me alegro',
  'buena pregunta',
  'buena noticia',
  'mucha suerte',
  'le dejo',
  'le va a resultar',
  'es muy sencillo',
  'es rapidísimo',
  'le confirmo',
  'respire',
  'con mucho gusto',
  'claro que sí',
  'estupendo',
  'genial',
  'fantástico',
  'fantástica',
];

const EMPATHY_NEGATIVE_PATTERNS = [
  'culpa suya',
  'su culpa',
  'tu culpa',
  'no grite',
  'cálmese',
  'cálmate',
  'es obvio',
  'es muy fácil',
  'es básico',
  'usted no sabe',
  'no sabe usar',
  'torpe',
  'inútil',
  'deje de quejarse',
  'no es mi problema',
  'reinicie y punto',
  'búsquelo usted',
  'primero de informática',
  'máquina de escribir',
  'dramático',
  'dramática',
  'debería haber',
  'tendría que haber',
];

const CLARITY_CONNECTORS = [
  'primero',
  'segundo',
  'después',
  'luego',
  'por último',
  'haga clic',
  'haz clic',
  'pulse',
  'pulsa',
  'seleccione',
  'vaya a',
  'menú',
  'pestaña',
  'botón',
  'arriba',
  'abajo',
  'a la izquierda',
  'a la derecha',
  'para que',
];

/** Minúsculas, sin tildes y con los atajos normalizados ("Ctrl+G" = "ctrl + g"). */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s+/g, ' ');
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** ¿Aparece la expresión como palabra o frase completa? ("mb" no coincide dentro de "también"). */
export function containsTerm(normalizedText: string, term: string): boolean {
  const t = normalizeText(term).trim();
  if (!t) return false;
  const re = new RegExp(`(?:^|[^a-z0-9ñ])${escapeRegExp(t)}(?=$|[^a-z0-9ñ])`);
  return re.test(normalizedText);
}

function countTerms(normalizedText: string, terms: string[]): number {
  return terms.reduce((n, term) => n + (containsTerm(normalizedText, term) ? 1 : 0), 0);
}

/** Proporción de secuencias de 3 palabras del texto del alumno que aparecen tal cual en el de referencia. */
export function sharedTrigramRatio(studentText: string, referenceText: string): number {
  const trigrams = (s: string) => {
    const w = normalizeText(s).match(/[a-z0-9]+/g) ?? [];
    const out: string[] = [];
    for (let i = 0; i + 2 < w.length; i++) out.push(`${w[i]} ${w[i + 1]} ${w[i + 2]}`);
    return out;
  };
  const own = trigrams(studentText);
  if (own.length < 4) return 0;
  const ref = new Set(trigrams(referenceText));
  return own.filter((t) => ref.has(t)).length / own.length;
}

/**
 * Una respuesta es "con ayuda" si la mitad o más de sus secuencias de 3 palabras
 * salen de la respuesta modelo o de una opción táctica (copiada o retocada).
 */
export function isAssistedText(studentText: string, stage: ScenarioStage): boolean {
  const refs = [stage.modelResponse, ...stage.tacticalOptions.map((o) => o.responseText)];
  return refs.some((r) => sharedTrigramRatio(studentText, r) >= 0.5);
}

/** Umbral único de empatía: por encima, el usuario se calma y responde agradecido. */
export const EMPATHY_THRESHOLD = 70;

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

  // 1. Conceptos técnicos de la fase
  const matchedConcepts: string[] = [];
  const missedConcepts: string[] = [];
  for (const group of stage.conceptGroups) {
    if (group.keywords.some((kw) => containsTerm(normalized, kw))) {
      matchedConcepts.push(group.name);
    } else {
      missedConcepts.push(group.name);
    }
  }

  const totalConcepts = stage.conceptGroups.length;
  const conceptRatio = totalConcepts > 0 ? matchedConcepts.length / totalConcepts : 1;
  const advancesStage = conceptRatio >= 0.5;

  let technicalScore: number;
  if (conceptRatio === 1) {
    technicalScore = trimmed.length >= 50 ? 98 : 90;
  } else if (conceptRatio >= 0.5) {
    technicalScore = 68;
  } else {
    technicalScore = trimmed.length > 25 ? 25 : 10;
  }

  // 2. Empatía y paciencia
  const empathyHits = countTerms(normalized, EMPATHY_POSITIVE_PATTERNS);
  const negativeHits = countTerms(normalized, EMPATHY_NEGATIVE_PATTERNS);

  const upperChars = trimmed.replace(/[^A-ZÁÉÍÓÚÑ]/g, '').length;
  const alphaChars = trimmed.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ]/g, '').length;
  const isShouting = alphaChars > 15 && upperChars / alphaChars > 0.65;

  let empathyScore = 62 + Math.min(empathyHits * 12, 36) - negativeHits * 32 - (isShouting ? 25 : 0);
  if (trimmed.length < 20) empathyScore = Math.min(empathyScore, 40);
  empathyScore = Math.max(10, Math.min(100, empathyScore));

  // 3. Claridad pedagógica
  const clarityHits = countTerms(normalized, CLARITY_CONNECTORS) + (/(^|\s)[1-9][.)]\s/.test(trimmed) ? 1 : 0);
  let clarityScore = 55 + Math.min(clarityHits * 10, 38);
  if (trimmed.length >= 60 && trimmed.length <= 480) {
    clarityScore += 6;
  } else if (trimmed.length < 25) {
    clarityScore = 30;
  }
  if (negativeHits > 0 || isShouting) clarityScore = Math.max(25, clarityScore - 20);
  clarityScore = Math.max(15, Math.min(100, clarityScore));

  // 4. Reacción del usuario (un único umbral para la frustración y la respuesta)
  const warm = empathyScore >= EMPATHY_THRESHOLD;
  let frustrationDelta: number;
  if (advancesStage && warm) frustrationDelta = -32;
  else if (advancesStage) frustrationDelta = negativeHits > 0 ? 12 : -10;
  else if (warm) frustrationDelta = -5;
  else frustrationDelta = 15;

  const frustrationAfter = Math.max(5, Math.min(100, currentFrustration + frustrationDelta));

  let feedbackSummary: string;
  let userReply: string;
  if (advancesStage && warm) {
    feedbackSummary = `¡Buena intervención! Has calmado al usuario (${empathyScore} % de empatía) y has cubierto: ${matchedConcepts.join(', ')}.`;
    userReply = stage.successUserReply;
  } else if (advancesStage) {
    feedbackSummary = `La indicación técnica resuelve el paso (${matchedConcepts.join(', ')}), pero el tono resulta frío o brusco (${empathyScore} % de empatía). Valida la emoción del usuario antes de darle instrucciones.`;
    userReply = stage.coldSuccessUserReply;
  } else {
    feedbackSummary = `Aún falta concretar la solución técnica para avanzar de fase. Menciona claramente: ${missedConcepts.join(' y ')}. Pista: ${stage.hint}`;
    userReply = stage.incompleteUserReply;
  }

  const assisted = isAssistedText(trimmed, stage);
  if (assisted) {
    feedbackSummary += ' (Respuesta basada en la plantilla: cuenta como intervención con ayuda.)';
  }

  return {
    evaluation: {
      stageNumber: stage.stageNumber,
      stageTitle: stage.title,
      studentMessage: trimmed,
      modeUsed: 'free',
      assisted,
      advanced: advancesStage,
      empathyScore,
      clarityScore,
      technicalScore,
      frustrationBefore: currentFrustration,
      frustrationAfter,
      matchedConcepts,
      missedConcepts,
      feedbackSummary,
      modelResponse: stage.modelResponse,
    },
    userReply,
    advancesStage,
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

  return {
    evaluation: {
      stageNumber: stage.stageNumber,
      stageTitle: stage.title,
      studentMessage: option.responseText,
      modeUsed: 'tactical',
      assisted: true,
      advanced: option.advancesStage,
      empathyScore: option.empathyScore,
      clarityScore: option.clarityScore,
      technicalScore: option.technicalScore,
      frustrationBefore: currentFrustration,
      frustrationAfter,
      matchedConcepts: option.advancesStage ? allConceptNames : [],
      missedConcepts: option.advancesStage ? [] : allConceptNames,
      feedbackSummary: option.coachFeedback,
      modelResponse: stage.modelResponse,
    },
    userReply: option.userReply,
    advancesStage: option.advancesStage,
  };
}

/** Nota del ticket: media de TODAS las intervenciones, también las que no hicieron avanzar. */
export function summarizeTurns(turns: TurnEvaluation[]) {
  const avg = (f: (t: TurnEvaluation) => number) =>
    turns.length ? Math.round(turns.reduce((acc, t) => acc + f(t), 0) / turns.length) : 0;
  const empathyAvg = avg((t) => t.empathyScore);
  const technicalAvg = avg((t) => t.technicalScore);
  const clarityAvg = avg((t) => t.clarityScore);
  return {
    empathyAvg,
    technicalAvg,
    clarityAvg,
    overallScore: Math.round(empathyAvg * 0.4 + technicalAvg * 0.4 + clarityAvg * 0.2),
    attempts: turns.length,
    failedAttempts: turns.filter((t) => !t.advanced).length,
    assistedTurns: turns.filter((t) => t.assisted).length,
  };
}

export function getGradeLabel(score: number): string {
  if (score >= 90) return 'Sobresaliente · Técnico Senior Nivel 1';
  if (score >= 78) return 'Notable · Soporte Resolutivo y Empático';
  if (score >= 65) return 'Aprobado · Apto con Margen de Mejora';
  return 'En Entrenamiento · Requiere Reforzar Protocolo';
}
