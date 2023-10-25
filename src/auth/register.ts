import { AuthProvider } from "./provider";
import { useCallback } from "react";

interface OAuthProviderRegisterOptions {
  provider: AuthProvider.Google | AuthProvider.Facebook;
}

interface EmailProviderRegisterOptions {
  provider: AuthProvider.Email;
  data: {
    username: string;
    email: string;
    password: string;
  };
}

type ProviderRegisterOptions =
  | OAuthProviderRegisterOptions
  | EmailProviderRegisterOptions;

export function useRegister() {
  return useCallback(
    (registerOptions: ProviderRegisterOptions, redirectUrl: string) => {
      console.log(registerOptions, redirectUrl);
    },
    []
  );
}
