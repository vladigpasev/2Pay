import { authenticationRouter } from './routers/authenticationRouter';
import { coinbaseRouter } from './routers/coinbaseRouter';
import { productRouter } from './routers/productRouter';
import { companyRouter } from './routers/companyRouter';
import { stripeRouter } from './routers/stripeRouter';
import { userRouter } from './routers/userRouter';
import { t } from './trpc';
import { transactionRouter } from './routers/transactionRouter';

export const appRouter = t.router({
  authentication: authenticationRouter,
  user: userRouter,
  stripe: stripeRouter,
  product: productRouter,
  company: companyRouter,
  coinbase: coinbaseRouter,
  transaction: transactionRouter
});

export type AppRouter = typeof appRouter;
