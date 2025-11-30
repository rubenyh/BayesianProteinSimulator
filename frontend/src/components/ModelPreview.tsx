interface Props {
  data: any; // Aquí llegarán los datos del backend
}

export default function ModelPreview({ data }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[400px]">
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
        <div className="w-full h-full flex flex-col gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-green-800 font-bold mb-1">
              ¡Simulación Exitosa!
            </h3>
            <p className="text-sm text-green-700">
              Probabilidad Posterior:{" "}
              <span className="font-mono font-bold">
                {data.conformations?.[0]?.posterior || "N/A"}
              </span>
            </p>
          </div>

          <div className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-auto h-64 text-xs font-mono shadow-inner">
            <p className="text-gray-400 mb-2">
              // Coordenadas generadas (Backend):
            </p>
            <pre>
              {JSON.stringify(data.conformations?.[0]?.coords, null, 2)}
            </pre>
          </div>

          <p className="text-xs text-center text-gray-500 mt-2"></p>
        </div>
      )}
    </div>
  );
}
