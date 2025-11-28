import Navbar from "@/components/Navbar";
import SequenceInput from "@/components/SequenceInput";
import ModelPreview from "@/components/ModelPreview";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <section className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        <SequenceInput />
        <ModelPreview />
      </section>

      <footer className="text-center text-gray-500 py-6 text-sm">
        Proyecto académico — Inferencia bayesiana
      </footer>
    </main>
  );
}
