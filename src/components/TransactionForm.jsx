"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction, useInitializeState } from '@/redux/features/transactionsSlice'; 
import { useCurrencyConverter } from '@/utils/currencyConversion';

const TransactionForm = ({ transaction, setEditingTransaction }) => {
  const [amount, setAmount] = useState(transaction ? transaction.amount : '');
  const [category, setCategory] = useState(transaction ? transaction.category : 'Food');
  const [type, setType] = useState(transaction ? transaction.type : 'expense');
  const [currency, setCurrency] = useState(transaction ? transaction.currency : 'USD');
  const dispatch = useDispatch();


  useInitializeState(dispatch);

  // Access categories from Redux store
  const categories = useSelector(state => state.categories);

  // Currency conversion
  const { convertCurrency, isLoading, error } = useCurrencyConverter();
  const convertedAmount = currency !== 'USD' ? convertCurrency(parseFloat(amount), currency, 'USD') : parseFloat(amount);

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setType(transaction.type);
      setCurrency(transaction.currency || 'USD'); 
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(convertedAmount);

    if (transaction) {
      dispatch(updateTransaction({ 
        id: transaction.id, 
        updates: { amount: parsedAmount, category, type, currency }
      }));
      setEditingTransaction(null);
    } else {
      dispatch(addTransaction({ 
        amount: parsedAmount, 
        category, 
        type, 
        id: Date.now(), 
        currency 
      }));
    }



    // Reset form fields
    setAmount('');
    setCategory('Food');
    setType('expense');
    setCurrency('USD');
  };

  if (isLoading) return <p>Loading exchange rates...</p>;
  if (error) return <p>Error fetching exchange rates</p>;

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-xl font-semibold text-center mt-5 text-zinc-700">
        {transaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
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
        <label className="block text-gray-700">Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
          <option value="AED">AED</option>
        </select>
      </div>
      <div className="mb-4 flex gap-1 items-center">
        <label className="block text-gray-700">Amount in USD:</label>
        <p className='bg-white shadow-md px-2 py-1 rounded-md'>
          {currency !== 'USD' && convertedAmount ? convertedAmount.toFixed(2) : amount ? amount : ''}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-300 hover:bg-green-500 hover:text-white px-4 py-2 rounded  w-full md:w-[40%] lg:w-[20%] flex mx-auto justify-center"
      >
        {transaction ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;
