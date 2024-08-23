"use client";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '@/redux/features/transactionsSlice';

const TransactionList = ({ setEditingTransaction }) => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="mb-2 flex justify-between">
            <div>
              <span className="font-semibold">{transaction.type === 'income' ? 'Income' : 'Expense'}: </span>
              ${transaction.amount} - {transaction.category}
            </div>
            <div>
              <button
                onClick={() => setEditingTransaction(transaction)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTransaction(transaction.id))}
                className="text-red-500"
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
