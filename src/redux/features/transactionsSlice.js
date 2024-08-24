import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

// Helper function to load state from localStorage
const loadState = () => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = localStorage.getItem('transactions');
      return serializedState ? JSON.parse(serializedState) : [];
    } catch (err) {
      console.error("Could not load state from localStorage", err);
      return [];
    }
  }
  return [];
};

// Helper function to save state to localStorage
const saveState = (state) => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('transactions', serializedState);
    } catch (err) {
      console.error("Could not save state to localStorage", err);
    }
  }
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: [],
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
    setInitialState: (state, action) => action.payload,
  },
});

export const { addTransaction, updateTransaction, deleteTransaction, setInitialState } = transactionsSlice.actions;

export const useInitializeState = (dispatch) => {
  useEffect(() => {
    const initialState = loadState();
    dispatch(setInitialState(initialState));
  }, [dispatch]);
};

export default transactionsSlice.reducer;
