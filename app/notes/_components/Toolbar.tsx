'use client'

import { updateNote } from '@/app/actions/notes'
import IconPicker from '@/app/components/IconPicker'
import { notesTable } from '@/app/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { useState } from 'react'

type Note = InferSelectModel<typeof notesTable>

type Props = {
    initialData: Note,
    preview?: boolean
}

export default function Toolbar({ initialData, preview }: Props) {

    const [icon, setIcon] = useState(initialData.icon);

    const onIconSelect = async (newIcon: string) => {
        setIcon(newIcon);

        try {
            await updateNote({
                id: initialData.id,
                icon: newIcon
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="pl-[24px] group relative">
            {!!icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {icon}
                        </p>
                    </IconPicker>
                </div>
            )}
        </div>
    )
}