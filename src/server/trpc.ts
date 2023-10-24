import { db } from "@/app/_db/prisma";
import {
  SignedInAuthObject,
  SignedOutAuthObject,
  getAuth,
} from "@clerk/nextjs/server";
import nodemailer from "nodemailer";
import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "camavanphoto@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

export const createInnerTRPCContext = ({ auth }: AuthContext) => {
  return {
    auth,
  };
};

export const createContext = async ({ req, res }: any) => {
  const { auth } = createInnerTRPCContext({ auth: getAuth(req) });
  if (!auth) return { auth: null };
  return {
    auth,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const getUserData = isAuthed.unstable_pipe(async ({ ctx, next }) => {
  return next({
    ctx: {
      auth: ctx.auth,
      user: await db.user.findUnique({
        where: {
          id: ctx.auth!.userId!,
        },
      }),
    },
  });
});

const isAdmin = getUserData.unstable_pipe(async ({ ctx, next }) => {
  if (ctx.user?.hasRole !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      auth: ctx.auth,
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const authenticatedProcedure = t.procedure.use(getUserData);
export const adminProcedure = t.procedure.use(isAdmin);
