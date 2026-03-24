import { archiveNote } from '@/app/actions/notes'
import { notesTable } from '@/app/db/schema'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useRefresh } from '@/hooks/use-refresh'
import { useUser } from '@clerk/nextjs'
import { InferSelectModel } from 'drizzle-orm'
import { MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
type Note = InferSelectModel<typeof notesTable>['id']
type Props = {
    notesId: Note
}

export default function Menu(
    { notesId }: Props
) {
    const { user } = useUser()
    console.log('From menu:- ', notesId);
    const router = useRouter()
    const { refresh } = useRefresh()

    const onArchive = async () => {
        try {
            await archiveNote(notesId)
            toast.success('Note moved to trash')
            refresh()
            router.push('/notes')
        } catch {
            toast.error('Failed to archive note')
        }
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={'sm'} variant={'ghost'}>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                    <DropdownMenuItem onClick={onArchive}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="text-xs text-muted-foreground p-2">
                        Last edited by: {user?.fullName}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-10 w-10" />
    )
}
