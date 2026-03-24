'use client'

import { changeCover } from '@/app/actions/change-cover'
import { updateNote } from '@/app/actions/notes'
import IconPicker from '@/app/components/IconPicker'
import { notesTable } from '@/app/db/schema'
import { Button } from '@/components/ui/button'
import { useEdgeStore } from '@/lib/edgestore'
import { InferSelectModel } from 'drizzle-orm'
import { ImageIcon, Smile, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ComponentRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import TextareaAutosize from 'react-textarea-autosize'
import { useRefresh } from '@/hooks/use-refresh'
import { useNoteTitle } from '@/hooks/use-note-title'

type Note = InferSelectModel<typeof notesTable>

type Props = {
    initialData: Note,
    preview?: boolean,
    onCoverChange?: (url: string) => void,
    onTitleChange?: (title: string) => void
}

export default function Toolbar(
    { initialData, preview, onCoverChange, onTitleChange }: Props
) {

    const [icon, setIcon] = useState<string | null>(initialData.icon);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(initialData.coverImage);

    const inputRef = useRef<ComponentRef<'textarea'>>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { edgestore } = useEdgeStore()
    const router = useRouter()
    const { setTitle: setGlobalTitle } = useNoteTitle()

    const onIconSelect = async (newIcon: string) => {
        setIcon(newIcon);
        try {
            await updateNote({ id: initialData.id, icon: newIcon });
        } catch (error) {
            console.error(error);
        }
    }

    const onRemoveIcon = async () => {
        setIcon(null);
        try {
            await updateNote({ id: initialData.id, icon: null })
        } catch (error) {
            console.error(error)
        }
    }

    const onUpload = async (file: File) => {
        try {
            const res = await edgestore.publicFiles.upload({
                file,
                options: { replaceTargetUrl: coverImageUrl ?? undefined },
            });
            setCoverImageUrl(res.url);
            onCoverChange?.(res.url);
            await changeCover(Number(initialData.id), res.url);
            router.refresh();
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Failed to upload cover");
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await onUpload(file);
        e.target.value = "";
    };

    const enableInput = () => {
        if (preview) return;
        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title)
            inputRef.current?.focus();
        }, 0)
    }

    const disableInput = () => setIsEditing(false);
    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            disableInput();
        }
    }
    const { refresh } = useRefresh()
    const onInput = (val: string) => {
        setValue(val)
        setGlobalTitle(val)
        onTitleChange?.(val)
        updateNote({
            id: initialData.id,
            title: val || 'Untitled'
        }).then(() => refresh())
    }

    return (
        <div className="pl-[24px] group relative">

            {!!icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={onRemoveIcon}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant={'outline'}
                        size={'icon'}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {!!icon && preview && (
                <p className="text-6xl pt-6">{icon}</p>
            )}

            {!preview && (
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-1">
                    {!icon && (
                        <IconPicker asChild onChange={onIconSelect}>
                            <Button className="text-muted-foreground text-xs" variant={'outline'} size={'sm'}>
                                <Smile className="h-4 w-4 mr-2" />
                                Add icon
                            </Button>
                        </IconPicker>
                    )}
                    {!coverImageUrl && (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                className="text-muted-foreground text-xs"
                                variant={'outline'}
                                size={'sm'}
                            >
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Add cover
                            </Button>
                        </>
                    )}
                </div>
            )}

            <div className="pt-2">
                {isEditing && !preview ? (
                    <TextareaAutosize
                        ref={inputRef}
                        onBlur={disableInput}
                        onKeyDown={onKeyDown}
                        value={value}
                        onChange={(e) => onInput(e.target.value)}
                        className="w-full text-5xl bg-transparent font-bold wrap-break-word  outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                    />
                ) : (
                    <div
                        onClick={enableInput}
                        className="pb-[11.5px] text-5xl font-bold wrap-break-word text-[#3F3F3F] dark:text-[#CFCFCF] cursor-pointer"
                    >
                        {value}
                    </div>
                )}
            </div>

        </div>
    )
}