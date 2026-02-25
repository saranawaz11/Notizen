import { NoteSelectSchemaType } from '@/app/zod-schema/note'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react'
import React from 'react'

type Props = {
    id?: NoteSelectSchemaType['id'],
    onClick?: () => void,
    level?: number,
    active?: boolean,
    expanded?: boolean,
    onExpand?: () => void,
    documentIcon?: string,
    icon: LucideIcon
}
export default function Item({
    id,
    onClick,
    level = 0,
    active,
    expanded,
    onExpand,
    documentIcon,
    icon: Icon
}: Props
) {
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
        onExpand?.()
    }

    return (

        <div onClick={onClick} role="button" style={{ paddingLeft: level ? `${(level * 12) + 12}px` : '12px' }} className={cn(
            "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
            active && 'bg-primary/5 text-primary'
        )}>
            {!!id && (
                <div role="button" className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1" onClick={handleExpand}>
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
            )}
        </div>
    )
}
