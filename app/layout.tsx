import type { Metadata } from "next";
import Link from "next/link"; 
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de Gestión de Préstamos",
  description: "Plataforma administrativa para evaluación de créditos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen flex flex-col font-sans">
        
        {/* BARRA DE NAVEGACIÓN SUPERIOR */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              {/* Logo / Isotipo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight mr-8">
                  Prestamos<span className="text-blue-600">Core</span>
                </span>
              </div>

              {/* ENLACES DE NAVEGACIÓN (Ruta en inglés, texto en español) */}
              <div className="flex-grow flex gap-6">
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Simulador
                </Link>
                {/* Aquí cambiamos el href a /clients */}
                <Link href="/clients" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Clientes
                </Link>
              </div>

              {/* Perfil del Administrador */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-700">Angel Namay</p>
                  <p className="text-xs text-gray-500 font-medium">Administrador</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold">
                  AN
                </div>
              </div>

            </div>
          </div>
        </nav>

        {/* CONTENIDO DINÁMICO */}
        {/* Aquí Next.js inyectará automáticamente page.tsx o clients/page.tsx */}
        <main className="flex-grow">
          {children}
        </main>

        {/* PIE DE PÁGINA */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            © 2026 PrestamosCore - Plataforma de evaluación financiera.
          </div>
        </footer>

      </body>
    </html>
  );
}