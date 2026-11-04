import React, { useState } from 'react';
import { BookOpen, Keyboard, MessageSquareHeart, Search, Wrench } from 'lucide-react';
import { KNOWLEDGE_GUIDES } from '../data/knowledgeBase';

export const KnowledgeBaseView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredGuides = KNOWLEDGE_GUIDES.filter((guide) => {
    const matchesCategory =
      selectedCategory === 'all' || guide.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      guide.title.toLowerCase().includes(q) ||
      guide.summary.toLowerCase().includes(q) ||
      guide.stepByStepSolution.some((s) => s.toLowerCase().includes(q)) ||
      guide.shortcutsAndCommands.some(
        (sc) =>
          sc.keys.toLowerCase().includes(q) || sc.action.toLowerCase().includes(q)
      );
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-700 font-semibold">
              BASE DE CONOCIMIENTO · MANUAL DE SOPORTE NIVEL 1
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Procedimientos de Ofimática y Desescalada Emocional (HEARD)
            </h1>
            <p className="text-sm text-slate-600">
              Consulta los atajos de teclado, rutas de recuperación y protocolos de empatía
              para guiar a usuarios frustrados.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar atajo (Win+P, CCO, .asd, PDF...)"
              aria-label="Buscar en el manual de ofimática"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600"
            />
          </div>
        </div>

        {/* Interactive Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
          {[
            { id: 'all', label: 'Todas las Guías (7)' },
            { id: 'email', label: 'Correo Electrónico' },
            { id: 'word', label: 'Procesador de Textos' },
            { id: 'presentation', label: 'Presentaciones y Proyección' },
            { id: 'soft-skills', label: 'Protocolo Empatía HEARD' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Cards Grid */}
      {filteredGuides.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-base font-semibold text-slate-800">
            No se encontraron procedimientos que coincidan con «{searchQuery}»
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGuides.map((guide) => (
            <article
              key={guide.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-sky-700 font-semibold">
                    {guide.categoryLabel}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{guide.title}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                {/* Symptom & Root Cause */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="font-semibold text-slate-800 block">
                      Síntoma que reporta el usuario:
                    </span>
                    <p className="text-slate-600 leading-relaxed">{guide.symptom}</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="font-semibold text-slate-800 block">
                      Causa técnica real:
                    </span>
                    <p className="text-slate-600 leading-relaxed">{guide.rootCause}</p>
                  </div>
                </div>

                {/* Step by Step Solution */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Wrench className="w-3.5 h-3.5 text-sky-700" />
                    <span>Procedimiento de Resolución Paso a Paso:</span>
                  </div>
                  <ol className="space-y-1.5 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
                    {guide.stepByStepSolution.map((step, i) => (
                      <li key={i} className="pl-1">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Shortcuts Table */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Keyboard className="w-3.5 h-3.5 text-slate-700" />
                    <span>Atajos y Comandos Clave:</span>
                  </div>
                  <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 text-xs">
                    {guide.shortcutsAndCommands.map((sc, i) => (
                      <div
                        key={i}
                        className="px-3 py-2 flex items-center justify-between gap-4 bg-slate-50/60"
                      >
                        <kbd className="font-mono font-semibold text-sky-800 shrink-0">
                          {sc.keys}
                        </kbd>
                        <span className="text-slate-600 text-right">{sc.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Empathy / Soft Skill Tip */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-start gap-2.5 text-xs text-emerald-950">
                <MessageSquareHeart className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-emerald-900">
                    Consejo de Habilidades Blandas (Empatía Nivel 1):
                  </strong>
                  <span className="leading-relaxed">{guide.empathyTip}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
