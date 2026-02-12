import { getNoteById } from "@/lib/queries/GetNotesById"

export default async function Page({
    params,
}: {
    params: Promise<{ notesId: string }>
}) {
    const { notesId } = await params
    console.log(notesId);
    
    const note = await getNoteById(Number(notesId))

    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
        </div>
    )
}
