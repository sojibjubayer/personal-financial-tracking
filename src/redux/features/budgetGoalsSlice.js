import { createSlice } from '@reduxjs/toolkit';

// Helper function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('budgetGoals');
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
    localStorage.setItem('budgetGoals', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

export const budgetGoalsSlice = createSlice({
  name: 'budgetGoals',
  initialState: loadState(),
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
  },
});

export const { addGoal, updateGoal, deleteGoal } = budgetGoalsSlice.actions;
export default budgetGoalsSlice.reducer;
