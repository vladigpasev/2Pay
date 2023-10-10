"use client";

import { RegisterForm } from "./form";
import { useAtom } from "jotai";
import { notifications } from "@/components/Notifyers";
import { useEffect } from "react";

export default function RegisterPage({ searchParams }: any) {
  const { error } = searchParams;

  const [notifyies, dispatchNotifications] = useAtom(notifications);

  const errorToMessageMapper = new Map([
    [
      "OAuthCallback",
      "This E-Mail is already in use by another provider! Try logging in with it.",
    ],
  ]);

  useEffect(() => {
    if (error)
      dispatchNotifications({
        type: "insert",
        value: {
          key: error,
          type: "error",
          message: errorToMessageMapper.has(error)
            ? errorToMessageMapper.get(error)!
            : `Something went wrong! (${error})`,
        },
      });
  }, []);

  return (
    <div className="h-[calc(100vh-90px)] w-full flex justify-center items-center">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-base-200 rounded-xl space-y-12">
        <h1 className="font-semibold text-3xl text-center">
          <strong>Sign</strong> in Account
        </h1>
        <RegisterForm params={searchParams} />
        {/* <p className="text-center">
          Have an account?{" "}
          <Link className="text-accent hover:underline" href="/auth/signin">
            Sign in
          </Link>{" "}
        </p> */}
      </div>
    </div>
  );
}
