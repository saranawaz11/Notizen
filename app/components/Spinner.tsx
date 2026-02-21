import { Loader } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva("animate-spin text-muted-foreground", {
    variants: {
        size: {
            default: "h-4 w-4",
            sm: "h-3 w-3",
            lg: "h-6 w-6",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

export const Spinner = ({
    size = "default",
    className,
}: {
    size?: "default" | "sm" | "lg"
    className?: string
}) => {
    return (
        <Loader
            className={cn(spinnerVariants({ size }), className)}
        />
    )
}