import { boolean, index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    title: varchar('title').notNull(),
    userId: varchar('userId').notNull(),
    isArchived: boolean('isArchived').notNull().default(false),
    parentDocument: integer('parent_document'),
    content: text("content"),
    coverImage: text("cover_image"),
    icon: varchar("icon"),
    isPublished: boolean('isPublished').notNull().default(false),
    pinned: boolean("pinned").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index('by_user').on(table.userId),
    index('by_user_parent').on(table.userId, table.parentDocument),
]);