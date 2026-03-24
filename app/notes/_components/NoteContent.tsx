'use client'
import Cover from '@/app/components/Cover'
import { notesTable } from '@/app/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { useState } from 'react'
import Toolbar from './Toolbar'
import dynamic from 'next/dynamic'
import { updateNote } from '@/app/actions/notes'

const Editor = dynamic(() => import('@/app/components/Editor'), { ssr: false })

type Note = InferSelectModel<typeof notesTable>

export default function NoteContent({ note }: { note: Note }) {
    const [coverUrl, setCoverUrl] = useState<string | undefined>(note.coverImage || undefined)
    const [title, setTitle] = useState(note.title)

    const onChange = (content: string) => {
        updateNote({ id: note.id, content })
    }

    return (
        <div className="pb-40">
            <Cover url={coverUrl} onCoverChange={setCoverUrl} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
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