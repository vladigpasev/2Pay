import { z } from "zod";
import { adminProcedure, authenticatedProcedure, t, transporter } from "./trpc";
import { db } from "@/app/_db/edgePrisma";
import { TicketType } from "@prisma/client";

export const ticketsRouter = t.router({
  buyTicket: authenticatedProcedure
    .input(
      z.object({
        eventId: z.string(),
        workshop: z.enum(["ZORATA", "THE_REVOLUTION", "LATE", "FAMILY"]),
        childTickets: z.number(),
        adultTickets: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let childrenTicketsInputData = [];
      for (let i = 0; i < input.childTickets; i++) {
        childrenTicketsInputData.push({
          eventId: input.eventId,
          workshop: input.workshop,
          type: "CHILD" as TicketType,
          userId: ctx.user?.id || "",
          price: 12,
        });
      }
      let adultTicketsInputData = [];
      for (let i = 0; i < input.adultTickets; i++) {
        adultTicketsInputData.push({
          eventId: input.eventId,
          workshop: input.workshop,
          type: "ADULT" as TicketType,
          userId: ctx.user?.id || "",
          price: 18,
        });
      }
      const ticketsChildren = childrenTicketsInputData
        ? await db.tickets.createMany({
            data: childrenTicketsInputData as any,
          })
        : undefined;
      const ticketsAdults = adultTicketsInputData
        ? await db.tickets.createMany({
            data: adultTicketsInputData as any,
          })
        : undefined;

      const event = await db.events.findUnique({
        where: {
          id: input.eventId,
        },
      });

      transporter.sendMail({
        from: "camavanphoto@gmail.com",
        to: ctx.user?.email,
        subject: `Camavan! Успешно заявихте ${
          input.childTickets + input.adultTickets
        } билета!`,
        html: `
        <h1>Успешно заявихте ${
          input.childTickets + input.adultTickets
        } билета за събитието ни в ${event?.city}!</h1>
        <p>Заплащането ще е с наложен платеж на адреса! <strong>Очаквай обаждане от екипа ни за да оточним часовете</strong></p>
        <p>Можете да прегледате закупените от Вас билети: <a href="${
          process.env.NEXT_PUBLIC_APP_URL + "/tickets"
        }">ТУК</a></p>`,
      });

      const admin = await db.user.findFirst({
        where: {
          hasRole: "ADMIN",
        },
      });

      if (!admin) return {};

      transporter.sendMail({
        from: "camavanphoto@gmail.com",
        to: admin?.email,
        subject: `Camavan! Клиент заяви ${
          input.childTickets + input.adultTickets
        } билета!`,
        html: `
        <h1>Клиент заяви ${input.childTickets} детски билета и ${
          input.adultTickets
        } билета за възрастни за събитието започващо на ${
          event?.starts_at
        } и завършващо на ${event?.ends_at} в град ${event?.city}</h1>
        <p>Контакти на клиента: <strong>Телефон: ${ctx.user?.phone} и EMail: ${
          ctx.user?.email
        }, като Името му е: ${
          ctx.user?.first_name + " " + ctx.user?.last_name
        }</strong></p>
        `,
      });

      return {};
    }),
  validateTicket: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ticket = await db.tickets.update({
        where: {
          id: input.id,
        },
        data: {
          isPaid: true,
          isUsed: true,
        },
      });
      return {};
    }),
});
