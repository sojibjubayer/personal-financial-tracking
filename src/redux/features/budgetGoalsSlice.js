import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';

// Helper function to load state from localStorage
const loadState = () => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = localStorage.getItem('budgetGoals');
      return serializedState ? JSON.parse(serializedState) : [];
    } catch (err) {
      console.error("Could not load state from localStorage", err);
      return [];
    }
  }
  return []; // Return an empty array during SSR
};

// Helper function to save state to localStorage
const saveState = (state) => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('budgetGoals', serializedState);
    } catch (err) {
      console.error("Could not save state to localStorage", err);
    }
  }
};

export const budgetGoalsSlice = createSlice({
  name: 'budgetGoals',
  initialState: [],
  reducers: {
    addGoal: (state, action) => {
      state.push(action.payload);
      saveState(state);  // Save updated state to localStorage
    },
    updateGoal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(goal => goal.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
        saveState(state);  // Save updated state to localStorage
      }
    },
    deleteGoal: (state, action) => {
      const newState = state.filter(goal => goal.id !== action.payload);
      saveState(newState);  // Save updated state to localStorage
      return newState;
    },
    setInitialState: (state, action) => action.payload,
  },
});

export const { addGoal, updateGoal, deleteGoal, setInitialState } = budgetGoalsSlice.actions;

export const useInitializeState = (dispatch) => {
  useEffect(() => {
    const initialState = loadState();
    dispatch(setInitialState(initialState));
  }, [dispatch]);
};

export default budgetGoalsSlice.reducer;
