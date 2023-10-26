import { authenticationRouter } from './routers/authenticationRouter';
import { userRouter } from './routers/userRouter';
import { t } from './trpc';

export const appRouter = t.router({
  authentication: authenticationRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter;
