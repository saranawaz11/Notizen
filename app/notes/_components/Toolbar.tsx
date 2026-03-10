'use client'

import { changeCover } from '@/app/actions/change-cover'
import { updateNote } from '@/app/actions/notes'
import IconPicker from '@/app/components/IconPicker'
import { notesTable } from '@/app/db/schema'
import { Button } from '@/components/ui/button'
import { useEdgeStore } from '@/lib/edgestore'
import { InferSelectModel } from 'drizzle-orm'
import { ImageIcon, Smile, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

type Note = InferSelectModel<typeof notesTable>

type Props = {
    initialData: Note,
    preview?: boolean,
    onCoverChange?: (url: string) => void
}

export default function Toolbar({ initialData, preview, onCoverChange }: Props) {

    const [icon, setIcon] = useState<string | null>(initialData.icon);

    const onIconSelect = async (newIcon: string) => {
        setIcon(newIcon);

        try {
            await updateNote({
                id: initialData.id,
                icon: newIcon
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onRemoveIcon = async () => {
        setIcon(null);
        try {
            await updateNote({
                id: initialData.id,
                icon: null
            })
        } catch (error) {
            console.error(error)
        }
    }

    const { edgestore } = useEdgeStore()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()

    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(initialData.coverImage);
    const params = useParams()

    // const onUpload = async (file: File) => {
    //     try {
    //         const res = await edgestore.publicFiles.upload({
    //             file,
    //             options: {
    //                 replaceTargetUrl: coverImageUrl ?? undefined,
    //             },
    //         });
    //         setCoverImageUrl(res.url);
    //         await changeCover(Number(initialData.id), res.url);
    //         router.refresh();
    //     } catch (error) {
    //         console.error("Upload failed", error);
    //         toast.error("Failed to upload cover");
    //     }
    // };

    // const onUpload = async (file: File) => {
    //     try {
    //         const res = await edgestore.publicFiles.upload({
    //             file,
    //             options: {
    //                 replaceTargetUrl: coverImageUrl ?? undefined,
    //             },
    //         });

    //         // setCoverImageUrl(res.url);
    //         // await changeCover(Number(initialData.id), res.url);

    //         setCoverImageUrl(res.url);
    //         onCoverChange?.(res.url);  // ← add this line
    //         await changeCover(Number(initialData.id), res.url);
    //         router.refresh();
    //         // Let React render the new state before refreshing server data
    //         // setTimeout(() => router.refresh(), 500);
    //     } catch (error) {
    //         console.error("Upload failed", error);
    //         toast.error("Failed to upload cover");
    //     }
    // };

    const onUpload = async (file: File) => {
        try {
            const res = await edgestore.publicFiles.upload({
                file,
                options: { replaceTargetUrl: coverImageUrl ?? undefined },
            });
            setCoverImageUrl(res.url);
            onCoverChange?.(res.url);  // ← add this line
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


    return (
        <div className="pl-[24px] group relative">
            {!!icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {icon}
                        </p>
                    </IconPicker>
                    <Button onClick={onRemoveIcon} className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs" variant={'outline'} size={'icon'}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-1">
                {!initialData.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect}>
                        <Button className="text-muted-foreground text-xs" variant={'outline'} size={'sm'}>
                            <Smile className="h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!coverImageUrl && !preview && (
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
        </div>
    )
}