"use client";

import { useState } from "react";

interface Props {
  onPredict: (sequence: string) => void;
  isLoading: boolean;
}

export default function SequenceInput({ onPredict, isLoading }: Props) {
  const [inputSequence, setInputSequence] = useState("");

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full lg:w-1/2">
      <h2 className="text-lg text-black font-bold">
        Generar modelo estructural
      </h2>
      <p className="text-sm text-secondary mb-4">
        Ingresa la secuencia de la proteína (string)
      </p>

      <textarea
        className="w-full h-64 text-black border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono uppercase"
        placeholder="M-R-G-M-L-P-L-F-E"
        value={inputSequence}
        onChange={(e) => setInputSequence(e.target.value)}
      />

      <button
        onClick={() => onPredict(inputSequence)}
        disabled={isLoading || !inputSequence}
        className={`w-full mt-4 py-2 rounded-lg transition-all text-white font-medium
          ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary shadow-md hover:shadow-lg cursor-pointer"
          }`}
      >
        {isLoading ? "Simulando..." : "Generar estructura 3D"}
      </button>
    </div>
  );
}
