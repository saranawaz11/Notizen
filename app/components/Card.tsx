'use client'

import { Pencil, Pin, PinOff, Trash } from 'lucide-react'
import React, { useState } from 'react'
import EditModal from './EditModal'
import { GetNotesType } from '@/lib/queries/GetNotes'
import { useRouter } from 'next/navigation'

type Props = {
    data: GetNotesType[number]
}

export default function Card(
    { data }: Props
) {
    const content =
        'He left on Friday. He was not supposed to leave but he did and now I do not know.'

    const formattedDate = data.updatedAt
        ? new Date(data.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        })
        : 'No date';


    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isPinned, setIsPinned] = useState(data.pinned)

    const tags = ['endregion', 'marketing', 'books', 'tags']

    const router = useRouter()

    return (
        <>
            <div onClick={() => {
                router.push(`/notes/${data.id}`)
            }} className="bg-amber-100 hover:bg-amber-200 rounded hover:shadow-lg p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-xl">{data.title}</p>
                        <p className="text-sm text-primary">{formattedDate}</p>
                    </div>

                    <button
                        onClick={() => setIsPinned(!isPinned)}
                        className="hover:bg-amber-200 h-8 w-8 grid place-content-center rounded-sm"
                    >
                        {isPinned ? <Pin size={18} className='hover:scale-120 transition-transform duration-300 cursor-pointer' /> : <PinOff size={18} className='hover:scale-120 transition-transform duration-300 cursor-pointer' />}
                    </button>
                </div>

                <div className="line-clamp-1 mt-2">
                    <p>{data.content}</p>
                </div>

                <div className="flex justify-between items-center gap-4 mt-2">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <p key={i} className="text-sm text-muted-foreground">
                                #{tag}
                            </p>
                        ))}
                    </div>

                    <div className="flex gap-3 items-center">
                        <button onClick={() => setModalIsOpen(true)}>
                            <Pencil size={18} className="hover:text-muted-foreground" />
                        </button>
                        <Trash size={18} className="hover:text-muted-foreground" />
                    </div>
                </div>
            </div>

            {/* Modal */}
            <EditModal
                modalIsOpen={modalIsOpen}
                closeModal={() => setModalIsOpen(false)}
            />
        </>
    )
}
