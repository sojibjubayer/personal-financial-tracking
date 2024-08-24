
import React, { useState } from 'react';
import { useCurrencyConverter } from '@/utils/currencyConversion';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const { convertCurrency, isLoading, error } = useCurrencyConverter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert amount to base currency (USD in this case)
    const convertedAmount = convertCurrency(Number(amount), currency, 'USD');
    
    // Handle the form submission
    console.log('Converted Amount($):', convertedAmount);
  };

  if (isLoading) return <p>Loading exchange rates...</p>;
  if (error) return <p>Error fetching exchange rates</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {/* Add more currencies as needed */}
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="AED">AED</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CurrencyConverter;
