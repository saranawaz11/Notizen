'use client'
import React, { useState } from 'react'
import Navigation from './Navigation'
import SearchCommand from '../../components/SearchCommand'

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <Navigation onSearchOpen={() => setIsSearchOpen(true)} />

      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onOpen={() => setIsSearchOpen(true)}
        />
        {children}
      </main>
    </>
  )
}