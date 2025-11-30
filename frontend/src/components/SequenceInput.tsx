export default function SequenceInput() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full lg:w-1/2">
      <h2 className="text-lg font-semibold mb-3">Generar modelo estructural</h2>
      <p className="text-sm text-gray-600 mb-4">Ingresa la secuencia de la proteína (string)</p>

      <textarea
        className="w-full h-60 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="MKTAYIAKQRQ..."
      />

      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all">
        ⚡ Generar estructura 3D
      </button>
    </div>
  );
}
