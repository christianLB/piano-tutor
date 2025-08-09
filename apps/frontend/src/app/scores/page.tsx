"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Score = {
  id: number;
  title?: string | null;
  filename: string;
  created_at: string;
};

export default function ScoresPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${apiBase}/scores`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(setScores)
      .catch((e) => setError(e?.message ?? "Failed to load scores"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="text-2xl font-bold">Scores</h1>
      {loading && <p className="mt-4 text-sm text-neutral-500">Loading…</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border border-neutral-200 dark:border-neutral-800">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th className="text-left p-2 border-b border-neutral-200 dark:border-neutral-800">ID</th>
                <th className="text-left p-2 border-b border-neutral-200 dark:border-neutral-800">Title</th>
                <th className="text-left p-2 border-b border-neutral-200 dark:border-neutral-800">Filename</th>
                <th className="text-left p-2 border-b border-neutral-200 dark:border-neutral-800">Created</th>
                <th className="text-left p-2 border-b border-neutral-200 dark:border-neutral-800">Action</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s) => (
                <tr key={s.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
                  <td className="p-2">{s.id}</td>
                  <td className="p-2">{s.title || "Untitled"}</td>
                  <td className="p-2">{s.filename}</td>
                  <td className="p-2">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="p-2">
                    <Link href={`/scores/${s.id}`} className="underline">View</Link>
                  </td>
                </tr>
              ))}
              {scores.length === 0 && (
                <tr>
                  <td className="p-2" colSpan={5}>No scores yet. Try uploading one in Analyse.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
