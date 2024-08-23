import { useGetExchangeRatesQuery } from '@/services/exchangeApi';

const CurrencyConverter = () => {
  const { data: exchangeRates, error, isLoading } = useGetExchangeRatesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching exchange rates</p>;

  // Use exchangeRates to perform currency conversions
  console.log(exchangeRates);

  return (
    <div>
      <h2>Currency Converter</h2>
      {/* Implement conversion logic */}
    </div>
  );
};

export default CurrencyConverter;
