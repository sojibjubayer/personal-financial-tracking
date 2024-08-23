import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './features/transactionsSlice';
import categoriesReducer from './features/categoriesSlice';
import budgetGoalsReducer from './features/budgetGoalsSlice';
import exchangeApi from '@/services/exchangeApi';

export const store = configureStore({
  reducer: {
    // [exchangeApi.reducerPath]: exchangeApi.reducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    budgetGoals: budgetGoalsReducer,

  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(exchangeApi.middleware),
});
