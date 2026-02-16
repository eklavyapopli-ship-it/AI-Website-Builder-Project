"use client";

import { useEffect, useState } from "react";

type Props = {
  refreshKey: number; 
};

export default function Preview({ refreshKey }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // runs only on client
    const ts = Date.now();
    setPreviewUrl(`http://localhost:8000/uploads/index.html?t=${ts}`);
  }, [refreshKey]);

  return (
    <section className="h-screen flex-1 bg-gray-50 p-4">
      <div className="h-full rounded-2xl border bg-white overflow-hidden flex flex-col">
        <div className="border-b px-4 py-3 text-sm font-semibold text-black">Preview</div>

        <div className="flex-1">
          {previewUrl ? (
            <iframe
              key={previewUrl}
              title="Generated preview"
              src={previewUrl}
              className="h-full w-full"
            />
          ) : (
            <div className="h-full grid place-items-center text-sm text-gray-500">
              Generate something to preview.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
