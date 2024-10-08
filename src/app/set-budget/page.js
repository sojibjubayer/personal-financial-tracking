"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, updateGoal, deleteGoal, useInitializeState } from '@/redux/features/budgetGoalsSlice';
import { getTotalExpenses } from '@/selectors/financialSelectors';
// import { useInitializeState } from './path/to/useInitializeState'; // Import the hook

const BudgetGoals = () => {
  const [goal, setGoal] = useState('');

  const dispatch = useDispatch();
  useInitializeState(dispatch); // Initialize the state from localStorage

  const goals = useSelector((state) => state.budgetGoals);
  const totalExpenses = useSelector(getTotalExpenses);

  const handleAddGoal = () => {
    if (!goal) return;
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
    <div className="mt-4 min-h-screen w-[90%] mx-auto ">
      <h2 className="text-lg md:text-xl font-semibold text-center">Budget Goals</h2>
      <div className="mb-4  ">
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded"
          placeholder="Enter goal amount"
        />
        <div className='flex justify-center mt-3'>
        <button
          onClick={handleAddGoal}
          className="bg-green-300 text-black px-4 py-2 rounded mt-2 w-full md:w-[20%] "
        >
          Set Goal
        </button>
        </div>
      </div>
      <ul>
        {goals && goals.length > 0 ? (
          goals.map((goal) => (
            <li key={goal.id} className="mb-2 flex items-center justify-between bg-white shadow-md lg:h-14 px-2 border mt-10">
              <div>
                <span className="mr-2">Budget:  ${goal.amount.toFixed(2)}</span>
                <span className={`text-${goal.achieved ? 'green' : 'red'}-500`}>
                  {goal.achieved ? 'Achieved' : `Progress: ${calculateProgress(goal.amount).toFixed(2)}%`}
                </span>
              </div>
              <div>
              <div className='flex flex-col lg:flex-row gap-2'>
                <button
                  onClick={() => handleUpdateGoal(goal.id, !goal.achieved)}
                  className='bg-green-200 p-1 rounded-sm'
                >
                  {goal.achieved ? 'Mark as Not Achieved' : 'Mark as Achieved'}
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="bg-red-200 p-1 rounded-sm"
                >
                  Delete
                </button>
              </div>
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
