import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Cloud,
  FileText,
  FolderSearch,
  Lock,
  Mail,
  Monitor,
  Presentation,
  Send,
  ShieldCheck,
  Volume2,
  WifiOff,
  Wifi
} from 'lucide-react';
import { ScenarioTicket } from '../types/helpdesk';

interface SimulatedUserScreenProps {
  ticket: ScenarioTicket;
  currentStage: number; // 1, 2, 3, or 4 (completed)
}

export const SimulatedUserScreen: React.FC<SimulatedUserScreenProps> = ({
  ticket,
  currentStage
}) => {
  const isResolved = currentStage > 3;
  const activeStageObj =
    ticket.stages[Math.min(currentStage - 1, ticket.stages.length - 1)];

  return (
    <div className="border border-slate-200 bg-white rounded-xl overflow-hidden">
      {/* Remote Desktop Top Window Chrome */}
      <div className="bg-slate-900 text-slate-100 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <Monitor className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="font-semibold text-white">
            Visor Remoto · Equipo de {ticket.userName}
          </span>
          <span className="text-slate-400" aria-hidden="true">
            ·
          </span>
          <span className="text-slate-300">{ticket.code}</span>
        </div>
        <div className="text-xs font-mono text-slate-300 tabular-nums">
          {isResolved ? 'ESTADO: INCIDENCIA RESUELTA' : `FASE ${currentStage}/3 EN CURSO`}
        </div>
      </div>

      {/* Simulated Application Viewport */}
      <div className="p-4 bg-slate-100">
        {ticket.code === 'INC-1042' && (
          <div className="bg-white border border-slate-300 rounded-lg overflow-hidden text-xs">
            <div className="bg-sky-700 text-white px-3 py-2 flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Redacción de Correo Corporativo — Informe Auditoría 2026</span>
              </div>
              <span className="font-mono text-[11px] opacity-90">Límite del servidor: 25 MB</span>
            </div>

            <div className="p-3.5 space-y-2.5">
              {currentStage === 1 && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-md flex items-start gap-2.5 text-red-900">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      Error de adjunto: Dossier_Auditoria_2026.pdf (45,2 MB)
                    </p>
                    <p className="text-red-700 mt-0.5">
                      El tamaño del archivo supera el límite máximo del servidor (25 MB).
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-[64px_1fr] items-center gap-2 py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-600">Para:</span>
                {currentStage <= 2 && !isResolved ? (
                  <div className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded font-mono text-[11px]">
                    {currentStage === 1
                      ? 'director@cliente1.es; compras@cliente2.es; (+38 clientes visibles entre sí ⚠️)'
                      : 'carmen.vazquez@empresa.es (Pendiente de confirmar remitente propio)'}
                  </div>
                ) : (
                  <div className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded font-mono text-[11px]">
                    carmen.vazquez@empresa.es (Autodestinatario seguro)
                  </div>
                )}
              </div>

              <div className="grid grid-cols-[64px_1fr] items-center gap-2 py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-600">CCO:</span>
                {currentStage === 1 ? (
                  <span className="text-slate-400 italic">
                    Vacío — Los 40 clientes están expuestos en "Para"
                  </span>
                ) : (
                  <div className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded font-mono text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>40 clientes externos ocultos en Con Copia Oculta (RGPD OK)</span>
                  </div>
                )}
              </div>

              <div className="pt-1">
                {currentStage === 1 ? (
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-600">
                    Esperando subir archivo de 45,2 MB a OneDrive / Google Drive corporativo...
                  </div>
                ) : (
                  <div className="p-2.5 bg-sky-50 border border-sky-200 rounded flex items-center justify-between text-sky-900">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-sky-600 shrink-0" />
                      <div>
                        <p className="font-semibold">
                          Dossier_Auditoria_2026.pdf (Enlace en la nube · 45,2 MB)
                        </p>
                        <p className="text-[11px] text-sky-700">
                          Permiso configurado: Cualquier persona con el enlace puede VER (Solo lectura)
                        </p>
                      </div>
                    </div>
                    <Lock className="w-4 h-4 text-sky-700" />
                  </div>
                )}
              </div>

              {isResolved && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded flex items-center gap-2 text-emerald-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Verificado en carpeta "Elementos enviados" · Bandeja de salida vacía.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {ticket.code === 'INC-1048' && (
          <div className="bg-white border border-slate-300 rounded-lg overflow-hidden text-xs">
            <div className="bg-blue-800 text-white px-3 py-2 flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>
                  Procesador de Textos — Contrato_Suministros_2026.docx
                </span>
              </div>
              <span className="font-mono text-[11px]">
                {currentStage <= 2
                  ? 'Autoguardado: Desactivado'
                  : 'Autoguardado: ACTIVADO'}
              </span>
            </div>

            {currentStage === 1 && (
              <div className="p-3.5 space-y-2.5">
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      Versión en pantalla: Guardado ayer a las 18:15 (Páginas: 5 de 5)
                    </p>
                    <p className="text-amber-800 mt-0.5">
                      ¡PELIGRO! Si el usuario pulsa "Guardar" ahora, sobrescribirá el temporal de 35 páginas.
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-slate-700">
                  Ruta pendiente de explorar: Menú Archivo → Información → Administrar documento → Recuperar documentos no guardados (.asd)
                </div>
              </div>
            )}

            {currentStage === 2 && (
              <div className="p-3.5 space-y-2.5">
                <div className="text-[11px] font-mono text-slate-600 uppercase font-semibold">
                  Menú Archivo → Información → Administrar Documento
                </div>
                <div className="p-2.5 bg-sky-50 border border-sky-200 rounded flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sky-950">
                      Contrato_Suministros_2026 (Cuando se cerró sin guardar)
                    </p>
                    <p className="text-[11px] text-sky-800 font-mono">
                      Copia temporal Autorrecuperación (.asd) · Hoy hace 6 min · 35 páginas
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-sky-700 underline">
                    Abrir borrador
                  </span>
                </div>
              </div>
            )}

            {currentStage >= 3 && (
              <div className="p-3.5 space-y-2.5">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between text-emerald-950">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-semibold">
                        Documento recuperado íntegro: Páginas 35 de 35 (14.820 palabras)
                      </p>
                      <p className="text-[11px] text-emerald-800">
                        {isResolved
                          ? 'Archivo consolidado con Restaurar / Guardar como y Autoguardado activo.'
                          : 'Barra amarilla superior activa: Pulse [Restaurar] y guarde con Ctrl + G.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {ticket.code === 'INC-1053' && (
          <div className="bg-white border border-slate-300 rounded-lg overflow-hidden text-xs p-3.5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Presentation className="w-4 h-4 text-indigo-600" />
                <span>Configuración Multimoni­tor Sala de Juntas (Cable HDMI Activo)</span>
              </div>
              <span className="font-mono text-[11px] text-slate-600">Atajo: Win + P</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Screen 1: Laptop */}
              <div className="border border-slate-300 rounded-md p-2.5 bg-slate-50">
                <div className="font-mono text-[11px] text-slate-500 mb-1">
                  PANTALLA 1 · PORTÁTIL DE ELENA
                </div>
                {currentStage === 1 ? (
                  <div className="p-2 bg-white border border-slate-200 rounded text-slate-800">
                    <p className="font-semibold">Editor de Presentaciones abierto</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Notas privadas visibles abajo: "Margen máx. descuento: 14%".
                    </p>
                  </div>
                ) : (
                  <div className="p-2 bg-slate-900 text-slate-100 rounded">
                    <p className="font-semibold text-emerald-400">
                      Vista Moderador Activa (Privada)
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Cronómetro: 02:14 · Notas confidenciales visibles solo para Elena.
                    </p>
                  </div>
                )}
              </div>

              {/* Screen 2: Projector */}
              <div className="border border-slate-300 rounded-md p-2.5 bg-slate-50">
                <div className="font-mono text-[11px] text-slate-500 mb-1">
                  PANTALLA 2 · PROYECTOR PARED CONSEJO
                </div>
                {currentStage === 1 ? (
                  <div className="p-2 bg-sky-100 border border-sky-200 rounded text-sky-900">
                    <p className="font-semibold">Fondo de escritorio vacío (modo Extender)</p>
                    <p className="text-[11px] text-sky-800 mt-0.5">
                      Sin iconos ni presentación (aún no se ha pulsado F5).
                    </p>
                  </div>
                ) : (
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-950">
                    <p className="font-semibold">
                      Diapositiva a Pantalla Completa (F5 / Mayús+F5)
                    </p>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      El Consejo ve únicamente la diapositiva limpia sin notas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {ticket.code === 'INC-1059' && (
          <div className="bg-white border border-slate-300 rounded-lg overflow-hidden text-xs">
            <div className="bg-slate-800 text-white px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium">
                <FolderSearch className="w-4 h-4 text-sky-400" />
                <span>Buzón de Logística — julian.ortega@empresa.es</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                {currentStage === 1 ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-red-300">¡TRABAJANDO SIN CONEXIÓN!</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">CONECTADO AL SERVIDOR</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-3.5 space-y-2.5">
              {currentStage === 1 && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded text-red-900">
                  <p className="font-semibold">
                    Sincronización pausada desde las 08:58
                  </p>
                  <p className="text-[11px] text-red-800 mt-0.5">
                    El botón "Trabajar sin conexión" (pestaña Enviar y recibir) está activado.
                  </p>
                </div>
              )}

              {currentStage === 2 && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900">
                  <p className="font-semibold">
                    Carpeta "Correo no deseado (Spam)" — 1 mensaje retenido
                  </p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Remitente: trafico@proveedor-nuevo.es · Adjunto: Albaran_Camion3.pdf
                  </p>
                </div>
              )}

              {currentStage >= 3 && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950">
                  <p className="font-semibold">
                    Albarán recuperado en Bandeja de entrada + Filtro "Tiene datos adjuntos"
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Remitente marcado como seguro · Barra de estado inferior: Conectado.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {ticket.code === 'INC-1064' && (
          <div className="bg-white border border-slate-300 rounded-lg overflow-hidden text-xs p-3.5 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-semibold text-slate-800">
                Memoria_Anual_2026.docx (40 páginas)
              </span>
              <span className="font-mono text-[11px] text-slate-600">
                {currentStage === 1
                  ? 'Marcas de formato (¶): Ocultas'
                  : currentStage === 2
                  ? 'Marcas (¶): VISIBLES'
                  : 'Saltos de página + Exportación PDF'}
              </span>
            </div>

            {currentStage === 1 && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded font-mono text-[11px] text-amber-900">
                Al añadir 2 líneas en la pág. 2, 28 pulsaciones ocultas de Enter empujan todos los títulos de las páginas siguientes.
              </div>
            )}

            {currentStage === 2 && (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-slate-800 space-y-1">
                <p>Final del Capítulo 1.¶</p>
                <p className="text-red-600">¶ ¶ ¶ ¶ ¶ ¶ ¶ ¶ ¶ ¶ ¶ ¶ ¶ (25 párrafos vacíos con Enter)</p>
                <p className="text-sky-700 font-semibold">
                  Acción: Borrar símbolos ¶ vacíos y pulsar [Ctrl + Enter]
                </p>
              </div>
            )}

            {currentStage >= 3 && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded font-mono text-[11px] text-emerald-950 space-y-1">
                <p className="text-emerald-700">
                  .......... Salto de página (Ctrl + Enter) ..........
                </p>
                <p className="font-sans font-semibold">
                  Capítulo 2 anclado al inicio de hoja · Exportado como Memoria_Anual_2026.pdf con fuentes incrustadas.
                </p>
              </div>
            )}
          </div>
        )}

        {ticket.code === 'INC-1071' && (
          <div className="bg-white border border-slate-300 rounded-lg overflow-hidden text-xs p-3.5 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Salón de Actos — Curso Prevención (50 asistentes)</span>
              </div>
              <span className="font-mono text-[11px] text-slate-600">
                {currentStage === 1
                  ? 'Modo Cortinilla Negra (Tecla N)'
                  : 'Imagen Restaurada · Audio HDMI'}
              </span>
            </div>

            {currentStage === 1 && (
              <div className="p-3 bg-slate-950 text-slate-200 rounded font-mono text-[11px] flex items-center justify-between">
                <span>
                  [PANTALLA EN NEGRO ACTIVA — Se pulsó accidentalmente la tecla "N" o "."]
                </span>
                <span className="text-sky-400">Pulse "N" o Espacio</span>
              </div>
            )}

            {currentStage === 2 && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900">
                <p className="font-semibold">
                  Salida de audio actual: Altavoces internos del portátil (Realtek)
                </p>
                <p className="text-[11px] mt-0.5">
                  Cambiar en el icono de Altavoz (junto al reloj) → Seleccionar "HDMI / Proyector Salón de Actos".
                </p>
              </div>
            )}

            {currentStage >= 3 && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-950">
                <p className="font-semibold">
                  Audio sonando por megafonía HDMI + Vídeo incrustado en el archivo .pptx
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Insertar → Vídeo → Este dispositivo → Insertar (Incrustar) + Copia de seguridad MP4 en el USB.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Current Stage Context Strip */}
        <div className="mt-2.5 px-1 flex items-center justify-between text-[11px] text-slate-600">
          <span>
            <strong className="text-slate-800">Estado en pantalla:</strong>{' '}
            {isResolved
              ? 'El usuario ha completado todos los pasos y su equipo funciona con normalidad.'
              : activeStageObj.screenStateDescription}
          </span>
        </div>
      </div>
    </div>
  );
};
