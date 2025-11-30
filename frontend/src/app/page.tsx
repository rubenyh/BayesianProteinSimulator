"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SequenceInput from "@/components/SequenceInput";
import ModelPreview from "@/components/ModelPreview";
import { predictStructure } from "@/lib/api";

export default function Page() {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (sequence: string) => {
    setLoading(true);
    setPrediction(null);
    try {
      const result = await predictStructure(sequence);
      setPrediction(result);
    } catch (error) {
      console.error(error);
      alert("Error conectando al backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        <SequenceInput onPredict={handlePredict} isLoading={loading} />

        <ModelPreview data={prediction} />
      </section>
    </main>
  );
}
