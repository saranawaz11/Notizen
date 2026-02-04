import { SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import React from 'react'


export default function Header() {
    return (
        <header className='border max-w-6xl bg-amber-100 mx-auto p-7 flex justify-between items-center'>
            <p className="font-bold text-3xl">
                Notizen
            </p>
            <div className="search-bar">

            </div>
            <div className="flex gap-2 justify-center items-center text-center">
                <div className="logout">
                    <SignOutButton>
                        <button><LogOut /></button>
                    </SignOutButton>
                </div>
                <div className="initials h-12 w-12 bg-gray-300 rounded-full"></div>
            </div>

        </header>
    )
}
