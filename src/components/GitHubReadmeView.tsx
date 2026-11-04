import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink, FileCode2, FolderGit2 } from 'lucide-react';

const FULL_README_MARKDOWN = `<div align="center">
  <a href="https://www.unfantasmaenelsistema.com/" target="_blank">
    <img src="./public/assets/aistudio/icono_81a3db5b.png" alt="Logo Un Fantasma en el Sistema" width="120" />
  </a>

  # Entrenamiento Helpdesk (Nivel 1) — Simulador de Asistencia a Usuarios

  **Simulador interactivo de soporte técnico Nivel 1 con «Personalidad de Usuario Frustrado» para entrenar habilidades blandas (*Soft Skills*: empatía, paciencia, claridad pedagógica) y conocimientos técnicos de Ofimática (Correo Electrónico, Procesador de Textos y Presentaciones).**

  🌐 **Proyecto educativo de [Un Fantasma en el Sistema](https://www.unfantasmaenelsistema.com/)**
</div>

---

## 📋 Descripción del Proyecto

En el trabajo real de un técnico de **Helpdesk / Service Desk de Nivel 1**, saber la respuesta técnica es solo la mitad del éxito: la otra mitad consiste en **contener la frustración del usuario**, escuchar sin ponerse a la defensiva, explicar cada paso con un lenguaje claro sin jerga innecesaria y educar para prevenir futuras incidencias.

Esta aplicación web adopta la **Personalidad de Usuario Frustrado** en 6 escenarios reales de oficina. El alumno actúa como técnico de soporte guiando al usuario a través de 3 fases progresivas (**1. Contención y Diagnóstico → 2. Resolución Guiada Paso a Paso → 3. Verificación y Prevención**) mientras observa en tiempo real el **Visor Remoto del Equipo del Usuario** y el **Termómetro de Frustración**.

Al finalizar cada ticket, el simulador genera un **Informe de Evaluación con Rúbrica Docente** que mide:
1. **Paciencia y Empatía (Habilidades Blandas)** (\`0% – 100%\`)
2. **Precisión Técnica en Ofimática (Hard Skills)** (\`0% – 100%\`)
3. **Claridad Pedagógica y Comunicación Paso a Paso** (\`0% – 100%\`)
4. **Índice de Desescalada Emocional** (evolución de la frustración turno a turno)

---

## 🖼️ Capturas de Pantalla de la Aplicación

### 1. Consola Principal de Simulación y Visor Remoto del Equipo del Usuario
![Captura del Simulador Helpdesk Nivel 1](./public/docs/captura-simulador.svg)

### 2. Informe Final de Evaluación y Rúbrica Turno por Turno
![Captura de Evaluación y Rúbrica](./public/docs/captura-evaluacion.svg)

### 3. Base de Conocimiento de Ofimática y Protocolo HEARD
![Captura del Manual de Ofimática](./public/docs/captura-manual.svg)

---

## 🎯 Escenarios de Entrenamiento Incluidos (6 Tickets Nivel 1)

| Código | Categoría | Usuario Frustrado | Incidencia Simulada | Competencias Técnicas Evaluadas |
| :--- | :--- | :--- | :--- | :--- |
| **\`INC-1042\`** | **Correo Electrónico** | Carmen Vázquez *(Directora Financiera)* | Bloqueo al adjuntar PDF de 45 MB para 40 clientes externos a 10 min de cerrar auditoría. | Límite de 25 MB en correo, enlace en la nube en modo *Solo lectura*, uso obligatorio de **CCO (Copia Oculta)** por RGPD y verificación en *Elementos enviados*. |
| **\`INC-1048\`** | **Procesador de Textos** | Roberto Méndez *(Jefe de Compras)* | Pérdida de contrato de 35 páginas tras cierre inesperado sin haber guardado. | Frenar sobrescritura del archivo antiguo, ruta \`Archivo > Información > Administrar documento\`, \`Recuperar documentos no guardados (.asd)\`, botón *Restaurar* y atajo **\`Ctrl + G\`**. |
| **\`INC-1053\`** | **Presentaciones** | Elena Soriano *(Directora Comercial)* | El proyector de la sala de juntas solo muestra el fondo de escritorio vacío y teme que se vean sus notas privadas. | Atajo **\`Windows + P\`** (diferencia entre *Duplicar* y *Ampliar*), activar **Vista Moderador**, lanzar con **\`F5\`** / **\`Mayús + F5\`** e intercambiar monitores. |
| **\`INC-1059\`** | **Correo Electrónico** | Julián Ortega *(Coordinador Logístico)* | No entran correos desde las 9:00 con tres camiones esperando albaranes en el muelle. | Desactivar modo **Trabajar sin conexión** en la barra de estado, rescatar mensajes de **Correo no deseado (Spam)** marcando remitente seguro y filtro *Tiene archivos adjuntos*. |
| **\`INC-1064\`** | **Procesador de Textos** | Lucía Pardo *(Secretaria de Dirección)* | Al añadir dos líneas en la página 2 se descuadran las 40 páginas de la memoria anual y cambia la letra en la imprenta. | Mostrar marcas de formato (**\`¶\` / \`Ctrl + Mayús + 8\`**), sustituir \`Enter\` repetidos por **Salto de página (\`Ctrl + Enter\`)** y exportar a **PDF** con fuentes incrustadas. |
| **\`INC-1071\`** | **Presentaciones** | Marcos Vidal *(Formador de Prevención)* | La pantalla se pone completamente negra a mitad de clase al rozar el teclado y el vídeo no suena por el proyector. | Cortinilla negra con la **tecla \`N\` o \`.\`**, conmutar salida de audio de Windows a **HDMI / Proyector** e **incrustar vídeo** dentro del \`.pptx\` en lugar de vincularlo. |

---

## 🚀 Despliegue en GitHub Pages

La aplicación está configurada con \`base: './'\` en \`vite.config.ts\` y un flujo de trabajo automático en \`.github/workflows/deploy.yml\`:

1. Sube este repositorio a GitHub en la rama \`main\`.
2. Ve a **Settings → Pages** en tu repositorio.
3. En **Build and deployment → Source**, elige **GitHub Actions**.
4. ¡Listo! Cada cambio se compilará y publicará automáticamente en tu URL de GitHub Pages.

---

## 👨‍🏫 Autoría

Creado por **[Un Fantasma en el Sistema](https://www.unfantasmaenelsistema.com/)**.`;

