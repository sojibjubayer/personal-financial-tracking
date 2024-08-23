
// export const getExpenseInsights = (transactions) => {
//     const categories = ['Food', 'Rent', 'Entertainment', 'Other'];
//     const insights = {};
  
//     categories.forEach((category) => {
//       const totalSpent = transactions
//         .filter((transaction) => transaction.type === 'expense' && transaction.category === category)
//         .reduce((total, transaction) => total + transaction.amount, 0);
//       insights[category] = totalSpent;
//     });
  
//     return insights;
//   };
  
// utils/expenseInsights.js
export const getExpenseInsights = (transactions) => {
    const categories = ['Food', 'Rent', 'Entertainment', 'Other'];
    const insights = {};
    const spendingThreshold = 100; // Set a threshold for high spending
  
    categories.forEach((category) => {
      const totalSpent = transactions
        .filter((transaction) => transaction.type === 'expense' && transaction.category === category)
        .reduce((total, transaction) => total + Number(transaction.amount), 0);
      insights[category] = {
        totalSpent,
        suggestion: totalSpent > spendingThreshold
          ? `Consider reducing your spending on ${category}. You have spent more than ${spendingThreshold} this month.`
          : `Your spending on ${category} is within a reasonable range.`,
      };
    });
  
    return insights;
  };
  