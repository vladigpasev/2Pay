import { eventsRouter } from "./events";
import { ticketsRouter } from "./tickets";
import { t } from "./trpc";
import { userRouter } from "./user";

export const appRouter = t.router({
  user: userRouter,
  events: eventsRouter,
  tickets: ticketsRouter,
});

export type AppRouter = typeof appRouter;
