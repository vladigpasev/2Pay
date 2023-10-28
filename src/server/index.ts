import { authenticationRouter } from './routers/authenticationRouter';
import { productRouter } from './routers/productRouter';
import { stripeRouter } from './routers/stripeRouter';
import { userRouter } from './routers/userRouter';
import { t } from './trpc';

export const appRouter = t.router({
  authentication: authenticationRouter,
  user: userRouter,
  stripe: stripeRouter,
  product: productRouter
});

export type AppRouter = typeof appRouter;

