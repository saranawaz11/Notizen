'use client'
import Image from "next/image"
import { ImageIcon, X } from "lucide-react"
import { toast } from "sonner"
import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useEdgeStore } from "@/lib/edgestore"
import { cn } from "@/lib/utils"
import { removeCover } from "@/app/actions/remove-cover"
import { changeCover } from "@/app/actions/change-cover"

type Props = {
    url?: string
    preview?: boolean
    onCoverChange?: (url: string | undefined) => void
}

const Cover = ({ url, preview, onCoverChange }: Props) => {
    const { edgestore } = useEdgeStore();
    const params = useParams();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [displayUrl, setDisplayUrl] = useState<string | undefined>(url);

    useEffect(() => {
        setDisplayUrl(url)
    }, [url])

    const onUpload = async (file: File) => {
        try {
            const res = await edgestore.publicFiles.upload({ file, options: { replaceTargetUrl: url } })
            setDisplayUrl(res.url)
            onCoverChange?.(res.url)     
            await changeCover(Number(params.notesId), res.url)
            router.refresh()
        } catch {
            toast.error("Failed to upload cover")
        }
    }

    const onRemove = async () => {
        try {
            setDisplayUrl(undefined)     
            onCoverChange?.(undefined)
            await removeCover(Number(params.notesId))
            router.refresh()
        } catch {
            toast.error("Failed to remove cover")
            setDisplayUrl(url)         
        }
    }

    return (
        <div className={cn('relative w-full group', displayUrl ? 'h-[40vh] bg-muted' : 'h-[12vh]')}>
            {!!displayUrl && (
                <Image src={displayUrl} fill alt="Cover" className="object-cover" key={displayUrl} />
            )}
            {displayUrl && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            await onUpload(file)
                            e.target.value = ""
                        }}
                        className="hidden"
                    />
                    <Button onClick={() => fileInputRef.current?.click()} className="text-muted-foreground text-xs" variant='outline' size='sm'>
                        <ImageIcon className="h-4 w-4 mr-2" />Change cover
                    </Button>
                    <Button onClick={onRemove} className="text-muted-foreground text-xs" variant='outline' size='sm'>
                        <X className="h-4 w-4 mr-2" />Remove
                    </Button>
                </div>
            )}
        </div>
    )
}
export default Cover

Cover.Skeleton = function CoverSkeleton() {
    return <Skeleton className="w-full h-[12vh]" />
}