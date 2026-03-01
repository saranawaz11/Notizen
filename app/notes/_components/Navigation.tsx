'use client'
import useIsMobile from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { ChevronsLeft, PlusCircle, Search, Plus, Trash } from 'lucide-react';
import React, { ComponentRef, startTransition, useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import UserItem from './UserItem';
import Item from './Item';
import { createNote } from '@/app/actions/notes';
import { toast } from 'sonner';
import DocumentList from './DocumentList';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Navigation() {
    const sidebarRef = useRef<ComponentRef<'aside'>>(null);
    const [isResetting, setIsResetting] = useState(false);
    const { isMobile } = useIsMobile();
    const navbarRef = useRef<ComponentRef<'div'>>(null);
    const isResizingRef = useRef(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const pathname = usePathname();

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

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

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

    const handleCreate = () => {
        startTransition(() => {
            const promise = createNote('Untitled')
                .then((notesId) => {
                    router.push(`/notes/${notesId}`)
                })

            toast.promise(promise, {
                loading: 'Creating a new note...',
                success: 'New note created!',
                error: 'Failed to create a new note'
            })
        })
    }

    return (
        <div>
            <aside ref={sidebarRef} className={cn("group/sidebar h-full bg-secondary w-60 z-99999 overflow-y-auto relative flex flex-col", isResetting && 'transition ease-in-out duration-300',
                isMobile && 'w-0'
            )}>
                <div onClick={collapse} className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100", isMobile && 'opacity-100')} role="button">
                    <ChevronsLeft className="h-6 w-6" />
                </div>

                <div>
                    <UserItem />
                    <Item icon={Search} label='Search' isSearch />
                    <Item onClick={handleCreate} label='New Page' icon={PlusCircle} />
                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item onClick={handleCreate}
                        icon={Plus}
                        label="Add a page" />
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item icon={Trash} label="Trash" />
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-72" side={isMobile ? 'bottom' : 'right'}>
                            {/* <TrashBox/> */}
                        </PopoverContent>
                    </Popover>
                </div>
            </aside>

        </div>
    );
}