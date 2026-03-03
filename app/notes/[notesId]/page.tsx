import Cover from "@/app/components/Cover";
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

    if (!note) {
        return <div>Not found</div>;
    }
    return (
        <div className="pb-40">
            {/* <h2>Note id is: {JSON.stringify(note)}</h2> */}
            <Cover url={note.coverImage || undefined} />
            {/* <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                    <Toolbar initialData={document} />
                    <Editor
                        onChange={onChange}
                        initialContent={document.content}
                        editable={true}
                    />
                </div> */}
        </div>
    );
}