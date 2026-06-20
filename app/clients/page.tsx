export default function CustomersPage() {
  const customers = [
    { id: 1, name: "Carlos Mendoza", documentId: "72345678", loanStatus: "Al día", riskLevel: "Bajo" },
    { id: 2, name: "Lucía Ramírez", documentId: "45678912", loanStatus: "Mora (15 días)", riskLevel: "Medio" },
    { id: 3, name: "Roberto Silva", documentId: "12345678", loanStatus: "Evaluación", riskLevel: "Alto" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8">
      {/* ... (El mismo HTML de la tabla que ya tenías con los textos en español) ... */}
      {/* Solo recuerda cambiar el mapeo interno: */}
      {/* {customers.map((customer) => ( ... {customer.name} ... ))} */}
    </div>
  );
}