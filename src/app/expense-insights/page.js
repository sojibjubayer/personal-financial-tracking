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
    return <div className="min-h-screen"><span className="loading loading-ring loading-md"></span></div>;
  }

  return (
    <div className="min-h-screen w-[90%] mx-auto my-5">
      <h2 className="text-xl font-semibold text-center">Expense Insights</h2>
      <hr />
      <ul className="mt-5">
        {Object.entries(insights).map(([category, { totalSpent, suggestion }]) => (
          <li key={category} className="mb-4">
           <div className="flex gap-2">
           <p className="font-semibold bg-red-100 shadow-sm   px-3 py-1 rounded-sm w-[120px]" >{category}</p> 
           <p>${totalSpent.toFixed(2)}</p>
           </div>
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
