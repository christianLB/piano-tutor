"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Score = {
  id: number;
  title?: string | null;
  filename: string;
  created_at: string;
};

type Analyse = {
  key?: string | null;
  time_signature?: string | null;
  measures: number;
  notes: number;
  score_id?: number | null;
  analysis_id?: number | null;
};

type ScoreDetail = {
  score: Score;
  analysis?: Analyse | null;
};

export default function ScoreDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [data, setData] = useState<ScoreDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${apiBase}/scores/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e?.message ?? "Failed to load score"))
      .finally(() => setLoading(false));
  }, [id]);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const fileUrl = data ? `${apiBase}/files/${encodeURIComponent(data.score.filename)}` : "#";

  return (
    <main className="mx-auto max-w-3xl px-6 py-8 space-y-4">
      <Link href="/scores" className="text-sm underline">← Back to Scores</Link>
      <h1 className="text-2xl font-bold">Score Detail</h1>
      {loading && <p className="text-sm text-neutral-500">Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <div className="space-y-4">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="text-sm text-neutral-500">Score</div>
            <div className="mt-2 text-sm">
              <div><span className="font-medium">ID:</span> {data.score.id}</div>
              <div><span className="font-medium">Title:</span> {data.score.title || "Untitled"}</div>
              <div><span className="font-medium">Filename:</span> {data.score.filename}</div>
              <div><span className="font-medium">Created:</span> {new Date(data.score.created_at).toLocaleString()}</div>
            </div>
            <div className="mt-3">
              <a href={fileUrl} className="underline" target="_blank" rel="noreferrer">Download / Open File</a>
              {fileUrl && (
                <>
                  <span className="mx-2 text-neutral-400">•</span>
                  <a href={`/score?file=${encodeURIComponent(fileUrl)}`} className="underline">Open in Viewer</a>
                </>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="text-sm text-neutral-500">Latest Analysis</div>
            {data.analysis ? (
              <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                <div><span className="font-medium">Key:</span> {data.analysis.key || "—"}</div>
                <div><span className="font-medium">Time Sig:</span> {data.analysis.time_signature || "—"}</div>
                <div><span className="font-medium">Measures:</span> {data.analysis.measures}</div>
                <div><span className="font-medium">Notes:</span> {data.analysis.notes}</div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-neutral-500">No analysis found.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
