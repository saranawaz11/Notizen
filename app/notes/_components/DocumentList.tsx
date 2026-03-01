'use client'
import { notesTable } from "@/app/db/schema";
// import { NoteSelectSchemaType } from "@/app/zod-schema/note";
import { InferSelectModel } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Item from "./Item";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type NoteSelectSchemaType = InferSelectModel<typeof notesTable>

interface DocumentListProps {
    parentDocumentId?: NoteSelectSchemaType['id']
    level?: number
    data?: NoteSelectSchemaType[]
}

const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
    const params = useParams()
    const router = useRouter()
    const [notes, setNotes] = useState<NoteSelectSchemaType[]>([])
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const fetchNotes = async () => {
            const url = parentDocumentId 
                ? `/api/notes?parentDocument=${parentDocumentId}` 
                : '/api/notes'
            const res = await fetch(url)
            if (!res.ok) return;
            const data = await res.json()
            setNotes(data)
        }
        fetchNotes()
    }, [parentDocumentId])

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }))
    }

    const onRedirect = (documentId: number) => {
        router.push(`/documents/${documentId}`)
    }

    if (!notes.length) {
        return (
            <div>
                <Item.skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.skeleton level={level} />
                        <Item.skeleton level={level} />
                    </>
                )}
            </div>
        )
    }

    return (
        <>
            <p style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }}
                className={cn("hidden text-sm font-medium text-muted-foreground/80",
                    expanded && 'last:block', level === 0 && 'hidden')}>
                No pages inside
            </p>
            {notes.map((note) => (
                <div key={note.id}>
                    <Item
                        id={note.id}
                        onClick={() => onRedirect(note.id)}
                        label={note.title}
                        icon={FileIcon}
                        documentIcon={note.icon ?? undefined}
                        active={params.documentId === String(note.id)}
                        level={level}
                        onExpand={() => onExpand(String(note.id))}
                        expanded={expanded[String(note.id)]}
                    />
                    {expanded[String(note.id)] && (
                        <DocumentList parentDocumentId={note.id} level={level + 1} />
                    )}
                </div>
            ))}
        </>
    );
}

export default DocumentList;