import { getNoteById } from "@/lib/queries/GetNotesById";

export default async function NotesIdPage({
    params,
}: {
    params: Promise<{ notesId: string }>
}) {
    const { notesId } = await params;
    const documentId = Number(notesId);

    console.log("Document id:", documentId);
    const note = await getNoteById(documentId);

    if (note === null) {
        return <div>Not found</div>;
    }
    return (
        <div>
            <h2>Note id is: {JSON.stringify(note)}</h2>
        </div>
    );
}