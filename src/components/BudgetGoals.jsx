"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, updateGoal, deleteGoal } from '@/redux/features/budgetGoalsSlice';
import { getTotalExpenses } from '@/selectors/financialSelectors';

const BudgetGoals = () => {
  const [goal, setGoal] = useState('');
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.budgetGoals); // Ensure this path matches your store structure
  const totalExpenses = useSelector(getTotalExpenses);

  const handleAddGoal = () => {
    if (!goal) return; // Prevent adding empty goals
    dispatch(addGoal({ id: Date.now(), amount: parseFloat(goal), achieved: false }));
    setGoal('');
  };

  const handleUpdateGoal = (id, achieved) => {
    dispatch(updateGoal({ id, updates: { achieved } }));
  };

  const handleDeleteGoal = (id) => {
    dispatch(deleteGoal(id));
  };

  const calculateProgress = (goalAmount) => {
    return goalAmount > 0 ? Math.min((totalExpenses / goalAmount) * 100, 100) : 0;
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Budget Goals</h2>
      <div className="mb-4">
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded"
          placeholder="Enter goal amount"
        />
        <button
          onClick={handleAddGoal}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Goal
        </button>
      </div>
      <ul>
        {goals && goals.length > 0 ? (
          goals.map((goal) => (
            <li key={goal.id} className="mb-2 flex items-center justify-between">
              <div>
                <span className="mr-2">${goal.amount.toFixed(2)}</span>
                <span
                  className={`text-${goal.achieved ? 'green' : 'red'}-500`}
                >
                  {goal.achieved ? 'Achieved' : `Progress: ${calculateProgress(goal.amount).toFixed(2)}%`}
                </span>
              </div>
              <div>
                <button
                  onClick={() => handleUpdateGoal(goal.id, !goal.achieved)}
                  className={`text-${goal.achieved ? 'gray' : 'blue'}-500 ml-2`}
                >
                  {goal.achieved ? 'Mark as Not Achieved' : 'Mark as Achieved'}
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-red-500 ml-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No goals set</li>
        )}
      </ul>
    </div>
  );
};

export default BudgetGoals;
