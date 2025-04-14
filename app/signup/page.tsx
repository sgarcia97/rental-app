"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Key } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/utils/supabase/context";

const SignUp = () => {
  const { signUp } = useAuth();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await signUp(formData);
      //alert('Success')
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col no-overflow">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex flex-col items-start">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form
                  onSubmit={handleSubmit}
                  method="POST"
                  className="space-y-6"
                >
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
                        <User
                          className="h-5 w-5 text-blue-600"
                          aria-hidden="true"
                        />
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
                        <Mail
                          className="h-5 w-5 text-blue-600"
                          aria-hidden="true"
                        />
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
                        <Lock
                          className="h-5 w-5 text-blue-600"
                          aria-hidden="true"
                        />
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
                        <Key
                          className="h-5 w-5 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="button-medium">
                      Sign Up
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="flex w-10 h-10 items-center justify-center rounded-full border border-gray-300"
                    >
                      <Image
                        src="/google-icon.svg"
                        alt="Google"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="text-sm">
                  <span className="text-gray-500">
                    Already have an account?
                  </span>{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-blue-700 hover:text-blue-600 underline"
                  >
                    Login
                  </Link>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Go to </span> <Link href="/" className="font-semibold text-blue-700 hover:text-blue-600 underline">Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-900 to-blue-700 transform rotate-6 origin-bottom-left">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
              <Image
                src="/login-illustration.svg"
                alt="Signup illustration"
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
