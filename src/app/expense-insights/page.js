"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getExpenseInsights } from '@/utils/expenseInsights';

const ExpenseInsights = () => {
  const [insights, setInsights] = useState(null);
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    setInsights(getExpenseInsights(transactions));
  }, [transactions]);

  if (!insights) {
    return <div>Loading insights...</div>;
  }

  return (
    <div className="min-h-screen w-[90%] mx-auto my-5">
      <h2 className="text-xl font-semibold text-center">Expense Insights</h2>
      <hr />
      <ul className="mt-5">
        {Object.entries(insights).map(([category, { totalSpent, suggestion }]) => (
          <li key={category} className="mb-4">
            <span className="font-semibold bg-stone-200 px-3 py-1 rounded-sm">{category}:</span> ${totalSpent.toFixed(2)}
            <div className={`${totalSpent > 200 ? 'text-red-500' : 'text-green-600 '}`}>
                  {suggestion}
                </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseInsights;
