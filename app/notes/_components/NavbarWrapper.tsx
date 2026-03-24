'use client'
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import { getNoteById } from "@/app/actions/getNoteById"
import { notesTable } from "@/app/db/schema"
import { InferSelectModel } from "drizzle-orm"

type Note = InferSelectModel<typeof notesTable>

type Props = {
    notesId: string
    isCollapsed: boolean
    onResetWidth: () => void
}

export default function NavbarWrapper({ notesId, isCollapsed, onResetWidth }: Props) {
    const [note, setNote] = useState<Note | null>(null)

    useEffect(() => {
        getNoteById(Number(notesId)).then(setNote)
    }, [notesId])

    if (!note) return null

    return (
        <Navbar
            note={note}
            isCollapsed={isCollapsed}
            onResetWidth={onResetWidth}
        />
    )
}