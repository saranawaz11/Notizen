'use server'
import { eq } from 'drizzle-orm';
import { auth, currentUser } from '@clerk/nextjs/server';
import db from '../db';
import { notesTable } from '../db/schema';

export async function archiveNote(id: number) {
    const { userId } = await auth();
    if (!userId) throw new Error('Not Authenticated');

    await db.update(notesTable)
        .set({ isArchived: true })
        .where(eq(notesTable.id, id));
}

export async function createNote(title: string, parentDocument?: number) {
    const { userId } = await auth();
    if (!userId) throw new Error('Not Authenticated');

    const [note] = await db.insert(notesTable)
        .values({
            title,
            parentDocument: parentDocument ?? null,
            userId,
            isArchived: false,
        })
        .returning();

    return note.id;
}