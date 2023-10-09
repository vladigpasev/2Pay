import Link from "next/link";
import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <div className="h-[calc(100vh-90px)] w-full flex justify-center items-center">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-base-200 rounded-xl space-y-12">
        <h1 className="font-semibold text-3xl text-center">
          <strong>Create</strong> an Account
        </h1>
        <RegisterForm />
        <p className="text-center">
          Have an account?{" "}
          <Link className="text-accent hover:underline" href="/auth/signin">
            Sign in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
