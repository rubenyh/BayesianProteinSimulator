export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-600">BioPredict</h1>
      <div className="flex gap-6 text-gray-700">
        <a href="#" className="hover:text-blue-600">Inicio</a>
        <a href="#" className="hover:text-blue-600">Acerca de</a>
        <a href="#" className="hover:text-blue-600">Ayuda</a>
      </div>
    </nav>
  );
}
