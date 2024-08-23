import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      // Here, action.payload.amount should already be a number
      state.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(transaction => transaction.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    deleteTransaction: (state, action) => {
      return state.filter(transaction => transaction.id !== action.payload);
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
