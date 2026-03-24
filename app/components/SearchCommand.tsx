'use client'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useUser } from '@clerk/nextjs'
import { InferSelectModel } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { notesTable } from '../db/schema'
import { File } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getSearch } from '../actions/notes'
import { Spinner } from '@/components/ui/spinner'

type Note = InferSelectModel<typeof notesTable>


type Props = {
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
}


export default function SearchCommand(
    { isOpen, onClose, onOpen }: Props
) {
    const { user } = useUser();
    const router = useRouter();
    const [documents, setDocuments] = useState<Note[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) return;

        const fetchDocuments = async () => {
            setIsLoading(true)
            try {
                const docs = await getSearch()
                setDocuments(docs)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDocuments()
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            getSearch().then(setDocuments).catch(console.error)
        }
    }, [isOpen])


    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                isOpen ? onClose() : onOpen()
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [isOpen, onClose, onOpen])


    // useEffect(() => {
    //     const down = (e: KeyboardEvent) => {
    //         if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    //             e.preventDefault()
    //             setIsOpen((prev) => !prev)
    //         }
    //     }
    //     document.addEventListener('keydown', down)
    //     return () => document.removeEventListener('keydown', down)
    // }, [])

    const onSelect = (id: string) => {
        router.push(`/notes/${id}`)
        onClose()
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search ${user?.fullName}'s Notion...`} />
            <CommandList>
                {isLoading ? (
                    <div className="flex items-center justify-center py-6">
                        <span className="text-sm text-muted-foreground animate-pulse">
                            {/* Searching... */}
                            <Spinner />
                        </span>
                    </div>
                ) : (
                    <>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading='Documents'>
                                {documents?.map((document) => (
                                    <CommandItem
                                        key={document.id}
                                        value={`${document.id}-${document.title}`}
                                        title={document.title}
                                        onSelect={() => onSelect(String(document.id))}
                                    >
                                        {document.icon ? (
                                            <p className="mr-2 text-[18px]">{document.icon}</p>
                                        ) : (
                                            <File className="mr-2 h-4 w-4" />
                                        )}
                                        <span>{document.title}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                    </>
                )}
            </CommandList>
        </CommandDialog>
    )
}