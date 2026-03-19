'use client'

import { useEffect, useState } from "react"
import { getNoteById } from "@/app/actions/getNoteById"
import Navbar from "./Navbar"
import { InferSelectModel } from "drizzle-orm"
import { notesTable } from "@/app/db/schema"
import { useRefresh } from "@/hooks/use-refresh"
import { useNoteTitle } from "@/hooks/use-note-title"

type Note = InferSelectModel<typeof notesTable>

type Props = {
    notesId: string
    isCollapsed: boolean
    onResetWidth: () => void
}

export default function NavbarWrapper({
    notesId,
    isCollapsed,
    onResetWidth
}: Props) {

    const [note, setNote] = useState<Note | null>(null)
    const { count } = useRefresh()
    const { setTitle } = useNoteTitle()

    useEffect(() => {
        async function fetchNote() {
            const data = await getNoteById(Number(notesId))
            setNote(data)
            if (data) setTitle(data.title)
        }
        fetchNote()
    }, [notesId, count])
    return (
        <Navbar
            note={note}
            isCollapsed={isCollapsed}
            onResetWidth={onResetWidth}
        />
  )
}