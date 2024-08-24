// Fetch from localStorage
export const fetchTransactionsFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const transactions = localStorage.getItem('transactions');
        console.log(transactions)
        return transactions ? JSON.parse(transactions) : [];
      } catch (err) {
        console.error("Could not load transactions from localStorage", err);
        return [];
      }
    }
    return [];
  };
  