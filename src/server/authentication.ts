import { z } from "zod";
import { publicProcedure, t } from "./trpc";
import db from "@/drizzle";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { AuthProviders, BareboneUser, User } from "@/types/user";
import { sendMail } from "./lib/sendMail";

import * as dotenv from "dotenv";
import { TRPCError } from "@trpc/server";
import { id } from "@/utils/id";
dotenv.config();

class AuthProvider {
  protected userData: BareboneUser | User | undefined;

  constructor(userData: BareboneUser) {
    this.userData = userData;
    this.userData.verified =
      this.userData.authProvider === "email" ? false : true;
  }

  protected async SaveData(newRecord: boolean) {
    if (newRecord) {
      let ret = undefined;
      try {
        ret = await db.insert(users).values(this.userData!);
      } catch (error: any) {
        throw error;
      }
      return ret;
    }
    return await db
      .update(users)
      .set(this.userData! as any)
      .where(eq(users.email, this.userData!.email));
  }
}

abstract class UserMethods {
  public abstract Register(): Promise<never | boolean>;
}

class EmailProvider extends AuthProvider implements UserMethods {
  public async Register() {
    try {
      await this.SaveData(true);
      const data = db
        .select()
        .from(users)
        .where(eq(users.email, this.userData!.email));
      if (!data)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      sendMail({
        body: `<p>Hello ${
          this.userData!.username
        },</p><p>Welcome to the N2D2T platform.</p><a href="${
          process.env.NEXT_PUBLIC_APP_URL
        }/auth/verify/${
          this.userData!.verificationToken
        }"><h1>Verify your E-Mail!</h1></a>`,
        subject: "Verify email of your N2D2T account",
        to: this.userData!.email,
      });

      return true;
    } catch (error: any) {
      throw error.message;
    }
  }
}

const textToProviderMapper = new Map<AuthProviders, typeof EmailProvider>([
  ["email", EmailProvider],
]);

const textToProviderIsVerifiedMapper = new Map([
  ["email", false],
  ["gmail", true],
  ["facebook", true],
]);

export const authenticationRouter = t.router({
  registerUser: publicProcedure
    .input(
      z.object({
        authProvider: z.enum(["email", "google", "facebook"]),
        username: z.string().max(50).min(5),
        email: z.string().max(70).min(5),
        password: z.string().max(30).min(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const AuthProvider = textToProviderMapper.get(input.authProvider);
      if (!AuthProvider)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      const authProvider = new AuthProvider({
        ...input,
        verificationToken: id(),
        verified: textToProviderIsVerifiedMapper.get(input.authProvider)!,
      });
      try {
        await authProvider.Register();
        return;
      } catch (error: any) {
        if (error.includes("AlreadyExists"))
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "This user already exists!",
            cause: error.message,
          });
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
          cause: error.message,
        });
      }
    }),
});
