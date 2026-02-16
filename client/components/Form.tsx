"use client";

import { useState } from "react";

type Props = {
  onGenerated: (projectId: string) => void;
};

export default function Form({ onGenerated }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit() {
    setErr(null);

    const trimmed = prompt.trim();
    if (!trimmed) {
      setErr("Please enter a prompt.");
      return;
    }

    setLoading(true);
    try {
  const q = encodeURIComponent(prompt);
const res = await fetch(`http://localhost:8000/generate?query=${q}`, {
  method: "POST",
});


      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API failed (${res.status}). ${text}`);
      }

      const data = (await res.json());

      onGenerated(data.message);
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="h-screen w-[360px] border-r bg-white p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-black font-semibold">Website Builder</h2>
      </div>

      <label className="text-sm font-medium text-gray-700">Prompt</label>
      <textarea
        className="w-full text-black flex-1 resize-none rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
        placeholder="e.g. Generate a premium shoe website"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {err && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={loading}
        className="rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate & Preview"}
      </button>

   
    </aside>
  );
}
