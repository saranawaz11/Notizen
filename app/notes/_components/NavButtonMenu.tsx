import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
    icon: LucideIcon,
    label: string,
    choices: {
        title: string,
        href?: string,
        action?: () => void
    }[]
}


export default function NavButtonMenu(
    { icon: Icon, label, choices }: Props
) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Icon className="w-[1.2rem] h-[1.2rem]" />
                    <span className="sr-only">{label}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {choices.map((choice) => (
                    <DropdownMenuItem key={choice.title} asChild>
                        {choice.href ? (
                            <Link href={choice.href}>
                                {choice.title}
                            </Link>
                        ) : (
                            <button
                                onClick={choice.action}
                                className="w-full text-left"
                            >
                                {choice.title}
                            </button>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
