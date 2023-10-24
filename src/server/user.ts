import { authenticatedProcedure, t } from "./trpc";

export const userRouter = t.router({
  readUser: authenticatedProcedure.query((opts) => {
    return {
      user: opts.ctx.user,
    };
  }),
});
