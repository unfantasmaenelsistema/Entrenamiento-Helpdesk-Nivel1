import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  FileCheck,
  Printer,
  RotateCcw,
  TrendingDown,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { CompletedTicketRecord, TurnEvaluation } from '../types/helpdesk';

/** Cómo se hizo la intervención: redacción propia, plantilla u opción táctica. */
const turnTags = (turn: TurnEvaluation): string[] => {
  const tags: string[] = [];
  if (turn.advanced === false) tags.push('No avanza de fase');
  if (turn.modeUsed === 'tactical') tags.push('Opción táctica');
  else if (turn.assisted) tags.push('Con ayuda (plantilla)');
  else tags.push('Redacción propia');
  return tags;
};

const attemptsLine = (rec: CompletedTicketRecord): string => {
  const attempts = rec.attempts ?? rec.turns.length;
  const failed = rec.failedAttempts ?? 0;
  const assisted = rec.assistedTurns ?? 0;
  return `${attempts} intervenciones · ${failed} sin avanzar · ${assisted} con ayuda`;
};
import { SCENARIO_TICKETS } from '../data/scenarios';

interface EvaluationReportViewProps {
  completedRecords: CompletedTicketRecord[];
  selectedTicketId: string | null;
  onSelectTicketRecord: (ticketId: string) => void;
  onStartTicket: (ticketId: string) => void;
  studentName: string;
  onChangeStudentName: (name: string) => void;
}

