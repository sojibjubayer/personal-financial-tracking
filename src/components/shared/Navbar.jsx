import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoMenu, IoCloseCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  // Handle click outside of the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <div className="hidden md:flex bg-green-200  flex-col md:flex-row justify-between items-center px-4 py-2 font-semibold ">
        <div className="bg-green-500 p-2 rounded-md text-white hidden md:flex h-full">
          PFT
        </div>
        <div>
          <ul className="flex  md:flex-row flex-col justify-center items-center gap-5 md:gap-20">
            <li>
              <Link
                href="/"
                className="border border-white px-2 py-1 rounded-md hover:bg-white "
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/set-budget"
                className="border border-white px-2 py-1 rounded-md hover:bg-white "
              >
                Set Budget
              </Link>
            </li>
            <li>
              <Link
                href="/expense-insights"
                className="border border-white px-2 py-1 rounded-md hover:bg-white "
              >
                Expense Insights
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-sm  border-2 border-white bg-green-200 p-2 rounded-md px-4 text-black hover:bg-red-300">
            Login
          </button>
        </div>
      </div>







      <div>
        <div className="md:hidden ">
       
        
          <div className="bg-green-200 flex  items-center text-center">
          <div
            onClick={() => setOpen(!open)}
            className="lg:hidden btn btn-ghost "
          >
            {open ? (
              <IoCloseCircleSharp className="text-2xl" />
            ) : (
              <IoMenu className="text-2xl" />
            )}
          </div>
          <Link href="/" className="ml-2 text-base  font-bold">Personal Finance Tracker</Link>
          </div>
        
          

          <ul ref={menuRef}
            className={` ${
              open ? "top-12 -left-1" : "top-12 -left-60"
            } duration-1000 absolute     text-black menu-sm
           ml-2 z-[1] p-2  bg-green-200 space-y-5 w-44 py-4 rounded-sm border border-green-500`}
          >
                  <li>
              <Link
                href="/"
                className="border border-white px-2 py-1 rounded-md hover:bg-white "
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/set-budget"
                className="border border-white px-2 py-1 rounded-md hover:bg-white "
              >
                Set Budget
              </Link>
            </li>
            <li>
              <Link
                href="/expense-insights"
                className="border border-white px-2 py-1 rounded-md hover:bg-white "
              >
                Expense Insights
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="border border-white px-2 py-1 rounded-md hover:bg-white "
              >
                Login
              </Link>
            </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
