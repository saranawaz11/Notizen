import Cover from "@/app/components/Cover";
import { notesTable } from "@/app/db/schema";
import { getNoteById } from "@/lib/queries/GetNotesById";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import Toolbar from "../_components/Toolbar";

type Note = InferSelectModel<typeof notesTable>

export default async function NotesIdPage({
    params,
}: {
        // params: Promise<{ notesId: string }>
        params: { notesId: string }
}) {

    const { notesId } = await params;
    const documentId = Number(notesId);
    // const documentId = Number(params.notesId);
    console.log("Document id:", documentId);
    const note = await getNoteById(documentId);

    if (!note) {
        return <div>Not found</div>;
    }
    return (
        <div className="pb-40">
            {/* <h2>Note id is: {JSON.stringify(note)}</h2> */}
            <Cover url={note.coverImage || undefined} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={note as Note} />
                {/* <Editor
                        onChange={onChange}
                        initialContent={document.content}
                        editable={true}
                    /> */}
            </div>
        </div>
    );
}