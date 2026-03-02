'use client'
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { getTrash, removeNote, restoreNote } from "@/app/actions/notes";
import { Spinner } from "@/app/components/Spinner";
import { ConfirmModal } from "@/app/components/modals/ConfirmModal";

type Note = {
    id: number;
    title: string;
    isArchived: boolean;
};

const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const [documents, setDocuments] = useState<Note[] | undefined>(undefined);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getTrash().then(setDocuments).catch(console.error);
    }, []);

    const filteredDocuments = documents?.filter((document) =>
        document.title.toLowerCase().includes(search.toLowerCase())
    );

    const onClick = (documentId: number) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: number,
    ) => {
        event.stopPropagation();
        const promise = restoreNote(documentId).then(() => {
            setDocuments(prev => prev?.filter(d => d.id !== documentId));
        });

        toast.promise(promise, {
            loading: 'Restoring note...',
            success: 'Note restored!',
            error: 'Failed to restore note'
        });
    };

    const onRemove = (documentId: number) => {
        const promise = removeNote(documentId).then(() => {
            setDocuments(prev => prev?.filter(d => d.id !== documentId));
        });

        toast.promise(promise, {
            loading: 'Deleting note...',
            success: 'Note deleted!',
            error: 'Failed to delete note.'
        });

        if (params.documentId === String(documentId)) {
            router.push('/documents');
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size='lg' />
            </div>
        );
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents found.
                </p>
                {filteredDocuments?.map((document) => (
                    <div
                        key={document.id}
                        role="button"
                        onClick={() => onClick(document.id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2">{document.title}</span>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => onRestore(e, document.id)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document.id)}>
                                <div role="button" className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                    <Trash className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrashBox;