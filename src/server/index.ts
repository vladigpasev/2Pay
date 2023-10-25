import { authenticationRouter } from './routers/authenticationRouter';
import { t } from './trpc';

export const appRouter = t.router({
  authentication: authenticationRouter
});

export type AppRouter = typeof appRouter;
