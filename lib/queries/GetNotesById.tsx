// lib/queries/getNoteById.ts
import db from '@/app/db'
import { notesTable } from '@/app/db/schema'
import { eq } from 'drizzle-orm'

export async function getNoteById(id: number) {
    const result = await db
        .select()
        .from(notesTable)
        .where(eq(notesTable.id, id))

    return result[0]
}
