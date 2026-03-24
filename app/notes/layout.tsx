'use client'
import React, { useState } from 'react'
import Navigation from './_components/Navigation'
import SearchCommand from '../components/SearchCommand'
import { useLastNote } from '@/hooks/use-last-note'
// import ErrorBoundary from '../components/ErrorBoundary'
// import NotesHeader from './_components/Header'


export default function Layout(
  { children }: {
    children: React.ReactNode
  }
) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useLastNote();
  return (
    <div className='h-full flex dark:bg-[#1F1F1F]'>
      <Navigation onSearchOpen={() => setIsSearchOpen(true)} />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onOpen={() => setIsSearchOpen(true)} />
        {children}
      </main>
    </div>
  )
}
