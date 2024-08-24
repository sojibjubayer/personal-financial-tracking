// src/services/exchangeRateApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const exchangeRateApi = createApi({
  reducerPath: 'exchangeRateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v6.exchangerate-api.com/v6/' }),
  endpoints: (builder) => ({
    getExchangeRates: builder.query({
      query: () => `${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/USD`,
    }),
  }),
});

export const { useGetExchangeRatesQuery } = exchangeRateApi;
export default exchangeRateApi;
