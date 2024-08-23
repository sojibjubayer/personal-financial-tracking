// utils/expenseInsights.js
export const getExpenseInsights = (transactions) => {
    const categories = ['Food', 'Rent', 'Entertainment', 'Other'];
    const insights = {};
  
    categories.forEach((category) => {
      const totalSpent = transactions
        .filter((transaction) => transaction.type === 'expense' && transaction.category === category)
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
      insights[category] = totalSpent;
    });
  
    const highSpendingThreshold = 100; // Example threshold
    const highSpendingCategories = Object.keys(insights).filter(
      (category) => insights[category] > highSpendingThreshold
    );
  
    return {
      insights,
      highSpendingCategories,
    };
  };
  