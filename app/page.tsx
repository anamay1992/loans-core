// app/page.tsx
import LoanSimulator from "@/features/loans/components/LoanSimulator";

export default function Home() {
  return (
    // bg-gray-100 pinta el fondo de toda la página de un gris claro muy elegante
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      
      {/* Aquí llamamos a tu componente profesional */}
      <LoanSimulator />
      
    </main>
  );
}