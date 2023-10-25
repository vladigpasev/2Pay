import { authenticationRouter } from './authentication';
import { t } from './trpc';

export const appRouter = t.router({
  authentication: authenticationRouter
});

export type AppRouter = typeof appRouter;
