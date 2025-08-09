'use client'

import { useState } from 'react'

export default function AnalysePage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    if (!file) {
      setError('Select a MusicXML or MIDI file')
      return
    }
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await fetch(`${apiBase}/analyse`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t)
      }
      const data = await res.json()
      setResult(data)
    } catch (e: any) {
      setError(e?.message ?? 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6 space-y-4">
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
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Analysing…' : 'Analyse'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 whitespace-pre-wrap">{error}</p>}
      {result && (
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
      )}
    </main>
  )
}
