
export const getTotalIncome = (state) => {
    return state.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
  };
  
  export const getTotalExpenses = (state) => {
    return state.transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
  };
  
  export const getTotalSavings = (state) => {
    const totalIncome = getTotalIncome(state);
    const totalExpenses = getTotalExpenses(state);
    return totalIncome - totalExpenses;
  };
  