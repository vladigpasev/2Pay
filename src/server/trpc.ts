import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import jsonwebtoken from 'jsonwebtoken';

interface TokenData {
  uuid: string;
  email: string;
  password: string;
}

interface Context {
  rawToken: string | null;
  tokenData: TokenData | null;
}

export const createContext = async ({ req }: any): Promise<Context> => {
  const cookies = req.cookies._parsed;
  return {
    rawToken: cookies.has('token') ? cookies.get('token').value : null,
    tokenData: null
  };
};

export const t = initTRPC.context<Context>().create();

const createVerifyTokenMiddleware =
  (options: jsonwebtoken.VerifyOptions) =>
  ({ ctx, next }: any) => {
    if (!ctx.rawToken) throw new TRPCError({ code: 'UNAUTHORIZED' });

    try {
      const data = jsonwebtoken.verify(ctx.rawToken, process.env.JWT_SECRET as string, options) as TokenData;
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

export const verifyToken = t.middleware(createVerifyTokenMiddleware({}));
export const verifyTokenIgnoreExpired = t.middleware(createVerifyTokenMiddleware({ ignoreExpiration: true }));

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(verifyToken);
export const protectedProcedureIgnoreExpired = t.procedure.use(verifyTokenIgnoreExpired);
