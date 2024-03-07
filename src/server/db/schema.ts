// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3app_${name}`);

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt"),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// )

export const entity1 = createTable("entity1",{
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  surname: varchar("surname", { length: 256 }),
  birthyear: varchar("birthyear"),
})

export const entity2 = createTable("entity2",{
  id: serial("id").primaryKey(),
  entity1Id: integer("interview_id").references(() => entity1.id),
  name: varchar("name", { length: 256 }),
  number: varchar("number", { length: 256 }),
  type: varchar("type", { length: 256 }),
})

export type Entity1 = typeof entity1.$inferSelect
export type Entity2 = typeof entity2.$inferSelect

export const insertEntity1Schema = createInsertSchema(entity1);
export const insertEntity2Schema = createInsertSchema(entity2);