export const EvaluationReportView: React.FC<EvaluationReportViewProps> = ({
  completedRecords,
  selectedTicketId,
  onSelectTicketRecord,
  onStartTicket,
  studentName,
  onChangeStudentName
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const activeRecord =
    completedRecords.find((r) => r.ticketId === selectedTicketId) ||
    completedRecords[0] ||
    null;

  const avgEmpathy =
    completedRecords.length > 0
      ? Math.round(
          completedRecords.reduce((acc, r) => acc + r.patienceAndEmpathyAvg, 0) /
            completedRecords.length
        )
      : 0;

  const avgTechnical =
    completedRecords.length > 0
      ? Math.round(
          completedRecords.reduce((acc, r) => acc + r.technicalPrecisionAvg, 0) /
            completedRecords.length
        )
      : 0;

  const avgClarity =
    completedRecords.length > 0
      ? Math.round(
          completedRecords.reduce((acc, r) => acc + r.clarityAvg, 0) /
            completedRecords.length
        )
      : 0;

  const avgOverall =
    completedRecords.length > 0
      ? Math.round(
          completedRecords.reduce((acc, r) => acc + r.overallScore, 0) /
            completedRecords.length
        )
      : 0;

  const handleDownloadMarkdownReport = () => {
    const lines: string[] = [
      `# Informe de Evaluación Helpdesk Nivel 1 — Un Fantasma en el Sistema`,
      ``,
      `- **Alumno/a:** ${studentName || 'Estudiante de Soporte Nivel 1'}`,
      `- **Fecha de emisión:** ${new Date().toLocaleString('es-ES')}`,
      `- **Tickets resueltos:** ${completedRecords.length} de ${SCENARIO_TICKETS.length}`,
      `- **Nota Global Media:** ${avgOverall}/100 (Empatía: ${avgEmpathy}% · Precisión Técnica: ${avgTechnical}% · Claridad: ${avgClarity}%)`,
      `- **Web del proyecto:** https://www.unfantasmaenelsistema.com/`,
      ``,
      `---`,
      ``
    ];

    for (const rec of completedRecords) {
      lines.push(`## ${rec.ticketCode} — ${rec.ticketTitle}`);
      lines.push(
        `- **Usuario atendido:** ${rec.userName} · **Calificación:** ${rec.overallScore}/100 (${rec.gradeLabel})`
      );
      lines.push(
        `- **Paciencia y Empatía:** ${rec.patienceAndEmpathyAvg}% · **Precisión Ofimática:** ${rec.technicalPrecisionAvg}% · **Claridad:** ${rec.clarityAvg}%`
      );
      lines.push(`- **Frustración final del usuario:** ${rec.finalFrustration}%`);
      lines.push(`- **Intervenciones:** ${attemptsLine(rec)}`);
      lines.push(``);
      for (const turn of rec.turns) {
        lines.push(`### Fase ${turn.stageNumber}: ${turn.stageTitle} (${turnTags(turn).join(' · ')})`);
        lines.push(`- **Respuesta del alumno:** «${turn.studentMessage}»`);
        lines.push(
          `- **Métricas del turno:** Empatía ${turn.empathyScore}% | Técnica ${turn.technicalScore}% | Claridad ${turn.clarityScore}% | Frustración ${turn.frustrationBefore}% → ${turn.frustrationAfter}%`
        );
        lines.push(`- **Evaluación docente:** ${turn.feedbackSummary}`);
        lines.push(`- **Respuesta modelo de referencia:** «${turn.modelResponse}»`);
        lines.push(``);
      }
      lines.push(`---`);
      lines.push(``);
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluacion-helpdesk-nivel1-${(studentName || 'alumno')
      .toLowerCase()
      .replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdownReport = () => {
    if (!activeRecord) return;
    const summaryText = `Ticket ${activeRecord.ticketCode} (${activeRecord.ticketTitle}) — Alumno: ${
      studentName || 'Sin nombre'
    } | Nota Global: ${activeRecord.overallScore}/100 | Paciencia y Empatía: ${
      activeRecord.patienceAndEmpathyAvg
    }% | Precisión Técnica: ${activeRecord.technicalPrecisionAvg}% | Claridad: ${
      activeRecord.clarityAvg
    }% | ${attemptsLine(activeRecord)}`;
    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2500);
      })
      .catch(() => undefined);
  };

  if (completedRecords.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900">
              Aún no has completado ninguna sesión de soporte
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Resuelve al menos las 3 fases de uno de los 6 tickets de usuario frustrado en el
              Simulador para desbloquear tu informe detallado de Paciencia, Empatía y Precisión
              Técnica en Ofimática.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {SCENARIO_TICKETS.slice(0, 3).map((t) => (
              <button
                key={t.id}
                onClick={() => onStartTicket(t.id)}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Iniciar {t.code} · {t.categoryLabel}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header & Student Identity Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-1.5">
          <div className="text-xs font-mono text-sky-700 font-semibold">
            RÚBRICA DOCENTE · EVALUACIÓN DE COMPETENCIAS NIVEL 1
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Informe de Paciencia, Empatía y Precisión en Ofimática
          </h1>
          <p className="text-sm text-slate-600">
            Has completado <strong className="font-mono tabular-nums">{completedRecords.length}</strong> de{' '}
            <strong className="font-mono tabular-nums">{SCENARIO_TICKETS.length}</strong> escenarios de
            asistencia a usuarios frustrados.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
            <UserCheck className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              type="text"
              value={studentName}
              onChange={(e) => onChangeStudentName(e.target.value)}
              placeholder="Nombre del alumno/a..."
              aria-label="Nombre del alumno para el informe"
              className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none w-44"
            />
          </div>

          <button
            onClick={handleDownloadMarkdownReport}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Informe (.md)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Global KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            Nota Media Global Nivel 1
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-slate-900">
            {avgOverall}/100
          </div>
          <div className="text-xs text-emerald-700 font-medium pt-1">
            Media ponderada de sesiones resueltas
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            Paciencia y Empatía (Soft Skills)
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-emerald-700">
            {avgEmpathy}%
          </div>
          <div className="text-xs text-slate-600 pt-1">
            Validación emocional y ausencia de reproches
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            Precisión Técnica en Ofimática
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-sky-700">
            {avgTechnical}%
          </div>
          <div className="text-xs text-slate-600 pt-1">
            Dominio de Correo, Textos y Presentaciones
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <div className="text-xs text-slate-500 font-medium">
            Claridad y Didáctica Paso a Paso
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-slate-900">
            {avgClarity}%
          </div>
          <div className="text-xs text-slate-600 pt-1">
            Instrucciones estructuradas sin jerga opaca
          </div>
        </div>
      </div>

      {/* Selector of Completed Tickets & Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Historial de Tickets Evaluados
          </h2>
          <div className="space-y-2.5">
            {completedRecords.map((rec) => {
              const isSelected = activeRecord?.ticketId === rec.ticketId;
              return (
                <button
                  key={rec.ticketId}
                  onClick={() => onSelectTicketRecord(rec.ticketId)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-600'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="font-semibold text-slate-800">{rec.ticketCode}</span>
                    <span className="tabular-nums font-bold text-sky-700">
                      {rec.overallScore}/100
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mt-1">
                    {rec.ticketTitle}
                  </div>
                  <div className="text-xs text-slate-500 mt-1.5 flex items-center gap-2 font-mono tabular-nums">
                    <span>Empatía: {rec.patienceAndEmpathyAvg}%</span>
                    <span aria-hidden="true">·</span>
                    <span>Técnica: {rec.technicalPrecisionAvg}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Ticket Detailed Turn-by-Turn Evaluation */}
        {activeRecord && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="text-xs font-mono text-slate-500">
                  {activeRecord.ticketCode} · Usuario atendido: {activeRecord.userName} ·{' '}
                  {activeRecord.completedAt}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {activeRecord.ticketTitle}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 mt-1">
                  Calificación obtenida: {activeRecord.overallScore}/100 —{' '}
                  {activeRecord.gradeLabel}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">{attemptsLine(activeRecord)}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyMarkdownReport}
                  className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copiedSummary ? '¡Resumen copiado!' : 'Copiar resumen'}
                </button>
                <button
                  onClick={() => onStartTicket(activeRecord.ticketId)}
                  className="px-3 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir Ticket</span>
                </button>
              </div>
            </div>

            {/* Ticket Sub-metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block">Paciencia / Empatía</span>
                <strong className="text-lg font-mono tabular-nums text-emerald-700">
                  {activeRecord.patienceAndEmpathyAvg}%
                </strong>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block">Precisión Ofimática</span>
                <strong className="text-lg font-mono tabular-nums text-sky-700">
                  {activeRecord.technicalPrecisionAvg}%
                </strong>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block">Claridad Paso a Paso</span>
                <strong className="text-lg font-mono tabular-nums text-slate-900">
                  {activeRecord.clarityAvg}%
                </strong>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block">Frustración Final</span>
                <strong className="text-lg font-mono tabular-nums text-emerald-700 flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  {activeRecord.finalFrustration}%
                </strong>
              </div>
            </div>

            {/* Turn-by-turn Audit */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Auditoría Pedagógica Fase por Fase
              </h4>

              {activeRecord.turns.map((turn, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Fase {turn.stageNumber}: {turn.stageTitle}
                      <span className="ml-2 inline-flex flex-wrap gap-1 align-middle">
                        {turnTags(turn).map((tag) => (
                          <span
                            key={tag}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              tag === 'No avanza de fase'
                                ? 'bg-amber-100 text-amber-800'
                                : tag === 'Redacción propia'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                    <div className="font-mono tabular-nums text-slate-600 flex items-center gap-2">
                      <span>Empatía: {turn.empathyScore}%</span>
                      <span aria-hidden="true">·</span>
                      <span>Técnica: {turn.technicalScore}%</span>
                      <span aria-hidden="true">·</span>
                      <span>Claridad: {turn.clarityScore}%</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        Frustración: {turn.frustrationBefore}% → {turn.frustrationAfter}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 block mb-1">
                      Tu intervención como Técnico Nivel 1:
                    </span>
                    <p className="p-3 bg-white border border-slate-200 rounded-lg text-slate-800 leading-relaxed">
                      «{turn.studentMessage}»
                    </p>
                  </div>

                  {turn.matchedConcepts.length > 0 && (
                    <div className="flex items-start gap-2 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Conceptos técnicos abordados:</strong>{' '}
                        {turn.matchedConcepts.join(' · ')}
                      </span>
                    </div>
                  )}

                  {turn.missedConcepts.length > 0 && (
                    <div className="flex items-start gap-2 text-amber-800">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Conceptos técnicos omitidos en este intento:</strong>{' '}
                        {turn.missedConcepts.join(' · ')}
                      </span>
                    </div>
                  )}

                  <div className="p-3 bg-sky-50/80 border border-sky-200 rounded-lg text-sky-950 space-y-1.5">
                    <p>
                      <strong>Evaluación del Tutor:</strong> {turn.feedbackSummary}
                    </p>
                    <p className="text-slate-700 pt-1 border-t border-sky-200/70">
                      <strong className="text-sky-900">
                        Respuesta Modelo de Referencia:
                      </strong>{' '}
                      «{turn.modelResponse}»
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
