import { getNoteById } from "@/lib/queries/GetNotesById";
import NoteContent from "@/app/notes/_components/NoteContent";
import { redirect } from "next/navigation";

export default async function NotesIdPage({
    params,
}: {
        params: { notesId: string }
    }) {
    const { notesId } = await params;
    const documentId = Number(notesId);
    const note = await getNoteById(documentId);

    if (!note) {
        redirect('/notes?clear=true')
    }
    return <NoteContent note={note} />
}