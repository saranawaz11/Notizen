import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { notesTable } from '../db/schema';

export const noteInsertSchema = createInsertSchema(notesTable, {
    title: (schema) => schema.min(1, 'Title is required'),
    content: (schema) => schema.min(1, 'Content is required'),
});

export const noteSelectSchema = createSelectSchema(notesTable);

export type NoteInsertSchemaType = z.infer<typeof noteInsertSchema>;
export type NoteSelectSchemaType = z.infer<typeof noteSelectSchema>;
