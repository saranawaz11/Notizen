import { getNoteById } from "@/lib/queries/GetNotesById";
import NoteContent from "../_components/NoteContent";

export default async function NotesIdPage({
    params,
}: {
        params: { notesId: string }
}) {

    const { notesId } = await params;
    const documentId = Number(notesId);

    console.log("Document id:", documentId);
    const note = await getNoteById(documentId);

    if (!note) {
        return <div>Not found</div>;
    }
    return <NoteContent note={note} />
}