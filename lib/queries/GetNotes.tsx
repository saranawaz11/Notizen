import db from '@/app/db'
import { notesTable } from '@/app/db/schema'
import React from 'react'

export async function getNotes() {
    const results = await db.select({
        id: notesTable.id,
        ticketDate: notesTable.createdAt,
        title: notesTable.title,
        content: notesTable.content,
        pinned: notesTable.pinned,
        updatedAt: notesTable.updatedAt
    }).from(notesTable)
    return results;
}

export type GetNotesType = Awaited<ReturnType<typeof getNotes>>
