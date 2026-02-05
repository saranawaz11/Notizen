'use client'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import React from 'react'
import SearchBar from '@/app/components/SearchBar'
import { getInitials } from '@/app/utils/helper'
import { useUser } from '@clerk/nextjs'

function Header() {
    const { isSignedIn, user, isLoaded } = useUser()
    if (!isLoaded) {
        if (!isLoaded) return <div>Loading...</div>
    }
    console.log('isSignedIn:', isSignedIn)
    console.log(user?.fullName)
    console.log(user)

    return (
        <header className='drop-shadow-lg max-w-6xl mt-2 rounded bg-amber-100 mx-auto p-7 flex justify-between items-center'>
            <p className="font-bold text-3xl">
                Notizen
            </p>
            <div className="search-bar">
                <SearchBar />
            </div>
            <div className="flex gap-2 justify-center items-center text-center">
                <div className="logout">
                    <SignOutButton>
                        <button className='cursor-pointer'><LogOut /></button>
                    </SignOutButton>
                </div>
                <div className="initials h-12 w-12 bg-gray-300 rounded-full grid place-content-center">
                    <p className='font-semibold text-xl'>{getInitials(user?.fullName || user?.username || '')}
                    </p>
                </div>
            </div>

        </header>
    )
}
export default Header