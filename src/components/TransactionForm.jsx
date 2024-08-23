"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction,updateTransaction } from '@/redux/features/transactionsSlice'; 


const TransactionForm = ({ transaction, setEditingTransaction }) => {
  const [amount, setAmount] = useState(transaction ? transaction.amount : '');
  const [category, setCategory] = useState(transaction ? transaction.category : 'Food');
  const [type, setType] = useState(transaction ? transaction.type : 'expense');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const parsedAmount = parseFloat(amount); 
    
    if (transaction) {
      dispatch(updateTransaction({ id: transaction.id, updates: { amount: parsedAmount, category, type } }));
      setEditingTransaction(null);
    } else {
      dispatch(addTransaction({ amount: parsedAmount, category, type, id: Date.now() }));
    }
    
    setAmount('');
    setCategory('Food');
    setType('expense');
  };
  

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2 className="text-xl font-semibold text-center mt-5 text-zinc-700">{transaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <hr />
      <div className="my-4">
        <label className="block text-gray-700">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded"
        >
          <option>Salary</option>
          <option>Food</option>
          <option>Rent</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
      </div>
     
      <button
        type="submit"
        className="bg-green-300 hover:bg-green-500 hover:text-white px-4 py-2 rounded  w-full md:w-[20%] flex mx-auto justify-center"
      >
        {transaction ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;
