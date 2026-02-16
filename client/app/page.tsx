"use client";
import { useState } from "react";
import Form from "@/components/Form";
import Preview from "@/components/Preview";

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="flex">
      <Form onGenerated={() => setRefreshKey((k) => k + 1)} />
      <Preview refreshKey={refreshKey} />
    </main>
  );
}
