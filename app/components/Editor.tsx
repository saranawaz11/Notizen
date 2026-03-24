import { useTheme } from 'next-themes';
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from '@blocknote/react';
import { useEdgeStore } from '@/lib/edgestore';
import { PartialBlock } from '@blocknote/core';
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

type Props = {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}
export default function Editor(
    { onChange, initialContent, editable }: Props
) {
    const { edgestore } = useEdgeStore();
    const { resolvedTheme } = useTheme();
    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({ file });
        return response.url;
    };

    const editor = useCreateBlockNote({
        initialContent: initialContent
            ? (() => {
                try {
                    return JSON.parse(initialContent) as PartialBlock[]
                } catch {
                    return undefined
                }
            })()
            : undefined,
        uploadFile: handleUpload,
    });

    return (
        <BlockNoteView
            editor={editor}
            editable={editable}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            onChange={(editor) =>
                onChange(JSON.stringify(editor.document, null, 2))
            }
            className="bn-editor"
        />
    )
}
