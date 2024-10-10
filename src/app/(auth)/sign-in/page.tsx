"use client";
import MyButton from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const SignIn = () => {
  const { data, status } = useSession();

  if (status && data) redirect("/");

  return (
    <div className="flex w-full h-screen items-center justify-center ">
      <div className="flex flex-col rounded-lg  space-y-3 bg-rangoon-green-50 w-11/12 md:w-[500px] h-[300px] text-gray-500 text-sm text-center py-10 px-16">
        <h1 className=" text-text font-bold">Sign in to kodocs</h1>
        <p className="">Welcome back! please sign in to continue</p>
        <div className="flex flex-1 items-center">
          <MyButton
            className="w-full py-3"
            name="Continue With Google"
            onClick={() => signIn("google")}
          />
        </div>

        <p>Dont have any account? Sign up</p>
      </div>
    </div>
  );
};

export default SignIn;
