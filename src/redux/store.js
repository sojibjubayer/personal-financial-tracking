import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './features/transactionsSlice';
import categoriesReducer from './features/categoriesSlice';
import budgetGoalsReducer from './features/budgetGoalsSlice';
import exchangeRateApi from '@/services/exchangeRateApi';

export const store = configureStore({
  reducer: {
    
    transactions: transactionsReducer,
    categories: categoriesReducer,
    budgetGoals: budgetGoalsReducer,
    [exchangeRateApi.reducerPath]: exchangeRateApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exchangeRateApi.middleware),
});
