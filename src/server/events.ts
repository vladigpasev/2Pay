import { z } from "zod";
import { adminProcedure, publicProcedure, t } from "./trpc";
import { db } from "@/app/_db/edgePrisma";
import { utapi } from "uploadthing/server";

export const eventsRouter = t.router({
  createEvent: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        starts_at: z.string(),
        ends_at: z.null().or(z.string()),
        city: z.string(),
        address: z.string(),
        coords: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = await db.events.create({
        data: {
          ...input,
        },
      });
      return {};
    }),
  deleteEvent: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = await db.events.delete({
        where: {
          id: input.id,
        },
      });
      return {};
    }),
  eventsHistory: publicProcedure.query(async () => {
    return { events: await db.events.findMany() };
  }),
  saveToGallery: adminProcedure
    .input(z.object({ url: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.events.update({
        where: {
          id: input.id,
        },
        data: {
          gallery: {
            push: input.url,
          },
        },
      });
      return {};
    }),
  deleteFromGallery: adminProcedure
    .input(z.object({ url: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await utapi.deleteFiles(input.url.split("|")[1]);
      const event = await db.events.findUnique({
        where: { id: input.id },
        select: { gallery: true },
      });
      await db.events.update({
        where: {
          id: input.id,
        },
        data: {
          gallery: {
            set: event?.gallery?.filter((x) => x !== input.url),
          },
        },
      });
      return {};
    }),
  getEvent: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return {
        event: await db.events.findUnique({
          where: { id: input.id },
        }),
      };
    }),
});
