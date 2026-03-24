'use server'
import { auth } from '@clerk/nextjs/server'
import db from '@/app/db'
import { notesTable } from '@/app/db/schema'
import { and, eq, isNull } from 'drizzle-orm'

export async function getNotes(parentDocumentId?: number) {
    const { userId } = await auth()
    if (!userId) throw new Error('Not Authenticated')

    return db
        .select()
        .from(notesTable)
        .where(
            and(
                eq(notesTable.userId, userId),
                eq(notesTable.isArchived, false),
                parentDocumentId
                    ? eq(notesTable.parentDocument, parentDocumentId)
                    : isNull(notesTable.parentDocument)
            )
        )
}