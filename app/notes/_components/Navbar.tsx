import { notesTable } from '@/app/db/schema';
import { getNoteById } from '@/lib/queries/GetNotesById';
import { InferSelectModel } from 'drizzle-orm';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'

type Note = InferSelectModel<typeof notesTable>

type Props = {
    note: Note | null
    isCollapsed: boolean
    onResetWidth: () => void
}

export default function Navbar(
    { note, isCollapsed, onResetWidth }: Props
) {
    if (!note) return null
    return (
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6 text-muted-foreground" />
                )}
            </nav>


        </>
    )
}
