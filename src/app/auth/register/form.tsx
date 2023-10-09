"use client";

import { notifications } from "@/components/Notifyers";
import { useAtom } from "jotai";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notifyies, dispatchNotifications] = useAtom(notifications);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        signIn();
      } else {
        dispatchNotifications({
          type: "insert",
          value: {
            message: (await res.json()).error,
            type: "error",
            key: "la key",
          },
        });
      }
    } catch (error: any) {
      dispatchNotifications({
        type: "insert",
        value: {
          message: error?.message,
          type: "error",
          key: "la key",
        },
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1">
        <label htmlFor="email" className="mb-0 pb-0 leading-4 font-bold">
          Email:
        </label>
        <input
          className="w-full rounded-lg bg-base-100 border border-base-content p-2"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <label htmlFor="password" className="mb-0 pb-0 leading-4 font-bold">
          Password:
        </label>
        <input
          className="w-full rounded-lg bg-base-100 border border-base-content p-2"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="Password_123"
        />
      </div>
      <div className="w-full">
        <button className="w-full bg-primary rounded p-2 text-primary-content transition-all hover:brightness-125">
          Register
        </button>
      </div>
    </form>
  );
};
