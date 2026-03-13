'use client'

import { useEffect, useState } from "react"
import { getNoteById } from "@/app/actions/getNoteById"
import Navbar from "./Navbar"
import { InferSelectModel } from "drizzle-orm"
import { notesTable } from "@/app/db/schema"

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

    useEffect(() => {
        async function fetchNote() {
            const data = await getNoteById(Number(notesId))
            setNote(data)
        }

        fetchNote()
    }, [notesId])

    return (
        <Navbar
            note={note}
            isCollapsed={isCollapsed}
            onResetWidth={onResetWidth}
        />
  )
}