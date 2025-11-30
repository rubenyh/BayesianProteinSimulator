"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface Props {
  data: any;
}

export default function ModelPreview({ data }: Props) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [is3DmolReady, setIs3DmolReady] = useState(false);

  useEffect(() => {
    if (!is3DmolReady) return;
    if (!data || !data.pdb_models || data.pdb_models.length === 0) return;
    if (typeof window === "undefined") return;
    if (!viewerRef.current) return;

    const anyWindow = window as any;
    if (!anyWindow.$3Dmol) {
      console.warn("3Dmol not found on window");
      return;
    }

    const viewer = anyWindow.$3Dmol.createViewer(viewerRef.current, {
      backgroundColor: "white",
    });

    const pdbModels: string[] = data.pdb_models;

    pdbModels.forEach((pdb: string) => {
      viewer.addModel(pdb, "pdb");
    });

    viewer.setStyle({}, {
      cartoon: {
        style: "trace",
        color: "spectrum",
        ribbon: true,
        thickness: 0.6,
      },
    });

    const atoms = viewer.selectedAtoms({});
    console.log("3Dmol atoms loaded:", atoms.length);

    viewer.zoomTo();
    viewer.render();
    viewer.resize();

    return () => {
      try {
        viewer.clear();
      } catch {
        /*nada*/
      }
    };
  }, [data, is3DmolReady]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[400px]">
      <Script
        src="https://3Dmol.csb.pitt.edu/build/3Dmol-min.js"
        strategy="afterInteractive"
        onLoad={() => setIs3DmolReady(true)}
      />

      <h2 className="text-black font-semibold mb-6 text-lg w-full text-left">
        Vista previa del modelo 3D
      </h2>

      {!data ? (
        <div className="h-72 w-full border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50">
          <div className="flex gap-2 mb-3 opacity-50">
            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse delay-75"></div>
            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse delay-150"></div>
          </div>
          <p className="text-sm font-medium">El modelo aparecerá aquí</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-green-800 font-bold mb-1">
              ¡Simulación Exitosa!
            </h3>
            <p className="text-sm text-green-700">
              Secuencia:{" "}
              <span className="font-mono font-semibold">
                {data.sequence || "N/A"}
              </span>
            </p>
            <p className="text-xs text-green-700 mt-1">
              Modelos en el ensamble:{" "}
              <span className="font-mono font-semibold">
                {data.pdb_models?.length ?? 0}
              </span>
            </p>
          </div>

          <div className="w-full h-80 border border-gray-200 rounded-lg overflow-hidden">
            <div
              ref={viewerRef}
              className="w-full h-full"
              style={{ position: "relative" }}
            />
          </div>

          <p className="text-xs text-center text-gray-500 mt-2">
            Colores tipo arcoiris por residuo (como en el viewer de 3Dmol).
          </p>
        </div>
      )}
    </div>
  );
}
