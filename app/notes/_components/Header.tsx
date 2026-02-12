'use client'

import React, { useEffect, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { NotebookText } from 'lucide-react'
import { getInitials } from '@/app/utils/helper'
import NavButtonMenu from './NavButtonMenu'
import { createNote } from '@/app/actions/createNote'
import { toast } from 'sonner'

export default function NotesHeader() {
    const { isSignedIn, user, isLoaded } = useUser()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded) return <div>Loading...</div>

    const handleCreate = () => {
        startTransition(() => {
            const promise = createNote().then((noteId) => {
                router.push(`/notes/${noteId}`)
            })

            toast.promise(promise, {
                loading: 'Creating a new note...',
                success: 'New note created!',
                error: 'Failed to create a new note'
            })
        })
    }

    return (
        <header className='drop-shadow-lg max-w-6xl mt-2 rounded bg-amber-100 mx-auto p-7 flex justify-between items-center'>
            <div>
                <Link href='/dashboard' className='text-3xl font-bold'>
                    NOTIZEN
                </Link>
            </div>

            <div className="flex gap-2 justify-center items-center text-center">

                <NavButtonMenu
                    icon={NotebookText}
                    label="Notes Menu"
                    choices={[
                        { title: 'All Notes', href: '/dashboard' },
                        { title: 'New Note', action: handleCreate },
                    ]}
                />

                <div className="initials h-12 w-12 bg-gray-300 rounded-full grid place-content-center">
                    <p className='font-semibold text-xl'>
                        {getInitials(user?.fullName || user?.username || '')}
                    </p>
                </div>

                <SignOutButton />
            </div>
        </header>
    )
}
