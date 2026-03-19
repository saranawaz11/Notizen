'use client'
import Cover from '@/app/components/Cover'
import { notesTable } from '@/app/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import React, { useMemo, useState } from 'react'
import Toolbar from './Toolbar'
import dynamic from 'next/dynamic'
import Editor from '@/app/components/Editor'
import { updateNote } from '@/app/actions/notes'

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
    const [title, setTitle] = useState(note.title)

    const Editor = useMemo(() => dynamic(() => import('@/app/components/Editor'), {
        ssr: false
    }), [])

    const onChange = (content: string) => {
        updateNote({
            id: note.id,
            content,
        });
    };

    return (
        <div className="pb-40">
            {/* <h2>Note id is: {JSON.stringify(note)}</h2> */}
            <Cover url={coverUrl} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                {/* <Toolbar initialData={note} onCoverChange={setCoverUrl} /> */}
                <Toolbar
                    initialData={{ ...note, title }}
                    onCoverChange={setCoverUrl}
                    onTitleChange={setTitle}
                />
                <Editor
                    onChange={onChange}
                    initialContent={note.content ?? ''}
                    editable={true}
                />
            </div>
        </div>
    )
}
