// src/app/exchange-rates/page.js
import { store } from '@/redux/store';
import exchangeRateApi from '@/services/exchangeRateApi';
import { Provider } from 'react-redux';

// Define a function to fetch exchange rates
const fetchExchangeRates = async () => {
  const { data } = await store.dispatch(exchangeRateApi.endpoints.getExchangeRates.initiate());
  return data;
};

export default async function ExchangeRatesPage() {
  const data = await fetchExchangeRates();

  if (!data) {
    return <p>Error fetching exchange rates</p>;
  }

  return (
    <div>
      <h2>Exchange Rates</h2>
      <ul>
        {Object.keys(data.conversion_rates).map((currency) => (
          <li key={currency}>
            {currency}: {data.conversion_rates[currency]}
          </li>
        ))}
      </ul>
    </div>
  );
}
