import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='bg-green-200 flex flex-col md:flex-row justify-between items-center px-4 py-2 font-semibold '>
            <div className='bg-green-500 p-2 rounded-md text-white hidden md:flex h-full'>PFT</div>
            <div>
                {/* Personal Finance Tracker */}
                <ul className='flex  md:flex-row gap-5 md:gap-20'>
                    <li><Link href="/" className='border border-white px-2 py-1 rounded-md hover:bg-white '>Dashboard</Link></li>
                    <li><Link href="/set-budget" className='border border-white px-2 py-1 rounded-md hover:bg-white '>Set Goal</Link></li>
                    <li><Link href="/expense-insights" className='border border-white px-2 py-1 rounded-md hover:bg-white '>Expense Insights</Link></li>
                    
                </ul>
            </div>
            <div className='mt-4 md:mt-0'>
                <button className='btn btn-sm md:btn-md border-2 border-white bg-green-200 p-2 rounded-md px-4 text-black hover:bg-red-300'>Login</button>
            </div>
        </div>
    );
};

export default Navbar;
