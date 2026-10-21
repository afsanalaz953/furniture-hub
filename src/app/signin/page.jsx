"use client"
import React, { useState } from 'react';
import Link from "next/link";
// import { useForm } from "react-hook-form";
import {authClient} from "@/lib/auth-client";
import { FaEnvelope, FaLock } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";

import { FcGoogle } from 'react-icons/fc';
// import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';




const SigninPage = () => {
const [loading, setLoading] = useState(false);
const [feedback, setFeedback] = useState(null); // { type: "error" | "success", text }

const onSubmit = async (e) => {
e.preventDefault();

const formData = new FormData(e.target)
const user = Object.fromEntries(formData.entries()) ;
console.log(user, 'user')

setLoading(true);
setFeedback(null);

const {data, error} = await authClient.signIn.email({
   ...user,
 callbackURL: "/",
});

console.log(data, "logindata");


console.log (error, 'error');

if (error) {
  setFeedback({ type: "error", text: error?.message || "Sign-in Failed" });
}

 if (data) {
  setFeedback({ type: "success", text: "Signin Successfull" });
 }

setLoading(false);

}

 const handleGoogleSignin = async () => {
const data = await authClient.signIn.social({
    provider: "google",
  });
console.log(data, "GOOGLEdata");
}





    return (
    <div className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-teal-100">
      {/* decorative blurred blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-emerald-300/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-teal-300/30 blur-3xl" aria-hidden="true" />

      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-14">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl shadow-emerald-200/50 backdrop-blur-sm sm:p-10">

          {/* avatar + heading */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full 
            bg-linear-to-br from-emerald-400 to-teal-500 text-3xl text-white shadow-lg shadow-emerald-300/60">
              <FaLock />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-800"> Sign in </h1>
            <p className="mt-1 text-lg text-gray-500"> Welcome to Serein.  Enter your Account </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">

            <div>
              <label htmlFor="email" className="label font-semibold text-gray-700">Email</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="input w-full ps-10 focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label font-semibold text-gray-700">Password</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                  <FaLock />
                </span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder="8 letters"
                  className="input w-full ps-10 focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            {feedback && (
              <div className={`alert text-sm ${feedback.type === "error" ? "alert-error" : "alert-success"}`} role="alert">
                {feedback.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-linear-to-r from-emerald-500 to-teal-500 font-bold text-white border-0 hover:from-emerald-600 hover:to-teal-600"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="divider text-sm text-gray-400"> or </div>

            {/* সোশ্যাল লগইন — better-auth এ socialProviders সেটআপ হলে আবার চালু করুন */}
            <div className='social flex flex-col gap-3'>
              <button
                type="button"
                onClick={handleGoogleSignin}
                className="btn border-base-300 text-lg font-bold bg-white text-gray-700 shadow-md hover:bg-gray-50"
              >
                <FcGoogle size={22} />
                Google 
              </button>

              {/* <button
                type="button"
                onClick={handleGithubSignin}
                className="btn border-base-300 bg-white text-gray-700 shadow-md hover:bg-gray-50"
              >
                <FaGithub size={22} />
                GitHub দিয়ে চালিয়ে যান
              </button> */}
            </div> 
          </form>

          <div className='mt-6 flex items-center justify-center gap-1'>
            <span className='text-base text-gray-600'> No Account? </span>
            <Link href="/signup" className="font-bold text-green-600 hover:underline"> Sign Up </Link>
          </div>
        </div>

        <div className='mt-6 flex justify-center'>
          <Link href={'/'} className="text-gray-500 hover:text-gray-700">← Back to Home</Link>
        </div>
      </div>
    </div>
    );
};

export default SigninPage;