const DEPLOY_YML_CONTENT = `name: Desplegar en GitHub Pages

on:
  push:
    branches: ['main', 'master']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout del repositorio
        uses: actions/checkout@v4
      - name: Configurar Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Instalar dependencias
        run: npm install
      - name: Compilar aplicación estática (Vite)
        run: npm run build
      - name: Subir artefacto para GitHub Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Publicar en GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

export const GitHubReadmeView: React.FC = () => {
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(FULL_README_MARKDOWN);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2500);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([FULL_README_MARKDOWN], {
      type: 'text/markdown;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(DEPLOY_YML_CONTENT);
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-1.5">
          <div className="text-xs font-mono text-sky-700 font-semibold">
            DESPLIEGUE ESTÁTICO · GITHUB PAGES READY
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Documentación del Proyecto, Capturas y Despliegue en GitHub Pages
          </h1>
          <p className="text-sm text-slate-600">
            El proyecto ya incluye <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">README.md</code>, capturas SVG vectoriales en <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">/public/docs/</code>, rutas relativas en <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">vite.config.ts</code> y GitHub Actions en <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">.github/workflows/deploy.yml</code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleCopyReadme}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            {copiedReadme ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>¡README.md copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar README.md</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadReadme}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Descargar README.md</span>
          </button>
        </div>
      </div>

      {/* Visual Preview of the Included Captures */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Vista Previa de Capturas Incluidas en el Repositorio
            </h2>
            <p className="text-xs text-slate-600">
              Estas 3 capturas vectoriales están guardadas en <code className="font-mono">/public/docs/</code> y enlazadas directamente en <code className="font-mono">README.md</code>.
            </p>
          </div>
          <a
            href="https://www.unfantasmaenelsistema.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-sky-700 hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>unfantasmaenelsistema.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-500">
              1. ./public/docs/captura-simulador.svg — Consola de Simulación y Visor Remoto
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
              <img
                src="./docs/captura-simulador.svg"
                alt="Captura de la consola principal del simulador Helpdesk Nivel 1"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-500">
                2. ./public/docs/captura-evaluacion.svg — Informe de Rúbrica Docente
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <img
                  src="./docs/captura-evaluacion.svg"
                  alt="Captura del informe de evaluación y rúbrica"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-500">
                3. ./public/docs/captura-manual.svg — Manual de Ofimática y Método HEARD
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <img
                  src="./docs/captura-manual.svg"
                  alt="Captura de la base de conocimiento y protocolo HEARD"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Pages Deployment Steps & Code Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <FolderGit2 className="w-5 h-5 text-sky-700" />
            <h2>Pasos para Publicar en GitHub Pages</h2>
          </div>

          <ol className="space-y-3 text-xs text-slate-700 list-decimal list-inside leading-relaxed">
            <li>
              <strong>Subir el proyecto a GitHub:</strong> Exporta o sincroniza este
              proyecto en un repositorio de tu cuenta de GitHub (rama{' '}
              <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">main</code>).
            </li>
            <li>
              <strong>Configuración Vite lista:</strong> El archivo{' '}
              <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">
                vite.config.ts
              </code>{' '}
              ya incluye <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">base: './'</code>,
              por lo que todos los enlaces, estilos y tu logo cargan sin errores en cualquier
              subcarpeta <code className="font-mono">usuario.github.io/repositorio/</code>.
            </li>
            <li>
              <strong>Activar GitHub Actions en Pages:</strong> En tu repositorio de
              GitHub, entra en <strong>Settings → Pages</strong> y en{' '}
              <strong>Build and deployment → Source</strong> selecciona{' '}
              <strong>GitHub Actions</strong>.
            </li>
            <li>
              <strong>Despliegue automático:</strong> El flujo incluido en{' '}
              <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">
                .github/workflows/deploy.yml
              </code>{' '}
              ejecutará <code className="font-mono">npm run build</code> y publicará la
              carpeta <code className="font-mono">dist/</code> automáticamente.
            </li>
          </ol>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-700">
                .github/workflows/deploy.yml
              </span>
              <button
                onClick={handleCopyWorkflow}
                className="text-xs font-medium text-sky-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedWorkflow ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar YAML</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed">
              {DEPLOY_YML_CONTENT}
            </pre>
          </div>
        </div>

        {/* Full README.md Source Preview */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <FileCode2 className="w-5 h-5 text-sky-700" />
              <h2>Código Fuente de README.md</h2>
            </div>
            <button
              onClick={handleCopyReadme}
              className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
            >
              {copiedReadme ? '¡Copiado al portapapeles!' : 'Copiar Markdown'}
            </button>
          </div>

          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[560px] overflow-y-auto">
            {FULL_README_MARKDOWN}
          </pre>
        </div>
      </div>
    </div>
  );
};
