import { notesTable } from '@/app/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { MenuIcon } from 'lucide-react';
import React from 'react'
import Title from './Title';
import Publish from './Publish';
import Menu from './Menu';
import Banner from './Banner';

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
        <div>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6 text-muted-foreground" />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title initialData={note} key={note.id} />
                    <div className="flex items-center gap-x-2">
                        <Publish key={note.id} initialData={note} />
                        <Menu notesId={note.id} />
                    </div>
                </div>
            </nav>
            {note.isArchived && (
                <Banner notesId={note.id} />
            )}


        </div>
    )
}
