'use client'
import { InferSelectModel } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { FileIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { notesTable } from "@/app/db/schema";
import Item from "@/app/notes/_components/Item";
import { cn } from "@/lib/utils";
import { useRefresh } from "@/hooks/use-refresh";
import { useNoteTitle } from "@/hooks/use-note-title";
import { getNotes } from "@/app/actions/getNotes";

export type NoteSelectSchemaType = InferSelectModel<typeof notesTable>

type Props = {
    parentDocumentId?: NoteSelectSchemaType['id']
    level?: number
}

const NotesList = ({ parentDocumentId, level = 0 }: Props) => {
    const params = useParams()
    const router = useRouter()
    const { count } = useRefresh()
    const [notes, setNotes] = useState<NoteSelectSchemaType[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})
    const { title: globalTitle } = useNoteTitle()

    useEffect(() => {
        const fetchNotes = async () => {
            if (notes !== null) setLoading(true)
            try {
                const data = await getNotes(parentDocumentId)
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

    const onExpand = (notesId: string) => {
        setExpanded(prev => ({
            ...prev,
            [notesId]: !prev[notesId]
        }))
    }
    const onRedirect = (notesId: number) => {
        router.push(`/notes/${notesId}`)
    }

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
                        active={params.notesId === String(note.id)}
                        level={level}
                        onExpand={() => onExpand(String(note.id))}
                        expanded={expanded[String(note.id)]}
                    />

                    {expanded[String(note.id)] && (
                        <NotesList
                            parentDocumentId={note.id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </>
    )
}

export default NotesList;