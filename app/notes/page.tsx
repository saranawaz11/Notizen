

'use client'

import { createNote } from '@/app/actions/createNote'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTransition } from 'react'

const NotesPage = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const onCreate = () => {
        startTransition(() => {
            const promise = createNote()
                .then((notesId) => {
                    router.push(`/notes/${notesId}`)
                })

            toast.promise(promise, {
                loading: 'Creating a new note...',
                success: 'New note created!',
                error: 'Failed to create a new note'
            })
        })
    }

    return (
        // <Button onClick={onCreate}>
        //     Create a note
        // </Button>

        <div>
            <h2>Notes page</h2>
        </div>
    )
}
export default NotesPage

// import React from 'react'

// export default async function page(
//     {
//         searchParams,
//     }: {
//         searchParams: Promise<{ [key: string]: string | undefined }>
//     }) {

//     try {
//         const { notesId } = await searchParams;
//         console.log('Notes id is:- ', notesId);

//         if (notesId) {
//             return(
//                 <div className='max-w-6xl bg-pink-300 mx-auto p-10'>
//                     <h2>{notesId}</h2>
//                 </div>
//             )
//         }

//     } catch (e) {
//         if (e instanceof Error) {
//             throw e
//         }
//     }
// }
