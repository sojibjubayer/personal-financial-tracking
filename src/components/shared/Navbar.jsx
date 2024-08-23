import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='bg-green-200 flex flex-col md:flex-row justify-between items-center px-4 py-2 font-semibold'>
            <div className='bg-green-500 p-2 rounded-md text-white hidden md:flex'>PFT</div>
            <div>
                Personal Finance TRacker
            </div>
            <div className='mt-4 md:mt-0'>
                <button className='btn bg-red-200 p-2 rounded-md px-4 text-black hover:bg-red-300'>Login</button>
            </div>
        </div>
    );
};

export default Navbar;
