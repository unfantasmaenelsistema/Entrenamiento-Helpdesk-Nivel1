/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Flame,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  RotateCcw,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  ThumbsUp,
  User
} from 'lucide-react';
import {
  CategoryId,
  ChatMessage,
  CompletedTicketRecord,
  ScenarioTicket,
  TacticalOption,
  TurnEvaluation
} from './types/helpdesk';
import { SCENARIO_TICKETS } from './data/scenarios';
import {
  evaluateFreeTextResponse,
  evaluateTacticalOption,
  getGradeLabel
} from './utils/evaluationEngine';
import { SimulatedUserScreen } from './components/SimulatedUserScreen';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { EvaluationReportView } from './components/EvaluationReportView';
import { GitHubReadmeView } from './components/GitHubReadmeView';

type ActiveSection = 'simulator' | 'manual' | 'evaluation' | 'github';

const STORAGE_KEY_RECORDS = 'ufes_helpdesk_completed_records_v1';
const STORAGE_KEY_STUDENT = 'ufes_helpdesk_student_name_v1';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('simulator');
  const [categoryFilter, setCategoryFilter] = useState<'all' | CategoryId>('all');
  const [activeTicketId, setActiveTicketId] = useState<string>(SCENARIO_TICKETS[0].id);

  // Simulation state for current ticket
  const [currentStageNum, setCurrentStageNum] = useState<number>(1); // 1, 2, 3, or 4 (completed)
  const [currentFrustration, setCurrentFrustration] = useState<number>(
    SCENARIO_TICKETS[0].initialFrustration
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionTurns, setSessionTurns] = useState<TurnEvaluation[]>([]);
  const [responseMode, setResponseMode] = useState<'free' | 'tactical'>('free');
  const [freeTextInput, setFreeTextInput] = useState<string>('');
  const [showStageHint, setShowStageHint] = useState<boolean>(true);

  // Persistent student evaluation records
  const [completedRecords, setCompletedRecords] = useState<CompletedTicketRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECORDS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_STUDENT) || '';
    } catch {
      return '';
    }
  });

  const [selectedReportTicketId, setSelectedReportTicketId] = useState<string | null>(
    null
  );

  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeTicket: ScenarioTicket =
    SCENARIO_TICKETS.find((t) => t.id === activeTicketId) || SCENARIO_TICKETS[0];

  const activeStage =
    activeTicket.stages[Math.min(currentStageNum - 1, activeTicket.stages.length - 1)];

  const isSessionFinished = currentStageNum > 3;

  // Save records & student name to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(completedRecords));
    } catch {
      // ignore storage errors
    }
  }, [completedRecords]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT, studentName);
    } catch {
      // ignore storage errors
    }
  }, [studentName]);

  // Initialize or reset ticket session
  const startTicketSession = (ticket: ScenarioTicket) => {
    setActiveTicketId(ticket.id);
    setCurrentStageNum(1);
    setCurrentFrustration(ticket.initialFrustration);
    setSessionTurns([]);
    setFreeTextInput('');
    setMessages([
      {
        id: `${ticket.id}-init-user`,
        sender: 'user',
        text: ticket.stages[0].userPrompt,
        timestamp: 'Ahora',
        stageNumber: 1,
        emotionalState: 'furious'
      }
    ]);
  };

  useEffect(() => {
    startTicketSession(SCENARIO_TICKETS[0]);
  }, []);

  const handleSelectTicket = (ticketId: string) => {
    const found = SCENARIO_TICKETS.find((t) => t.id === ticketId);
    if (found) {
      startTicketSession(found);
      setActiveSection('simulator');
    }
  };

  const finalizeTicketRecord = (
    ticket: ScenarioTicket,
    allTurns: TurnEvaluation[],
    finalFrust: number
  ) => {
    const empathyAvg = Math.round(
      allTurns.reduce((acc, t) => acc + t.empathyScore, 0) / allTurns.length
    );
    const technicalAvg = Math.round(
      allTurns.reduce((acc, t) => acc + t.technicalScore, 0) / allTurns.length
    );
    const clarityAvg = Math.round(
      allTurns.reduce((acc, t) => acc + t.clarityScore, 0) / allTurns.length
    );
    const overallScore = Math.round(
      empathyAvg * 0.4 + technicalAvg * 0.4 + clarityAvg * 0.2
    );

    const newRecord: CompletedTicketRecord = {
      ticketId: ticket.id,
      ticketCode: ticket.code,
      ticketTitle: ticket.title,
      category: ticket.category,
      userName: ticket.userName,
      completedAt: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      finalFrustration: finalFrust,
      patienceAndEmpathyAvg: empathyAvg,
      technicalPrecisionAvg: technicalAvg,
      clarityAvg,
      overallScore,
      gradeLabel: getGradeLabel(overallScore),
      turns: allTurns
    };

    setCompletedRecords((prev) => {
      const filtered = prev.filter((r) => r.ticketId !== ticket.id);
      return [newRecord, ...filtered];
    });
    setSelectedReportTicketId(ticket.id);
  };

  const processTurnResult = (
    evaluation: TurnEvaluation,
    userReply: string,
    advancesStage: boolean
  ) => {
    const studentMsg: ChatMessage = {
      id: `student-${Date.now()}`,
      sender: 'student',
      text: evaluation.studentMessage,
      timestamp: `Fase ${currentStageNum}`,
      stageNumber: currentStageNum,
      evaluation
    };

    const userReactionMsg: ChatMessage = {
      id: `user-${Date.now() + 1}`,
      sender: 'user',
      text: userReply,
      timestamp: `Fase ${currentStageNum}`,
      stageNumber: currentStageNum,
      emotionalState:
        evaluation.frustrationAfter >= 70
          ? 'furious'
          : evaluation.frustrationAfter >= 40
          ? 'skeptical'
          : 'relieved'
    };

    setCurrentFrustration(evaluation.frustrationAfter);
    setFreeTextInput('');

    if (advancesStage) {
      const updatedTurns = [...sessionTurns, evaluation];
      setSessionTurns(updatedTurns);

      const nextStageNum = currentStageNum + 1;
      if (nextStageNum <= 3) {
        const nextStageObj = activeTicket.stages[nextStageNum - 1];
        const nextStagePromptMsg: ChatMessage = {
          id: `user-next-${Date.now() + 2}`,
          sender: 'user',
          text: nextStageObj.userPrompt,
          timestamp: `Fase ${nextStageNum}`,
          stageNumber: nextStageNum
        };
        setMessages((prev) => [
          ...prev,
          studentMsg,
          userReactionMsg,
          nextStagePromptMsg
        ]);
        setCurrentStageNum(nextStageNum);
      } else {
        setMessages((prev) => [...prev, studentMsg, userReactionMsg]);
        setCurrentStageNum(4);
        finalizeTicketRecord(activeTicket, updatedTurns, evaluation.frustrationAfter);
      }
    } else {
      setMessages((prev) => [...prev, studentMsg, userReactionMsg]);
    }

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  };

  const handleSendFreeText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeTextInput.trim() || isSessionFinished) return;
    const result = evaluateFreeTextResponse(
      freeTextInput,
      activeStage,
      currentFrustration
    );
    processTurnResult(result.evaluation, result.userReply, result.advancesStage);
  };

  const handleSelectTacticalOption = (option: TacticalOption) => {
    if (isSessionFinished) return;
    const result = evaluateTacticalOption(option, activeStage, currentFrustration);
    processTurnResult(result.evaluation, result.userReply, result.advancesStage);
  };

  const handleLoadTemplateToEditor = (text: string) => {
    setFreeTextInput(text);
    setResponseMode('free');
  };

  const filteredTickets = SCENARIO_TICKETS.filter(
    (t) => categoryFilter === 'all' || t.category === categoryFilter
  );

  const getFrustrationStatus = (val: number) => {
    if (val >= 75) {
      return {
        label: `▲ CRÍTICA (${val}%) · Usuario muy alterado`,
        textClass: 'text-red-700',
        barClass: 'bg-red-600'
      };
    }
    if (val >= 40) {
      return {
        label: `◆ MODERADA (${val}%) · Usuario tenso pero escucha`,
        textClass: 'text-amber-700',
        barClass: 'bg-amber-500'
      };
    }
    return {
      label: `✓ BAJA (${val}%) · Usuario calmado y colaborativo`,
      textClass: 'text-emerald-700',
      barClass: 'bg-emerald-600'
    };
  };

  const frustrationStatus = getFrustrationStatus(currentFrustration);
  const currentCompletedRecord = completedRecords.find(
    (r) => r.ticketId === activeTicket.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 1-row, 3 zones separated by gap-8 */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with User Logo */}
          <a
            href="https://www.unfantasmaenelsistema.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            <img
              src="./assets/aistudio/icono_81a3db5b.png"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/assets/aistudio/icono_81a3db5b.png')) {
                  target.src = '/assets/aistudio/icono_81a3db5b.png';
                }
              }}
              alt="Logo Un Fantasma en el Sistema"
              referrerPolicy="no-referrer"
              className="w-8 h-8 object-contain shrink-0"
            />
            <span>Un Fantasma en el Sistema · Helpdesk N1</span>
          </a>

          {/* Zone 2: 4 Single-line Navigation Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <button
              onClick={() => setActiveSection('simulator')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                activeSection === 'simulator'
                  ? 'text-slate-900 font-semibold underline decoration-sky-600 decoration-2 underline-offset-8'
                  : ''
              }`}
            >
              Simulador de Tickets
            </button>
            <button
              onClick={() => setActiveSection('manual')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                activeSection === 'manual'
                  ? 'text-slate-900 font-semibold underline decoration-sky-600 decoration-2 underline-offset-8'
                  : ''
              }`}
            >
              Manual de Ofimática
            </button>
            <button
              onClick={() => setActiveSection('evaluation')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                activeSection === 'evaluation'
                  ? 'text-slate-900 font-semibold underline decoration-sky-600 decoration-2 underline-offset-8'
                  : ''
              }`}
            >
              Evaluación y Rúbrica ({completedRecords.length}/{SCENARIO_TICKETS.length})
            </button>
            <button
              onClick={() => setActiveSection('github')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                activeSection === 'github'
                  ? 'text-slate-900 font-semibold underline decoration-sky-600 decoration-2 underline-offset-8'
                  : ''
              }`}
            >
              Guía GitHub Pages
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action Link */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.unfantasmaenelsistema.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Web Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Secondary Tab Bar */}
        <div className="flex md:hidden items-center gap-1 mt-3 pt-2 border-t border-slate-100 overflow-x-auto">
          {[
            { id: 'simulator', label: 'Simulador' },
            { id: 'manual', label: 'Manual Ofimática' },
            { id: 'evaluation', label: `Evaluación (${completedRecords.length})` },
            { id: 'github', label: 'GitHub Pages' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as ActiveSection)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                activeSection === item.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeSection === 'manual' && <KnowledgeBaseView />}

        {activeSection === 'evaluation' && (
          <EvaluationReportView
            completedRecords={completedRecords}
            selectedTicketId={selectedReportTicketId}
            onSelectTicketRecord={(id) => setSelectedReportTicketId(id)}
            onStartTicket={(id) => handleSelectTicket(id)}
            studentName={studentName}
            onChangeStudentName={setStudentName}
          />
        )}

        {activeSection === 'github' && <GitHubReadmeView />}

        {activeSection === 'simulator' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
            {/* Educational Context Strip */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src="./assets/aistudio/icono_81a3db5b.png"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/assets/aistudio/icono_81a3db5b.png')) {
                      target.src = '/assets/aistudio/icono_81a3db5b.png';
                    }
                  }}
                  alt="Icono Un Fantasma en el Sistema"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 object-contain shrink-0 hidden sm:block"
                />
                <div className="space-y-1">
                  <div className="text-xs font-mono text-sky-700 font-semibold">
                    LABORATORIO DE ASISTENCIA A USUARIOS · NIVEL 1 (SMR / ASIR / OFIMÁTICA)
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 text-balance">
                    Simulador de Soporte Técnico ante Usuarios Frustrados
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
                    Practica la contención emocional (empatía, paciencia y claridad sin jerga)
                    y guía al usuario paso a paso en incidencias críticas de Correo
                    Electrónico, Procesador de Textos y Proyección de Presentaciones.
                  </p>
                </div>
              </div>

              {/* Quick Progress Summary */}
              <div className="flex items-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-slate-500">Progreso del Alumno</div>
                  <div className="text-sm font-bold font-mono tabular-nums text-slate-900">
                    {completedRecords.length} / {SCENARIO_TICKETS.length} Tickets Resueltos
                  </div>
                </div>
                <button
                  onClick={() => setActiveSection('evaluation')}
                  className="px-3.5 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>Ver Rúbrica Global</span>
                </button>
              </div>
            </div>

            {/* Two-Zone Sandbox Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Ticket Queue (4 cols) */}
              <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">
                    Cola de Incidencias (Nivel 1)
                  </h2>
                  <span className="text-xs font-mono text-slate-500 tabular-nums">
                    {filteredTickets.length} activas
                  </span>
                </div>

                {/* Category Filter Tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'email', label: 'Correo' },
                    { id: 'word', label: 'Textos' },
                    { id: 'presentation', label: 'Proyector' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setCategoryFilter(tab.id as 'all' | CategoryId)}
                      className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap truncate ${
                        categoryFilter === tab.id
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Ticket List */}
                <div className="space-y-2.5">
                  {filteredTickets.map((ticket) => {
                    const isSelected = ticket.id === activeTicket.id;
                    const doneRecord = completedRecords.find(
                      (r) => r.ticketId === ticket.id
                    );

                    return (
                      <button
                        key={ticket.id}
                        onClick={() => startTicketSession(ticket)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50/80 border-sky-600'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-900">
                              {ticket.code}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{ticket.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{ticket.difficulty}</span>
                          </div>
                          {doneRecord && (
                            <span className="text-emerald-700 font-bold tabular-nums flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {doneRecord.overallScore}%
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                          {ticket.title}
                        </h3>

                        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                          <span>
                            {ticket.userName} ({ticket.userDepartment})
                          </span>
                          <span className="font-mono text-[11px] text-red-700 tabular-nums">
                            Frustración: {ticket.initialFrustration}%
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Center & Right Column: Active Helpdesk Simulation Stage (8 cols) */}
              <section className="lg:col-span-8 space-y-5">
                {/* Active Ticket Header & Frustration Thermometer */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                        <span className="font-bold text-sky-700">{activeTicket.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeTicket.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>Dificultad: {activeTicket.difficulty}</span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        {activeTicket.title}
                      </h2>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {activeTicket.contextSummary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setActiveSection('manual')}
                        className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Consultar Manual</span>
                      </button>
                      <button
                        onClick={() => startTicketSession(activeTicket)}
                        className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reiniciar Ticket</span>
                      </button>
                    </div>
                  </div>

                  {/* User Persona & Live Frustration Progress Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {activeTicket.userName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-slate-900 text-sm">
                          {activeTicket.userName}
                        </div>
                        <div className="text-slate-500">
                          {activeTicket.userRole} · {activeTicket.userDepartment}
                        </div>
                      </div>
                    </div>

                    {/* Frustration Meter */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-600" />
                          <span>Termómetro de Frustración:</span>
                        </span>
                        <span
                          className={`font-mono font-semibold tabular-nums ${frustrationStatus.textClass}`}
                        >
                          {frustrationStatus.label}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className={`h-full transition-all duration-200 ${frustrationStatus.barClass}`}
                          style={{ width: `${currentFrustration}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stage Progress Stepper */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    {activeTicket.stages.map((st) => {
                      const isDone = currentStageNum > st.stageNumber;
                      const isCurrent = currentStageNum === st.stageNumber;
                      return (
                        <div
                          key={st.stageNumber}
                          className={`p-2.5 rounded-lg border text-xs ${
                            isDone
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                              : isCurrent
                              ? 'bg-sky-50 border-sky-600 text-sky-950 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="font-mono text-[11px] flex items-center justify-between">
                            <span>FASE 0{st.stageNumber}</span>
                            {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          </div>
                          <div className="truncate mt-0.5">{st.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Simulated User Screen */}
                <SimulatedUserScreen
                  ticket={activeTicket}
                  currentStage={currentStageNum}
                />

                {/* Conversation & Coaching Transcript */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <MessageSquare className="w-4 h-4 text-sky-700" />
                      <span>
                        Canal de Asistencia Directa con {activeTicket.userName}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {isSessionFinished
                        ? 'Sesión finalizada (3/3 fases superadas)'
                        : `Objetivo actual: Fase ${currentStageNum} de 3`}
                    </span>
                  </div>

                  <div className="p-5 space-y-4 max-h-[460px] overflow-y-auto">
                    {messages.map((msg) => {
                      if (msg.sender === 'user') {
                        return (
                          <div key={msg.id} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              <User className="w-4 h-4" />
                            </div>
                            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 space-y-1">
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <strong className="text-slate-900">
                                  {activeTicket.userName} (Usuario)
                                </strong>
                                <span className="font-mono">{msg.timestamp}</span>
                              </div>
                              <p className="leading-relaxed">{msg.text}</p>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={msg.id} className="space-y-2.5 pl-6 sm:pl-12">
                          <div className="bg-sky-50/90 border border-sky-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 space-y-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-sky-900">
                              <strong className="font-bold flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-sky-700" />
                                <span>Tu intervención (Técnico Helpdesk N1)</span>
                              </strong>
                              {msg.evaluation && (
                                <span className="font-mono tabular-nums text-[11px]">
                                  Empatía: {msg.evaluation.empathyScore}% · Técnica:{' '}
                                  {msg.evaluation.technicalScore}% · Claridad:{' '}
                                  {msg.evaluation.clarityScore}%
                                </span>
                              )}
                            </div>
                            <p className="leading-relaxed text-slate-800">{msg.text}</p>
                          </div>

                          {/* Real-time Pedagogical Evaluation Callout */}
                          {msg.evaluation && (
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5">
                              <div className="flex items-center justify-between font-semibold text-slate-800">
                                <span>Feedback Docente en Tiempo Real:</span>
                                <span className="font-mono tabular-nums text-slate-600">
                                  Frustración: {msg.evaluation.frustrationBefore}% →{' '}
                                  {msg.evaluation.frustrationAfter}%
                                </span>
                              </div>
                              <p className="text-slate-700 leading-relaxed">
                                {msg.evaluation.feedbackSummary}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div ref={chatEndRef} />
                  </div>
                </div>

                {/* Action Deck: Either Completed Summary Card OR Active Response Composer */}
                {isSessionFinished && currentCompletedRecord ? (
                  <div className="bg-white border border-emerald-300 rounded-xl p-6 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <ThumbsUp className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-emerald-700 font-bold">
                            INCIDENCIA {activeTicket.code} RESUELTA CON ÉXITO
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">
                            Calificación de la Sesión: {currentCompletedRecord.overallScore}/100
                          </h3>
                          <p className="text-xs text-slate-600">
                            {currentCompletedRecord.gradeLabel}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedReportTicketId(activeTicket.id);
                            setActiveSection('evaluation');
                          }}
                          className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Award className="w-4 h-4" />
                          <span>Ver Rúbrica Completa</span>
                        </button>
                        <button
                          onClick={() => {
                            const nextIdx =
                              (SCENARIO_TICKETS.findIndex((t) => t.id === activeTicket.id) +
                                1) %
                              SCENARIO_TICKETS.length;
                            startTicketSession(SCENARIO_TICKETS[nextIdx]);
                          }}
                          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Siguiente Ticket</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <span className="text-slate-500 block">
                          Paciencia y Empatía (Soft Skills)
                        </span>
                        <strong className="text-2xl font-mono tabular-nums text-emerald-700">
                          {currentCompletedRecord.patienceAndEmpathyAvg}%
                        </strong>
                      </div>
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <span className="text-slate-500 block">
                          Precisión Técnica (Ofimática)
                        </span>
                        <strong className="text-2xl font-mono tabular-nums text-sky-700">
                          {currentCompletedRecord.technicalPrecisionAvg}%
                        </strong>
                      </div>
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <span className="text-slate-500 block">
                          Claridad Paso a Paso
                        </span>
                        <strong className="text-2xl font-mono tabular-nums text-slate-900">
                          {currentCompletedRecord.clarityAvg}%
                        </strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                    {/* Current Stage Objective & Hint Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="space-y-0.5">
                        <div className="text-xs font-mono text-sky-700 font-semibold">
                          FASE {activeStage.stageNumber} DE 3 · {activeStage.title}
                        </div>
                        <p className="text-xs text-slate-700">{activeStage.objective}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setShowStageHint((prev) => !prev)}
                          className="px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          <span>{showStageHint ? 'Ocultar Pista' : 'Ver Pista Técnica'}</span>
                        </button>

                        {/* Mode Switcher */}
                        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                          <button
                            onClick={() => setResponseMode('free')}
                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                              responseMode === 'free'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Redacción Libre
                          </button>
                          <button
                            onClick={() => setResponseMode('tactical')}
                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                              responseMode === 'tactical'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Opciones Tácticas
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stage Hint & Expected Concepts Box */}
                    {showStageHint && (
                      <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-2">
                        <p className="leading-relaxed">
                          <strong className="font-semibold">
                            Guía para el Alumno (Fase {activeStage.stageNumber}):
                          </strong>{' '}
                          {activeStage.hint}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-amber-900">
                          <span className="font-semibold">Conceptos evaluados:</span>
                          {activeStage.conceptGroups.map((cg, i) => (
                            <span key={i}>
                              {i > 0 && ' · '}
                              {cg.name} ({cg.keywords.slice(0, 3).join(', ')})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Response Input Area */}
                    {responseMode === 'free' ? (
                      <form onSubmit={handleSendFreeText} className="space-y-3">
                        <textarea
                          rows={4}
                          value={freeTextInput}
                          onChange={(e) => setFreeTextInput(e.target.value)}
                          placeholder={`Escribe tu respuesta para ${activeTicket.userName}... (Ej: Valida primero su urgencia con empatía y dale los pasos o atajos claros de ofimática para esta fase)`}
                          className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-600 leading-relaxed"
                        />

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setFreeTextInput(activeStage.modelResponse)
                              }
                              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                            >
                              Insertar respuesta modelo para practicar
                            </button>
                            <button
                              type="button"
                              onClick={() => setResponseMode('tactical')}
                              className="px-3 py-1.5 text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
                            >
                              Ver 3 opciones comparativas
                            </button>
                          </div>

                          <button
                            type="submit"
                            disabled={!freeTextInput.trim()}
                            className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 disabled:opacity-40 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Enviar y Evaluar Intervención</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="text-xs text-slate-600 font-medium">
                          Selecciona una intervención para observar cómo reacciona el
                          usuario frustrado, o cárgala en el editor para personalizarla:
                        </div>
                        <div className="space-y-2.5">
                          {activeStage.tacticalOptions.map((opt, idx) => (
                            <div
                              key={opt.id}
                              className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition-colors"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-mono font-semibold text-slate-700">
                                  Opción 0{idx + 1}
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleLoadTemplateToEditor(opt.responseText)
                                    }
                                    className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                                  >
                                    Editar en texto libre
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectTacticalOption(opt)}
                                    className="px-3 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                                  >
                                    Enviar esta respuesta
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                                «{opt.responseText}»
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Clean Footer with Brand Logo and Official Link */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <img
              src="./assets/aistudio/icono_81a3db5b.png"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/assets/aistudio/icono_81a3db5b.png')) {
                  target.src = '/assets/aistudio/icono_81a3db5b.png';
                }
              }}
              alt="Logo Un Fantasma en el Sistema"
              referrerPolicy="no-referrer"
              className="w-7 h-7 object-contain shrink-0"
            />
            <span>
              <strong>Entrenamiento Helpdesk (Nivel 1)</strong> · Recurso educativo de
              Ofimática y Atención al Usuario
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSection('github')}
              className="hover:text-slate-900 underline underline-offset-4 cursor-pointer"
            >
              Documentación y README GitHub Pages
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.unfantasmaenelsistema.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-700 hover:underline flex items-center gap-1"
            >
              <span>https://www.unfantasmaenelsistema.com/</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
