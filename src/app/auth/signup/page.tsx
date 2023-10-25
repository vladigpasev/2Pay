"use client";

import { useRedirectPath } from "@/hooks/useRedirectPath";
import AuthPage from "@/components/auth/AuthPage";
import { AuthProvider } from "@/auth/provider";
import { useRegister } from "@/auth/register";
import { Field } from "@/components/Form";
import { useCallback } from "react";

const REGISTER_FIELDS: Field<string>[] = [
  {
    id: "username",
    name: "Username",
    type: "text",
    placeholder: "Username",
    validate: (value) =>
      value.trim().length > 5 ? null : "Username is too short!",
  },
  {
    id: "email",
    name: "Email",
    type: "email",
    placeholder: "you@email.com",
    validate: (value) =>
      value.trim().length > 5 ? null : "Email is too short!",
  },
  {
    id: "password",
    name: "Password",
    type: "password",
    placeholder: "Password",
    validate: (value) =>
      value.trim().length > 5 ? null : "Password is too short!",
  },
];

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const redirectUrl = useRedirectPath() ?? "/";
  const register = useRegister();

  const onRegister = useCallback((formData: RegisterFormData) => {
    register(
      {
        provider: AuthProvider.Email,
        data: formData,
      },
      redirectUrl
    );
  }, []);

  return (
    <AuthPage
      titleHtml="<strong>Create</strong> an Account"
      fields={REGISTER_FIELDS}
      buttonText="Sign Up"
      onSubmit={onRegister}
    />
  );
}
