'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { PlusCircle } from 'lucide-react'
import { useTransition } from 'react'
import { createNote } from '../actions/notes'

const NotesPage = () => {
    const router = useRouter()
    const { user } = useUser();
    const [isPending, startTransition] = useTransition()

    const onCreate = () => {
        startTransition(() => {
            const promise = createNote('Untitled')
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
        <div className="flex space-y-4 h-full place-items-center justify-center items-center flex-col">
            <Image
                src={'/mpty.png'}
                height={'300'}
                width={'300'}
                alt="empty"
                className="dark:hidden" />
            <Image
                src={'/mpty.png'}
                height={300}
                width={300}
                alt="empty"
                className="hidden dark:block" />
            <h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s Notizen</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
    )
}
export default NotesPage
