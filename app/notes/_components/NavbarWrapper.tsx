// _components/NavbarWrapper.tsx
import { getNoteById } from '@/lib/queries/GetNotesById'
import Navbar from './Navbar'

type Props = {
    notesId: string
    isCollapsed: boolean
    onResetWidth: () => void
}

export default async function NavbarWrapper({ notesId, isCollapsed, onResetWidth }: Props) {
    const note = await getNoteById(parseInt(notesId))
    return (
        <Navbar
            note={note ?? null}
            isCollapsed={isCollapsed}
            onResetWidth={onResetWidth}
        />
    )
}