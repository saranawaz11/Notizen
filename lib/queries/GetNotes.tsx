// import db from '@/app/db'
// import { notesTable } from '@/app/db/schema'
// import React from 'react'

import db from "@/app/db";
import { notesTable } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

// export async function getNotes() {
//     const results = await db.select({
//         id: notesTable.id,
//         ticketDate: notesTable.createdAt,
//         title: notesTable.title,
//         content: notesTable.content,
//         pinned: notesTable.pinned,
//         updatedAt: notesTable.updatedAt
//     }).from(notesTable)
//     return results;
// }

export async function getNotes(parentDocument?: number) {
    const { userId } = await auth();
    if (!userId) throw new Error('Not Authenticated');

    const notes = await db
        .select()
        .from(notesTable)
        .where(
            parentDocument !== undefined
                ? and(
                    eq(notesTable.userId, userId),
                    eq(notesTable.parentDocument, parentDocument),
                    eq(notesTable.isArchived, false)
                )
                : and(
                    eq(notesTable.userId, userId),
                    eq(notesTable.isArchived, false)
                )
        );

    return notes;
}

export type GetNotesType = Awaited<ReturnType<typeof getNotes>>
