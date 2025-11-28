export default function ModelPreview() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full lg:w-1/2 flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-4">Vista previa del modelo 3D</h2>

      <div className="h-72 w-full border rounded-lg flex items-center justify-center text-gray-500">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <div className="w-10 h-10 border-2 border-gray-300 rounded-lg"></div>
            <div className="w-10 h-10 border-2 border-gray-300 rounded-lg"></div>
          </div>
          <p className="text-sm">El modelo 3D aparecerá aquí una vez generado</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-blue-600 bg-blue-100 p-2 rounded-lg text-center">
        ⚠️ El proceso de predicción puede tomar varios minutos dependiendo de la longitud de la secuencia.
      </p>
    </div>
  );
}
