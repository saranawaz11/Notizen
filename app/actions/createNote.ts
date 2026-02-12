'use server'

import db from '@/app/db'
import { notesTable } from '@/app/db/schema'

export async function createNote() {
    const result = await db
        .insert(notesTable)
        .values({
            title: 'Untitled',
            content: '',
        })
        .returning({ id: notesTable.id })

    return result[0].id
}
