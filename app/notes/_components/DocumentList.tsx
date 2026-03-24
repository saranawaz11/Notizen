'use client'
import { notesTable } from "@/app/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Item from "./Item";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRefresh } from "@/hooks/use-refresh";
import { useNoteTitle } from "@/hooks/use-note-title";
import { Spinner } from "@/app/components/Spinner";

export type NoteSelectSchemaType = InferSelectModel<typeof notesTable>

interface DocumentListProps {
    parentDocumentId?: NoteSelectSchemaType['id']
    level?: number
}

const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
    const params = useParams()
    const router = useRouter()
    const { count } = useRefresh()

    const [notes, setNotes] = useState<NoteSelectSchemaType[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    const { title: globalTitle } = useNoteTitle()

    useEffect(() => {
        const fetchNotes = async () => {
            // ✅ Only show spinner if we already have data
            if (notes !== null) setLoading(true)

            try {
                const url = parentDocumentId
                    ? `/api/notes?parentDocument=${parentDocumentId}`
                    : '/api/notes'

                const res = await fetch(url)

                if (!res.ok) {
                    setNotes([])
                    return
                }

                const data = await res.json()
                setNotes(data)
            } catch (err) {
                console.error("Fetch error:", err)
                setNotes([])
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [parentDocumentId, count])

    const onExpand = (documentId: string) => {
        setExpanded(prev => ({
            ...prev,
            [documentId]: !prev[documentId]
        }))
    }

    const onRedirect = (documentId: number) => {
        router.push(`/notes/${documentId}`)
    }

    // ✅ FIRST LOAD → Skeleton (blocking)
    if (notes === null) {
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
            <p
                style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }}
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    !notes.length && "last:block",
                    level === 0 && "hidden"
                )}
            >
                No pages inside
            </p>

            {notes.map((note) => (
                <div key={note.id}>
                    <Item
                        id={note.id}
                        onClick={() => onRedirect(note.id)}
                        label={
                            params.notesId === String(note.id)
                                ? globalTitle || note.title
                                : note.title
                        }
                        icon={FileIcon}
                        documentIcon={note.icon ?? undefined}
                        active={params.documentId === String(note.id)}
                        level={level}
                        onExpand={() => onExpand(String(note.id))}
                        expanded={expanded[String(note.id)]}
                    />

                    {expanded[String(note.id)] && (
                        <DocumentList
                            parentDocumentId={note.id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </>
    )
}

export default DocumentList;