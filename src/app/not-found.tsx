"use client";

import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/images/notFound.png"
            className="max-w-sm rounded-lg shadow-2xl w-full"
          />
          <div>
            <h1 className="text-5xl font-bold text-base-content">
              Page not found!
            </h1>
            <p className="py-6 text-base-content">
              This page does not exist. Check if the URL address is written
              correctly. This error might be due to us moving some things
              around. If your still aren't sure what to do you can contact us at
              andr.nikola.08@gmail.com
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                router.back();
              }}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
