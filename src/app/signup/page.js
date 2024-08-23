"use client";

import Link from "next/link";
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter();
    const notify = (message) => toast(message);

    const handleSignUp = async (event) => {
        event.preventDefault();
        
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        if (password.length < 6) {
            notify('Password must be at least 6 characters long');
            return;
        }
        
        const newUser = {
            name,
            email,
            password,
            role: 'user'
        };
        
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "content-type": "application/json",
                },
            });
            
            if (resp.status === 200) {
                notify('Successfully Signed Up');
                event.target.reset();
                router.push('/login');
            } else {
                notify('Sign Up Failed');
            }
        } catch (error) {
            notify('An error occurred during sign up');
        }
    };

    return (
        <div className=" md:px-24 mx-auto py-5">
            <div>
                <div className="border-2 p-5 md:w-[40%] w-[95%] mx-auto">
                    <h6 className="md:text-3xl text-xl font-semibold text-fuchsia-600 text-center mb-12">
                        Sign Up
                    </h6>
                    <form onSubmit={handleSignUp} action="">
                        <label htmlFor="name">Name</label> <br />
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="mt-3 w-full input input-bordered"
                            required
                        />
                        <br /> <br />
                        <label htmlFor="email">Email</label> <br />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="mt-3 w-full input input-bordered"
                            required
                        />
                        <br /> <br />
                        <label htmlFor="password">Password</label> <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="w-full mt-3 input input-bordered"
                            required
                        />
                        <br />
                        <button
                            type="submit"
                            className="w-full btn text-white bg-fuchsia-400 mt-12 text-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                   
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default SignUp;
