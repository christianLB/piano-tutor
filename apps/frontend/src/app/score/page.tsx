'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScorePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!containerRef.current) return
      try {
        const { OpenSheetMusicDisplay } = await import('opensheetmusicdisplay')
        const osmd = new OpenSheetMusicDisplay(containerRef.current, { autoResize: true })
        await osmd.load('/samples/example.musicxml')
        await osmd.render()
      } catch (e: any) {
        if (mounted) setError(e?.message ?? 'Error loading score')
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Score</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div ref={containerRef} className="border rounded p-4 bg-white" />
    </main>
  )
}
