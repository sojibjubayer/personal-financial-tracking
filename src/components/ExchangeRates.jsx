"use client"
import { useGetExchangeRatesQuery } from '@/services/exchangeRateApi';
import React from 'react';

const ExchangeRate = () => {
  const { data, error, isLoading } = useGetExchangeRatesQuery();


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching exchange rates: {error.message}</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h2>Exchange Rates</h2>
      <ul>
        {data.conversion_rates ? (
          Object.keys(data.conversion_rates).map((currency) => (
            <li key={currency}>
              {currency}: {data.conversion_rates[currency]}
            </li>
          ))
        ) : (
          <p>No conversion rates available</p>
        )}
      </ul>
    </div>
  );
};

export default ExchangeRate;
