import { TRPCError, initTRPC } from '@trpc/server';
import { NextRequest } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';
import IUser from '@/types/User';

export interface Context {
  rawToken: string | null;
  tokenData: IUser | null;
}

export const createContext = async ({ req }: { req: NextRequest }): Promise<Context> => {
  return {
    rawToken: req.cookies.has('token') ? req.cookies.get('token')!.value : null,
    tokenData: null
  };
};

export const t = initTRPC.context<Context>().create();

export const verifyToken = (rawToken: string, options: jsonwebtoken.VerifyOptions = {}) =>
  jsonwebtoken.verify(rawToken, process.env.JWT_SECRET as string, options) as IUser;

const createVerifyTokenMiddleware =
  (options: jsonwebtoken.VerifyOptions) =>
  ({ ctx, next }: any) => {
    if (!ctx.rawToken) throw new TRPCError({ code: 'UNAUTHORIZED' });

    try {
      const data = verifyToken(ctx.rawToken, options) as IUser;
      return next({
        ctx: {
          rawToken: ctx.rawToken,
          tokenData: data
        }
      });
    } catch (error) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
  };

export const verifyTokenMiddleware = t.middleware(createVerifyTokenMiddleware({}));
export const verifyTokenIgnoreExpiredMiddleware = t.middleware(createVerifyTokenMiddleware({ ignoreExpiration: true }));

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(verifyTokenMiddleware);
export const protectedProcedureIgnoreExpired = t.procedure.use(verifyTokenIgnoreExpiredMiddleware);
