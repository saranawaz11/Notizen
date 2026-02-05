'use client'
import { Pencil, Pin, PinOff, Trash } from 'lucide-react'
import React, { useState } from 'react'

export default function Card() {
    const content = 'He left on Friday. He was not supposed to leave but he did and now I do not know.'
    const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    const [isPinned, setIsPinned] = useState(false)
    const tags = ['endregion', 'marketing', 'books', 'tags'];
    return (
        <div className='bg-amber-100 rounded shadow-xs p-4'>
            <div className='flex justify-between items-center'>
                <div className=''>
                    <p className='font-bold text-xl'>He left on Friday</p>
                    <p className='text-sm text-primary'>{formattedDate}</p>
                </div>
                <button onClick={() => setIsPinned(!isPinned)} className='hover:bg-amber-200 h-8 w-8 text-center grid place-content-center rounded-sm'>
                {isPinned ? <Pin size={18}/> : <PinOff size={18}/>}
                </button>
            </div>
            <div className="line-clamp-1 mt-2">
                <p>{content}</p>
            </div>
            <div className="flex justify-between items-center gap-4 mt-2">
                <div className='flex flex-wrap gap-2'>
                    {
                        tags.map((tag, i) => (
                            <p key={i} className='text-sm text-muted-foreground'>#{tag}</p>
                        ))
                    }
                </div>
                <div className='flex gap-3 justify-center items-center'>
                    <Pencil size={18} className='hover:text-muted-foreground'/>
                    <Trash size={18} className='hover:text-muted-foreground'/>
                </div>
            </div>
        </div>
    )
}
