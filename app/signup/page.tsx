// import React from 'react';
 
// const SignUp: React.FC = () => {
//   return (
// <div className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden">
// <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center z-10">
// <h2 className="text-2xl text-gray-800 mb-6">Sign Up</h2>
// <div className="mb-4 relative text-left">
// <input
//             type="text"
//             placeholder="Full name"
//             className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
// <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">👤</span>
// </div>
// <div className="mb-4 relative text-left">
// <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
// <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">📧</span>
// </div>
// <div className="mb-4 relative text-left">
// <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
// <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">🔒</span>
// </div>
// <div className="mb-4 relative text-left">
// <input
//             type="password"
//             placeholder="Re-type password"
//             className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
// <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">🔑</span>
// </div>
// <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4">
//           Sign Up
// </button>
// <div className="text-gray-600 mb-4">or</div>
// <button className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center">
// <span className="mr-2">🌐</span> Continue with Google
// </button>
// <p className="text-sm text-gray-600 mt-4">
//           Already a member?{' '}
// <a href="/login" className="text-blue-500 hover:underline">
//             Login
// </a>
// </p>
// </div>
// <div className="absolute right-12 top-1/2 transform -translate-y-1/2">


// </div>
// </div>
//   );
// };
 
// export default SignUp;

import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Key } from "lucide-react";
import Image from "next/image";

const SignUp: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex flex-col items-start">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <div className="relative mt-2">
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        autoComplete="name"
                        required
                        className="pl-10 pr-3"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        required
                        className="pl-10 pr-3"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="relative mt-2">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        required
                        className="pl-10 pr-3"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="relative mt-2">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-type Password"
                        autoComplete="new-password"
                        required
                        className="pl-10 pr-3"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Key className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                      Sign Up
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    
                    <button
                      type="button"
                      className="flex w-10 h-10 items-center justify-center rounded-full border border-gray-300"
                    >
                      <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="text-sm">
                  <span className="text-gray-500">Already have an account?</span>{" "}
                  <Link href="/login" className="font-semibold text-blue-700 hover:text-blue-600 underline">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-900 to-blue-700 transform rotate-6 origin-bottom-left">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
              <Image src="/login-illustration.svg" alt="Signup illustration" width={120} height={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;