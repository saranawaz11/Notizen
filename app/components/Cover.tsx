'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { removeCover } from "@/app/actions/remove-cover";
import { toast } from "sonner";
import { changeCover } from "@/app/actions/change-cover";
import { useRef, useState } from "react";

interface CoverImageProps {
    url?: string;
    preview?: boolean;
}

const Cover = ({
    url,
    preview
}: CoverImageProps) => {
    const { edgestore } = useEdgeStore()
    // const coverImage = useCoverImage()
    const params = useParams()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [coverUrl, setCoverUrl] = useState<string | undefined>(url);

    const onUpload = async (file: File) => {
        try {
            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverUrl,
                },
            });

            setCoverUrl(res.url);
            await changeCover(Number(params.notesId), res.url);
            router.refresh();
        } catch (error) {
            console.log("Upload failed", error);
            toast.error("Failed to upload cover");
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await onUpload(file);
        e.target.value = "";
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const onRemove = async () => {
        try {
            const noteId = Number(params.notesId);
            await removeCover(noteId);
            setCoverUrl(undefined);
            router.refresh();
        } catch (error) {
            console.log("Remove cover failed", error);
            toast.error("Failed to remove cover");
        }
    };

    return (
        <div className={cn(
            'relative w-full h-[40vh] group',
            !url && 'h-[12vh]',
            url && 'bg-muted'
        )}>
            {!!coverUrl && (
                <Image src={coverUrl} fill alt="Cover" className="object-cover" key={coverUrl} />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button
                        onClick={handleClick}
                        className="text-muted-foreground text-xs hover:cursor-pointer"
                        variant={'outline'}
                        size={'sm'}
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-xs"
                        variant={'outline'}
                        size={'sm'}
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[12vh]" />
    )
}