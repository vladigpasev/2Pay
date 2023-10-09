"use client";
import { atom, useAtom } from "jotai";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const themeAtom = atom("forest");

const LightDarkThemeSwitch = () => {
  const [theme, settheme] = useAtom(themeAtom);

  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("theme", e.target.checked ? "garden" : "forest");
    settheme(e.target.checked ? "garden" : "forest");
  };

  (useState as any)(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("theme"))
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? localStorage.setItem("theme", "forest")
          : localStorage.setItem("theme", "garden");
      settheme(localStorage.getItem("theme") || "forest");
    }
  }, []);

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "garden"}
      />

      <svg
        className="swap-on fill-current w-6 h-6 max-sm:w-5 max-sm:h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      <svg
        className="swap-off fill-current w-6 h-6 max-sm:w-5 max-sm:h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  );
};

export const Header = () => {
  return (
    <div className="navbar text-neutral-content top-0 sticky bg-[hsl(var(--nf)/0.65)] shadow-md shadow-[hsl(var(--b2)/0.25)] backdrop-blur-md z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl text-secondary max-sm:-ml-5"
        >
          <img
            className="h-7 sm:h-9"
            src="/images/branding/icon.png"
            alt="DoNuts"
          />
          Do<strong className="text-primary p-0 -ml-1.5">Nuts</strong>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 text-base-content">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex align-middle gap-1">
        <LightDarkThemeSwitch />
        <Link
          href="/api/auth/signin"
          className="btn btn-ghost ml-1 max-sm:ml-0 max-sm:p-1"
        >
          Sign In
        </Link>
        <Link href="/api/auth/signin" className="btn btn-secondary max-sm:p-2">
          Register
        </Link>
      </div>
    </div>
  );
};
