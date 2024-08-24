"use client";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '@/redux/features/transactionsSlice';

const TransactionList = ({ setEditingTransaction }) => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  return (
    <div className="mt-4 md:w-[70%] mx-auto">
      <h2 className="md:text-xl text-lg font-semibold text-center">Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="mb-2 flex justify-between bg-white shadow-md p-1 md:h-12  flex-col md:flex-row items-center ">
            <div>
              <span className="font-semibold">{transaction.type === 'income' ? 'Income' : 'Expense'}: </span>
              ${transaction.amount.toFixed(2)} - {transaction.category}
            </div>
            <div>
              <button
                onClick={() => setEditingTransaction(transaction)}
                className="bg-blue-200 mr-2 px-1 rounded-sm"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTransaction(transaction.id))}
                className="bg-red-200  px-1 rounded-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
