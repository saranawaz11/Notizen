import { removeNote, restoreNote } from '@/app/actions/notes'
import { notesTable } from '@/app/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/app/components/modals/ConfirmModal'

type NotesId = InferSelectModel<typeof notesTable>['id']
type Props = {
    notesId: NotesId
}

export default function Banner(
    { notesId }: Props
) {
    const router = useRouter()
    const onRemove = () => {
        const promise = removeNote(notesId)
        toast.promise(promise, {
            loading: 'Deleting note...',
            success: 'Note deleted!',
            error: 'Failed to delete note.'
        });
        router.push('/notes')
    }

    const onRestore = () => {
        const promise = restoreNote(notesId);
        toast.promise(promise, {
            loading: 'Restoring note...',
            success: 'Note restored!',
            error: 'Failed to restore note.'
        });
    }
    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>This page is in trash.</p>
            <Button size={'sm'} onClick={onRestore} variant={'outline'} className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal">
                Restore page
            </Button>

            <ConfirmModal onConfirm={onRemove}>
                <Button size={'sm'} variant={'outline'} className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal">
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    )
}
