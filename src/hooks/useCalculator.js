import { useState, useMemo } from 'react';
import { calculateEMI } from '../utils/calculatorUtils';

export function useCalculator(initialAmount = 500000, initialRate = 10.5, initialTenure = 36) {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [tenure, setTenure] = useState(initialTenure); // in months

  const results = useMemo(() => {
    return calculateEMI(amount, rate, tenure);
  }, [amount, rate, tenure]);

  return {
    amount,
    setAmount,
    rate,
    setRate,
    tenure,
    setTenure,
    ...results,
  };
}
