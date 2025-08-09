import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900 dark:from-neutral-900 dark:to-black dark:text-neutral-100">
      {/* Header */}
      <header className="w-full border-b border-neutral-200/70 dark:border-neutral-800/70">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">Piano Tutor AI</div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link href="/score" className="hover:underline">Score</Link>
            <Link href="/analyse" className="hover:underline">Analyse</Link>
            <a href="https://github.com/christianLB/piano-tutor" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Análisis musical asistido por IA para músicos avanzados
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Carga un MusicXML o MIDI, obtén análisis armónico y melódico, y visualiza
              la partitura con resaltado interactivo. Prepara tu interpretación con feedback técnico.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/analyse"
                className="inline-flex items-center justify-center rounded-md bg-black text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Probar análisis (POC)
              </Link>
              <Link
                href="/score"
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                Ver partitura de ejemplo
              </Link>
            </div>
          </div>
          <div className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 p-4">
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Demostración</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li>• Subida de MusicXML/MIDI y validación</li>
              <li>• Almacenamiento y listado de partituras</li>
              <li>• Endpoint de análisis con FastAPI + SQLModel</li>
              <li>• Visualización con OpenSheetMusicDisplay</li>
              <li>• Preparado para feedback en tiempo real</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <h2 className="text-2xl font-semibold">Características clave</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
            <div className="text-base font-medium">Análisis armónico</div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Identificación de acordes, funciones tonales y progresiones usando modelos de análisis musical.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
            <div className="text-base font-medium">Visualización interactiva</div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Render de partitura con OSMD y resaltado de pasajes, motivos y tensiones.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5">
            <div className="text-base font-medium">Preparado para tiempo real</div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Integración futura con Web MIDI y análisis en vivo para feedback técnico.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 text-center">
          <h3 className="text-xl font-semibold">Listo para probar</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            Sube un archivo y obtén un análisis inicial. Esto es un POC funcional para el demo.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/analyse" className="rounded-md bg-black text-white px-5 py-3 text-sm font-medium hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
              Abrir Analizador
            </Link>
            <Link href="/score" className="rounded-md border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
              Ver Partitura
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200/70 dark:border-neutral-800/70">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Piano Tutor AI</span>
          <div className="flex gap-4">
            <a href="/docs/SETUP" className="hover:underline">Docs</a>
            <a href="https://github.com/christianLB/piano-tutor" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
