import { createSlice } from '@reduxjs/toolkit';

export const budgetGoalsSlice = createSlice({
  name: 'budgetGoals',
  initialState: [],
  reducers: {
    addGoal: (state, action) => {
      state.push(action.payload);
    },
    updateGoal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(goal => goal.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    deleteGoal: (state, action) => {
      return state.filter(goal => goal.id !== action.payload);
    },
  },
});

export const { addGoal, updateGoal, deleteGoal } = budgetGoalsSlice.actions;
export default budgetGoalsSlice.reducer;
