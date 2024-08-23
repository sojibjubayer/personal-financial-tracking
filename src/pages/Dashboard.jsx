"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import BudgetGoals from "../components/BudgetGoals";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList";
import { getExpenseInsights } from '@/utils/expenseInsights';
import {
  getTotalIncome,
  getTotalExpenses,
  getTotalSavings,
} from "../selectors/financialSelectors";

const Dashboard = () => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showTransactionList, setShowTransactionList] = useState(false);
  const [showExpenseInsights, setShowExpenseInsights] = useState(false);

  const totalIncome = useSelector(getTotalIncome);
  const totalExpenses = useSelector(getTotalExpenses);
  const totalSavings = useSelector(getTotalSavings);

  const transactions = useSelector((state) => state.transactions);
  const insights = getExpenseInsights(transactions);

  const categories = ["Salary", "Food", "Rent", "Entertainment", "Other"];

  const initialCategoryTotals = categories.reduce(
    (acc, category) => ({
      ...acc,
      spending: { ...acc.spending, [category]: 0 },
      income: { ...acc.income, [category]: 0 },
    }),
    { spending: {}, income: {} }
  );

  const { spending, income } = transactions.reduce(
    (totals, transaction) => {
      const { category, type, amount } = transaction;
      if (type === "expense") {
        totals.spending[category] = (totals.spending[category] || 0) + amount;
      } else if (type === "income") {
        totals.income[category] = (totals.income[category] || 0) + amount;
      }
      return totals;
    },
    initialCategoryTotals
  );

  const chartData = {
    labels: categories,
    spendingValues: categories.map((category) => spending[category] || 0),
    incomeValues: categories.map((category) => income[category] || 0),
  };

  const handleToggleTransactionList = () => {
    setShowTransactionList((prev) => !prev);
  };

  const handleToggleExpenseInsights = () => {
    setShowExpenseInsights((prev) => !prev);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      <hr />
      <div className="flex flex-col md:flex-row gap-20">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div className="bg-white p-4 rounded shadow-md w-full">
              <h2 className="text-xl">Total Income</h2>
              <p className="text-2xl font-semibold">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl">Total Expenses</h2>
              <p className="text-2xl font-semibold">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl">Total Savings</h2>
              <p className="text-2xl font-semibold">${totalSavings.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Chart data={chartData} />
        </div>
      </div>
      <TransactionForm
        transaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />
      <button
        onClick={handleToggleTransactionList}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {showTransactionList ? 'Hide Transactions' : 'Show Transactions'}
      </button>
      {showTransactionList && (
        <TransactionList setEditingTransaction={setEditingTransaction} />
      )}
      <BudgetGoals />
      <button
        onClick={handleToggleExpenseInsights}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {showExpenseInsights ? 'Hide Expense Insights' : 'Show Expense Insights'}
      </button>
      {showExpenseInsights && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Expense Insights</h2>
          <ul>
            {Object.entries(insights).map(([category, { totalSpent, suggestion }]) => (
              <li key={category} className="mb-2">
                <span className="font-semibold">{category}:</span> ${totalSpent.toFixed(2)}
                <div className="text-gray-600">{suggestion}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
