"use client";

import { notifications } from "@/components/Notifyers";
import { useAtom } from "jotai";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RegisterForm = ({ params }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = params;

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
      {/* <div className="flex gap-2">
        <div className="grid w-full items-center gap-1">
          <label htmlFor="firstName" className="mb-0 pb-0 leading-4 font-bold">
            First name:
          </label>
          <input
            className="w-full rounded-lg bg-base-100 border border-base-content p-2"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="firstName"
            type="text"
            placeholder="Jhone"
          />
        </div>
        <div className="grid w-full items-center gap-1">
          <label htmlFor="lastName" className="mb-0 pb-0 leading-4 font-bold">
            Last name:
          </label>
          <input
            className="w-full rounded-lg bg-base-100 border border-base-content p-2"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="lastName"
            type="text"
            placeholder="Doe"
          />
        </div>
      </div> */}
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
      <div className="flex flex-col w-full border-opacity-50">
        <button className="w-full bg-primary rounded p-2 text-primary-content transition-all hover:brightness-125">
          Hop In
        </button>
        <div className="divider">OR</div>
        <button
          type="button"
          onClick={() => signIn("google")}
          className="btn glass bg-[#CF2C1F] hover:bg-[#a62319] text-white"
        >
          <FontAwesomeIcon
            className="absolute left-3"
            size="lg"
            icon={faGoogle}
          />
          Google
        </button>
        <button
          type="button"
          onClick={() => signIn("facebook")}
          className="btn bg-blue-600 hover:bg-blue-500 glass mt-2 text-white"
        >
          <FontAwesomeIcon
            className="absolute left-3"
            size="lg"
            icon={faFacebook}
          />
          Facebook
        </button>
      </div>
    </form>
  );
};
