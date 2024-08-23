import React from 'react';
import { useGetExchangeRatesQuery } from '@/services/exchangeApi'; // Adjust path as necessary

const ExchangeRates = () => {
  const { data, error, isLoading } = useGetExchangeRatesQuery('USD');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Exchange Rates</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExchangeRates;
