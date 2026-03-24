'use server'
import { notesTable } from "@/app/db/schema"
import { eq, InferSelectModel } from "drizzle-orm"
import db from "@/app/db"

type Note = InferSelectModel<typeof notesTable>

export async function getNoteById(id: number): Promise<Note | null> {
    const note = await db.select()
        .from(notesTable)
        .where(eq(notesTable.id, id))
        .limit(1)
    return note[0] ?? null
}