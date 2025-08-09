'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function ScoreInner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const params = useSearchParams()
  const fileParam = params?.get('file') || '/samples/example.musicxml'
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let mounted = true
    let osmd: any
    async function load() {
      if (!containerRef.current) return
      try {
        const { OpenSheetMusicDisplay } = await import('opensheetmusicdisplay')
        osmd = new OpenSheetMusicDisplay(containerRef.current, { autoResize: true })
        await osmd.load(fileParam)
        await osmd.render()
      } catch (e: any) {
        if (mounted) setError(e?.message ?? 'Error loading score')
      }
    }
    load()
    return () => {
      mounted = false
      try { osmd?.clear() } catch {}
    }
  }, [fileParam, reloadKey])

  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">Score</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 break-all">Source: {fileParam}</p>
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-900 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-200 rounded p-3 text-sm flex items-start justify-between gap-4">
          <span className="whitespace-pre-wrap">{error}</span>
          <button onClick={() => { setError(null); setReloadKey((k)=>k+1) }} className="px-3 py-1 bg-red-600 text-white rounded text-xs">Retry</button>
        </div>
      )}
      <div ref={containerRef} className="border rounded p-4 bg-white" />
    </main>
  )
}

export default function ScorePage() {
  return (
    <Suspense fallback={<main className="p-6"><p className="text-sm text-neutral-600">Loading…</p></main>}>
      <ScoreInner />
    </Suspense>
  )
}
