'use client'
import Cover from '@/app/components/Cover'
import { notesTable } from '@/app/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import React, { useState } from 'react'
import Toolbar from './Toolbar'

type Note = InferSelectModel<typeof notesTable>
type Props = {
    note: Note
}

export default function NoteContent(
    { note }: Props
) {
    const [coverUrl, setCoverUrl] = useState<string | undefined>(
        note.coverImage || undefined
    );
    return (
        <div className="pb-40">
            {/* <h2>Note id is: {JSON.stringify(note)}</h2> */}
            <Cover url={coverUrl} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={note} onCoverChange={setCoverUrl}/>
                {/* <Editor
                        onChange={onChange}
                        initialContent={document.content}
                        editable={true}
                    /> */}
            </div>
        </div>
    )
}
