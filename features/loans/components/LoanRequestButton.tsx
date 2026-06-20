'use client';

export default function LoanRequestButton() {
  const handleProcessClick = () => {
    alert("Starting loan request!");
  };

  return (
    <button 
      onClick={handleProcessClick} 
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
    >
      Request Loan
    </button>
  );
}