"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import Chart from "../components/Chart";
import TransactionList from "../components/TransactionList";
import { getExpenseInsights } from '@/utils/expenseInsights';
import {
  getTotalIncome,
  getTotalExpenses,
  getTotalSavings,
} from "../selectors/financialSelectors";

const Dashboard = () => {
  // Load saved states from localStorage
  const [editingTransaction, setEditingTransaction] = useState(() => {
    const savedTransaction = localStorage.getItem("editingTransaction");
    return savedTransaction ? JSON.parse(savedTransaction) : null;
  });
  const [showTransactionList, setShowTransactionList] = useState(() => {
    return JSON.parse(localStorage.getItem("showTransactionList")) || false;
  });
  const [showExpenseInsights, setShowExpenseInsights] = useState(() => {
    return JSON.parse(localStorage.getItem("showExpenseInsights")) || false;
  });

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


  return (
    <div className="p-4">
      <h1 className="md:text-2xl  text-xl font-bold text-center">Dashboard</h1>
      <hr />
      <div className="flex flex-col md:flex-row md:gap-20 gap-5 mt-5">
        <div className="flex-1">
          <h3 className="text-base md:text-xl font-semibold mb-4 text-center">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div className="bg-white p-2 md:p-4 rounded border shadow-md w-full text-center">
              <h2 className="text-xl">Total Income</h2>
              <p className="md:text-2xl text-base  font-semibold">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded border shadow-md w-full text-center">
              <h2 className="text-xl">Total Expenses</h2>
              <p className="md:text-2xl text-base font-semibold">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded border shadow-md w-full text-center">
              <h2 className="text-xl">Total Savings</h2>
              <p className="md:text-2xl text-base font-semibold">${totalSavings.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className=" flex-1   chart-height">
          <Chart data={chartData} />
        </div>
      </div>
      <TransactionForm
        transaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />
      <button
        onClick={handleToggleTransactionList}
        className="bg-violet-300 hover:bg-violet-500 hover:text-white  px-4 py-2 rounded mt-4  w-full md:w-[20%] flex mx-auto justify-center"
      >
        {showTransactionList ? 'Hide Transactions List' : 'See Transactions List'}
      </button>
      {showTransactionList && (
        <TransactionList setEditingTransaction={setEditingTransaction} />
      )}
      
      
    </div>
  );
};

export default Dashboard;
