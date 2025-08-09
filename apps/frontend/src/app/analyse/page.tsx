'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AnalysePage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [scoreFileUrl, setScoreFileUrl] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setScoreFileUrl(null)
    if (!file) {
      setError('Select a MusicXML or MIDI file')
      return
    }
    try {
      setLoading(true)
      setError(null)
      setInfo(null)
      const form = new FormData()
      form.append('file', file)
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await fetch(`${apiBase}/analyse`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) {
        let message = await res.text()
        try {
          const j = JSON.parse(message)
          message = j.detail || message
        } catch {}
        throw new Error(message)
      }
      const data = await res.json()
      setResult(data)
      setInfo('Analysis complete. You can open the score detail or view it directly.')
      // Fetch filename for viewer link
      if (data?.score_id) {
        try {
          const r2 = await fetch(`${apiBase}/scores/${data.score_id}`)
          if (r2.ok) {
            const d2 = await r2.json()
            const fname = d2?.score?.filename
            if (fname) setScoreFileUrl(`${apiBase}/files/${encodeURIComponent(fname)}`)
          }
        } catch {}
      }
    } catch (e: any) {
      setError(e?.message ?? 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analyse</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="file"
          accept=".xml,.musicxml,.mid,.midi,application/vnd.recordare.musicxml"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <div>
          <button
            type="submit"
            disabled={loading || !file}
            className={`px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 ${loading ? 'animate-pulse' : ''}`}
          >
            {loading ? 'Analysing…' : 'Analyse'}
          </button>
        </div>
      </form>
      {info && (
        <div className="border border-green-200 bg-green-50 text-green-900 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-200 rounded p-3 text-sm">
          {info}
        </div>
      )}
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-900 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-200 rounded p-3 whitespace-pre-wrap text-sm">
          {error}
        </div>
      )}
      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="text-sm text-neutral-500">Key</div>
            <div className="mt-1 text-lg font-medium">{result.key || '—'}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="text-sm text-neutral-500">Time Signature</div>
            <div className="mt-1 text-lg font-medium">{result.time_signature || '—'}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="text-sm text-neutral-500">Measures</div>
            <div className="mt-1 text-lg font-medium">{result.measures}</div>
          </div>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="text-sm text-neutral-500">Notes</div>
            <div className="mt-1 text-lg font-medium">{result.notes}</div>
          </div>
        </div>
      )}
      {result && (
        <div className="space-x-4">
          <Link href="/scores" className="underline">View all scores</Link>
          {result.score_id && (
            <Link href={`/scores/${result.score_id}`} className="underline">Open score detail</Link>
          )}
          {scoreFileUrl && (
            <Link href={`/score?file=${encodeURIComponent(scoreFileUrl)}`} className="underline">Open in Viewer</Link>
          )}
        </div>
      )}
    </main>
  )
}
