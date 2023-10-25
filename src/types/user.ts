export type AuthProviders = "google" | "facebook" | "email";

export interface BareboneUser {
  authProvider: AuthProviders;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  verificationToken: string;
}

export interface User extends BareboneUser {
  uuid: string;
}
