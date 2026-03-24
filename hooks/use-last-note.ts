import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useLastNote() {
    const pathname = usePathname()

    useEffect(() => {
        if (pathname.startsWith('/notes/')) {
            localStorage.setItem('last-note', pathname)
        }
    }, [pathname])
}