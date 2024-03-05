import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { entity1,entity2, insertEntity1Schema, insertEntity2Schema } from "~/server/db/schema";

export const baseRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //     });
  //   }),

  getEntity1: publicProcedure.query(async ({ ctx ,input}) => {
    return  await ctx.db.select().from(entity1);
  }),
  // filterEntity1:publicProcedure.input(z.object({date:z.string()})).mutation(async ({ctx,input})=>{
  //   return await ctx.db.select().from(entity1).where(eq(entity1.startDate,input.date))
  // }),
  // filterEntity2:publicProcedure.input(z.object({interviewId:z.number()})).mutation(async ({ctx,input})=>{
  //   return await ctx.db.select().from(entity2).where(eq(entity2.interviewId,input.interviewId))
  // }),
  getEntity2: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(entity2)
  }),
  addEntity1: publicProcedure.input(insertEntity1Schema).mutation(async ({ctx,input})=>{
    return await ctx.db.insert(entity1).values({})
  }),
  addEntity2: publicProcedure.input(insertEntity2Schema).mutation(async ({ctx,input})=>{
    return await ctx.db.insert(entity2).values({})
    // .values(input)
  }),
  // deleteEntity1:publicProcedure.input(z.number()).mutation(async ({ctx,input})=>{
  //   return await ctx.db.update(entity1).set({isDeleted:true}).where(eq(entity1.id,input))
  // }),
});
