import { describe, expect, it } from 'vitest';
import { SCENARIO_TICKETS } from '../data/scenarios';
import { KNOWLEDGE_GUIDES } from '../data/knowledgeBase';
import {
  EMPATHY_THRESHOLD,
  containsTerm,
  evaluateFreeTextResponse,
  evaluateTacticalOption,
  isAssistedText,
  normalizeText,
  summarizeTurns,
} from './evaluationEngine';

const allStages = SCENARIO_TICKETS.flatMap((t) => t.stages.map((s) => ({ ticket: t, stage: s })));

describe('coincidencia de conceptos', () => {
  it('busca palabras completas, no trozos de palabra', () => {
    const t = normalizeText('También le paso el nombre del archivo');
    expect(containsTerm(t, 'mb')).toBe(false);
    expect(containsTerm(t, 'ver')).toBe(false);
    expect(containsTerm(normalizeText('Pesa 45 MB'), '45 mb')).toBe(true);
  });

  it('normaliza tildes, mayúsculas y atajos de teclado', () => {
    const t = normalizeText('Pulse CTRL+G y luego Mayús+F5');
    expect(containsTerm(t, 'ctrl + g')).toBe(true);
    expect(containsTerm(t, 'mayús + f5')).toBe(true);
    expect(containsTerm(normalizeText('Active la AUTORRECUPERACIÓN'), 'autorrecuperación')).toBe(true);
  });
});

describe('escenarios', () => {
  it('6 tickets de 3 fases, con al menos una opción táctica buena y una mala por fase', () => {
    expect(SCENARIO_TICKETS).toHaveLength(6);
    expect(new Set(SCENARIO_TICKETS.map((t) => t.id)).size).toBe(6);
    for (const t of SCENARIO_TICKETS) {
      expect(t.stages.map((s) => s.stageNumber)).toEqual([1, 2, 3]);
      for (const s of t.stages) {
        expect(s.tacticalOptions.some((o) => o.advancesStage)).toBe(true);
        expect(s.tacticalOptions.some((o) => !o.advancesStage)).toBe(true);
        expect(s.conceptGroups.length).toBeGreaterThan(0);
      }
    }
  });

  it.each(allStages.map(({ ticket, stage }) => [`${ticket.code} F${stage.stageNumber}`, stage] as const))(
    '%s: la respuesta modelo cubre todos los conceptos y calma al usuario',
    (_n, stage) => {
      const r = evaluateFreeTextResponse(stage.modelResponse, stage, 80);
      expect(r.evaluation.missedConcepts).toEqual([]);
      expect(r.advancesStage).toBe(true);
      expect(r.evaluation.empathyScore).toBeGreaterThanOrEqual(EMPATHY_THRESHOLD);
    }
  );

  it.each(allStages.map(({ ticket, stage }) => [`${ticket.code} F${stage.stageNumber}`, stage] as const))(
    '%s: una respuesta amable pero genérica no hace avanzar',
    (_n, stage) => {
      const generica =
        'Hola, buenos días. Entiendo perfectamente su situación, no se preocupe que vamos a verlo juntos paso a paso. Primero haga clic en la pestaña de arriba, luego pulse el botón para que podamos enviar el archivo y comprobar que todo funciona con normalidad. Gracias por su paciencia.';
      const r = evaluateFreeTextResponse(generica, stage, 80);
      expect(r.evaluation.matchedConcepts).toEqual([]);
      expect(r.advancesStage).toBe(false);
    }
  );

  it('sin erratas de interfaz conocidas (Windows, Outlook y PowerPoint en español)', () => {
    const texto = JSON.stringify(SCENARIO_TICKETS) + JSON.stringify(KNOWLEDGE_GUIDES);
    for (const mal of ['Ampliar', 'Carbón', 'copita', 'Tiene archivos adjuntos', 'tiene:adjunto', 'Configuración de visualización', '"Duplicado"']) {
      expect(texto, mal).not.toContain(mal);
    }
    expect(texto).toContain('Extender');
    expect(texto).toContain('Tiene datos adjuntos');
    expect(texto).toContain('Intercambiar Vista Moderador y Presentación de diapositivas');
  });
});

describe('evaluación de la redacción libre', () => {
  const stage = SCENARIO_TICKETS[0].stages[1]; // CCO + solo lectura

  it('respuesta correcta y cálida: avanza, baja la frustración y el usuario agradece', () => {
    const r = evaluateFreeTextResponse(
      'Entiendo la prisa, Carmen, no se preocupe. Primero mueva las 40 direcciones al campo CCO para que nadie vea las de los demás, y luego deje el enlace en solo lectura. Gracias por avisarme.',
      stage,
      70
    );
    expect(r.advancesStage).toBe(true);
    expect(r.evaluation.empathyScore).toBeGreaterThanOrEqual(EMPATHY_THRESHOLD);
    expect(r.evaluation.frustrationAfter).toBe(38);
    expect(r.userReply).toBe(stage.successUserReply);
    expect(r.evaluation.assisted).toBe(false);
  });

  it('respuesta correcta pero borde: avanza, sube la frustración y el usuario responde molesto', () => {
    const r = evaluateFreeTextResponse('Es obvio: ponga los correos en CCO y el enlace en solo lectura, deje de quejarse.', stage, 70);
    expect(r.advancesStage).toBe(true);
    expect(r.evaluation.empathyScore).toBeLessThan(EMPATHY_THRESHOLD);
    expect(r.evaluation.frustrationAfter).toBeGreaterThan(70);
    expect(r.userReply).toBe(stage.coldSuccessUserReply);
  });

  it('frustración y respuesta del usuario usan el mismo umbral', () => {
    for (const texto of [
      'Hola. Use CCO y solo lectura.',
      'Hola, gracias. Use CCO y solo lectura, por favor.',
      'Hola, gracias, entiendo. Use CCO y solo lectura, por favor.',
      'Es obvio. Use CCO y solo lectura.',
    ]) {
      const r = evaluateFreeTextResponse(texto, stage, 70);
      const calido = r.evaluation.empathyScore >= EMPATHY_THRESHOLD;
      expect(r.userReply === stage.successUserReply, texto).toBe(calido);
      expect(r.evaluation.frustrationAfter === 38, texto).toBe(calido);
    }
  });

  it('pegar la respuesta modelo cuenta como intervención con ayuda', () => {
    expect(isAssistedText(stage.modelResponse, stage)).toBe(true);
    expect(evaluateFreeTextResponse(stage.modelResponse, stage, 70).evaluation.assisted).toBe(true);
    expect(isAssistedText('Le explico: el campo CCO oculta las direcciones; el enlace, mejor en solo lectura.', stage)).toBe(false);
  });
});

describe('nota del ticket', () => {
  it('cuenta todas las intervenciones, también las fallidas y las de ayuda', () => {
    const stage = SCENARIO_TICKETS[0].stages[0];
    const mala = evaluateFreeTextResponse('Reinicie y punto.', stage, 85).evaluation;
    const buena = evaluateFreeTextResponse(stage.modelResponse, stage, 85).evaluation;
    const tactica = evaluateTacticalOption(stage.tacticalOptions[0], stage, 85).evaluation;
    const soloBuena = summarizeTurns([buena]);
    const todo = summarizeTurns([mala, buena, tactica]);
    expect(todo.attempts).toBe(3);
    expect(todo.failedAttempts).toBe(1);
    expect(todo.assistedTurns).toBe(2);
    expect(todo.overallScore).toBeLessThan(soloBuena.overallScore);
  });
});
