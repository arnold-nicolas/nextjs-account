'use client';

import SubmitButton from "@/app/ui/button";
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { createAccount, State } from "@/app/lib/user";
import { useActionState } from "react";

export function LoginForm() {
    return (
        <form>
            <div className="relative mb-6">
                <input
                    type="email"
                    name="email"
                    id="floating_email_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[#1a202c] text-sm text-heading bg-transparent rounded-md border border-solid border-[#d1d5db] border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                    placeholder=" "
                    required />
                <label htmlFor="floating_email_outlined" className="inline-flex items-center absolute text-[#718096] text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    <EnvelopeIcon className="h-4 w-4 me-1.5" />
                    Email Address
                </label>
            </div>
            <div className="relative mb-6">
                <input
                    type="password"
                    name="password"
                    id="floating_passwd_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[#1a202c] text-sm text-heading bg-transparent rounded-md border border-solid border-[#d1d5db] border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                    placeholder="*********"
                    required />
                <label htmlFor="floating_passwd_outlined" className="inline-flex items-center absolute text-[#718096] text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Password
                </label>
            </div>
            <SubmitButton type="submit">Sign In</SubmitButton>
        </form>
    );
}

export function SignUpForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createAccount, initialState);
     return (
        <form action={formAction}>
            <div className="relative mb-2">
                <input
                    type="text"
                    name="fullname"
                    id="floating_name_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[#1a202c] text-sm text-heading bg-transparent rounded-md border border-solid border-[#d1d5db] border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                    placeholder=" "
                    aria-describedby="user-error" />
                <label htmlFor="floating_name_outlined" className="inline-flex items-center absolute text-[#718096] text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Name
                </label>
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
                {state.errors?.fullname &&
                 state.errors.fullname.map((error:string) => (
                    <p className="text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
            </div>
            <div className="relative mb-2 mt-4">
                <input
                    type="email"
                    name="email"
                    id="floating_email_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[#1a202c] text-sm text-heading bg-transparent rounded-md border border-solid border-[#d1d5db] border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                    placeholder=" "
                    aria-describedby="user-error" />
                <label htmlFor="floating_email_outlined" className="inline-flex items-center absolute text-[#718096] text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    <EnvelopeIcon className="h-4 w-4 me-1.5" />
                    Email Address
                </label>
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                 state.errors.email.map((error:string) => (
                    <p className="text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
            </div>
            <div className="relative mb-2 mt-4">
                <input
                    type="password"
                    name="password"
                    id="floating_passwd_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[#1a202c] text-sm text-heading bg-transparent rounded-md border border-solid border-[#d1d5db] border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                    placeholder="*********"
                    aria-describedby="user-error" />
                <label htmlFor="floating_passwd_outlined" className="inline-flex items-center absolute text-[#718096] text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Password
                </label>
            </div>
            <div id="user-error" aria-live="polite" aria-atomic="true">
                {state.errors?.password &&
                 state.errors.password.map((error:string) => (
                    <p className="text-sm text-red-500" key={error}>
                        {error}
                    </p>
                 ))}
            </div>
            <p className='mt-2 text-sm text-red-500' key={state.message}>{state.message}</p>
            <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
    );
}