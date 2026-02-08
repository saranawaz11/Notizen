import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    title: varchar('title').notNull(),
    content: text("content").notNull(),
    pinned: boolean("pinned").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date())
});
