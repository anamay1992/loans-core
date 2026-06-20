export type PaymentMethod = 'french' | 'american';

export interface AmortizationRow {
  month: number;
  installment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanResult {
  regularInstallment: number;
  finalInstallment: number;
  totalPaid: number;
  netProfit: number;
  schedule: AmortizationRow[];
}

export function calculateLoan(amount: number, months: number, interestRatePercentage: number, method: PaymentMethod): LoanResult | null {
  if (amount <= 0 || months <= 0 || interestRatePercentage <= 0) return null;

  const rate = interestRatePercentage / 100;
  let schedule: AmortizationRow[] = [];
  
  if (method === 'french') {
    const fixedInstallment = amount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    let balance = amount;
    
    for (let i = 1; i <= months; i++) {
      const interest = balance * rate;
      const principal = fixedInstallment - interest;
      balance = Math.max(0, balance - principal);
      schedule.push({ month: i, installment: fixedInstallment, principal, interest, balance });
    }
    
    return {
      regularInstallment: fixedInstallment,
      finalInstallment: fixedInstallment,
      totalPaid: fixedInstallment * months,
      netProfit: (fixedInstallment * months) - amount,
      schedule
    };
  } 
  
  if (method === 'american') {
    const fixedInterest = amount * rate;
    for (let i = 1; i <= months; i++) {
      const isLastMonth = i === months;
      schedule.push({
        month: i,
        installment: isLastMonth ? fixedInterest + amount : fixedInterest,
        principal: isLastMonth ? amount : 0,
        interest: fixedInterest,
        balance: isLastMonth ? 0 : amount
      });
    }
    
    return {
      regularInstallment: fixedInterest,
      finalInstallment: fixedInterest + amount,
      totalPaid: (fixedInterest * months) + amount,
      netProfit: fixedInterest * months,
      schedule
    };
  }
  
  return null;
}