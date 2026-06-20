'use client'; 
import { useState } from 'react';
import { calculateLoan, type PaymentMethod } from '../services/loanCalculator';

export default function LoanSimulator() {
  const [amount, setAmount] = useState(1000); 
  const [months, setMonths] = useState(12);
  const [interestRate, setInterestRate] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('french');

  const result = calculateLoan(amount, months, interestRate, paymentMethod);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-100 font-sans">
      
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Simulador de Préstamos
        </h1>
        <p className="text-gray-500 mt-2">Calcula proyecciones, cuotas y rentabilidad al instante.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Monto (S/)</label>
          <input 
            type="number" 
            value={amount || ''}
            onChange={(e) => setAmount(e.target.valueAsNumber || 0)}
            className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 font-medium"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Plazo (Meses)</label>
          <input 
            type="number" 
            value={months || ''}
            onChange={(e) => setMonths(e.target.valueAsNumber || 0)}
            className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 font-medium"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Interés Mensual (%)</label>
          <input 
            type="number"
            value={interestRate || ''}
            onChange={(e) => setInterestRate(e.target.valueAsNumber || 0)}
            className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 font-medium"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">Modalidad</label>
          <select 
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 font-medium cursor-pointer"
          >
            <option value="french">Sistema Francés</option>
            <option value="american">Sistema Americano</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-8 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Cuota Regular</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">S/ {result.regularInstallment.toFixed(2)}</p>
              {paymentMethod === 'american' && (
                <p className="text-xs text-blue-700 mt-2 font-medium">Solo interés. Cuota final: S/ {result.finalInstallment.toFixed(2)}</p>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total a Recibir</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">S/ {result.totalPaid.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium">Capital + Intereses</p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Tu Ganancia Neta</p>
              <p className="text-3xl font-bold text-emerald-700 mt-2">S/ {result.netProfit.toFixed(2)}</p>
              <p className="text-xs text-emerald-600 mt-2 font-medium">Rendimiento total de la operación</p>
            </div>

          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mes</th>
                  <th className="px-6 py-4 font-semibold">Cuota</th>
                  <th className="px-6 py-4 font-semibold">Capital</th>
                  <th className="px-6 py-4 font-semibold text-emerald-400">Interés (Ganancia)</th>
                  <th className="px-6 py-4 font-semibold">Saldo Restante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {result.schedule.map((row, index) => (
                  <tr key={row.month} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-blue-50 transition-colors'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.month}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">S/ {row.installment.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-600">S/ {row.principal.toFixed(2)}</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">S/ {row.interest.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-600">S/ {row.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}