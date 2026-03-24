'use client'
import { cn } from '@/lib/utils';
import { ChevronsLeft, PlusCircle, Search, Plus, Trash, MenuIcon } from 'lucide-react';
import React, { ComponentRef, startTransition, useCallback, useEffect, useRef, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useMediaQuery } from "usehooks-ts";
import UserItem from './UserItem';
import Item from './Item';
import { createNote } from '@/app/actions/notes';
import { toast } from 'sonner';
import DocumentList from './DocumentList';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import TrashBox from './TrashBox';
import Navbar from './Navbar';
import NavbarWrapper from './NavbarWrapper';
import { useRefresh } from '@/hooks/use-refresh';
import { useNoteTitle } from '@/hooks/use-note-title';
import Link from 'next/link';

type Props = {
    onSearchOpen: () => void
}


export default function Navigation(
    { onSearchOpen }: Props
) {
    const sidebarRef = useRef<ComponentRef<'aside'>>(null);
    const [isResetting, setIsResetting] = useState(false);
    const isMobile = useMediaQuery('(max-width:767px)')
    const navbarRef = useRef<ComponentRef<'div'>>(null);
    const isResizingRef = useRef(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const pathname = usePathname();
    const params = useParams();

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty('left', `${newWidth}px`);
            navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMousedown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault()
        event.stopPropagation()
        isResizingRef.current = true
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }


    const collapseSidebar = useCallback(() => {
        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = '0';
            navbarRef.current.style.setProperty('width', '100%');
            navbarRef.current.style.setProperty('left', '0');
        }
    }, []);

    const expandSidebar = useCallback(() => {
        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = isMobile ? '100%' : '240px';
            navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 240px)');
            navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) collapseSidebar();
        else expandSidebar();
    }, [isMobile, collapseSidebar, expandSidebar]);

    useEffect(() => {
        if (isMobile) collapseSidebar();
    }, [pathname, isMobile, collapseSidebar]);


    const collapse = () => {
        setIsCollapsed(true);
        setIsResetting(true);
        collapseSidebar();
        setTimeout(() => setIsResetting(false), 300);
    };

    const resetWidth = () => {
        setIsCollapsed(false);
        setIsResetting(true);
        expandSidebar();
        setTimeout(() => setIsResetting(false), 300);
    };

    const router = useRouter()
    const { refresh } = useRefresh()

    const handleCreate = () => {
        startTransition(() => {
            const promise = createNote('Untitled')
                .then((notesId) => {
                    refresh();
                    router.push(`/notes/${notesId}`)
                })

            toast.promise(promise, {
                loading: 'Creating a new note...',
                success: 'New note created!',
                error: 'Failed to create a new note'
            })
        })
    }
    const [trashOpen, setTrashOpen] = useState(false)

    return (
        <div className='h-full z-40'>
            <aside ref={sidebarRef} className={cn("group/sidebar h-screen bg-secondary w-60 z-100 overflow-y-auto relative flex flex-col", isResetting && 'transition ease-in-out duration-300',
                isMobile && 'w-0'
            )}>
                <div onClick={collapse} className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100", isMobile && 'opacity-100')} role="button">
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                    <Link href={'/'} className='px-3 font-bold text-[#655560] dark:text-white text-sm cursor-pointer'>Notizen</Link>
                    <Item onClick={onSearchOpen} icon={Search} label='Search' isSearch />
                    <Item onClick={handleCreate} label='New Page' icon={PlusCircle} />
                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item onClick={handleCreate}
                        icon={Plus}
                        label="Add a page" />
                    <Popover open={trashOpen} onOpenChange={setTrashOpen}>
                        <PopoverTrigger className="w-full mt-4" onClick={() => setTrashOpen(true)}>
                            <Item icon={Trash} label="Trash" />
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-72" side={isMobile ? 'bottom' : 'right'}>
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    onMouseDown={handleMousedown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
            </aside>
            <div ref={navbarRef}
                className={cn('absolute top-0 z-99999 left-60 w-[calc(100%-240px)]',
                    isResetting && 'transition ease-in-out duration-300',
                    isMobile && 'left-0 w-full'
                )}>
                {!!params.notesId ? (
                    <NavbarWrapper
                        notesId={params.notesId as string}
                        isCollapsed={isCollapsed}
                        onResetWidth={resetWidth}
                    />
                ) : (
                    <nav onClick={resetWidth} className="bg-transparent px-3 py-2 w-full">
                        {isCollapsed && <MenuIcon className="h-6 w-6 text-muted-foreground" role="button" />}
                    </nav>
                )}
            </div>
        </div>
    );
}