import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='bg-green-200 h-24 flex flex-col justify-center items-center'>
            <h3 className='text-center mb-4 font-bold'>Personal Finance Tracker</h3>
            <div className=' flex justify-center gap-20'>
                <Link href='#'>About Us</Link>
                <Link href="#">Contact Us</Link>
                <Link href="#">Privacy Policy</Link>
            </div>
        </div>
    );
};

export default Footer;