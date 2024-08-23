import { createSlice } from "@reduxjs/toolkit";

// Helper function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('transactions');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return [];
  }
};

// Helper function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('transactions', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: loadState(),
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload);
      saveState(state);  // Save updated state to localStorage
    },
    updateTransaction: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(transaction => transaction.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
        saveState(state);  // Save updated state to localStorage
      }
    },
    deleteTransaction: (state, action) => {
      const newState = state.filter(transaction => transaction.id !== action.payload);
      saveState(newState);  // Save updated state to localStorage
      return newState;
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
