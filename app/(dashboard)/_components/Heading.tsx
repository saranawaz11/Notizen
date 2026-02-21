'use client'

import React from 'react'
import { TypewriterTextAnimation } from '@/app/(dashboard)/_components/TypewriterTextAnimation'
import { SignInButton, useUser } from '@clerk/nextjs'
import { Spinner } from '@/app/components/Spinner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Heading() {
    const { isSignedIn, isLoaded } = useUser()

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#626868]">
                Welcome to <span className="text-[#655560]">Notizen</span> <br />
                Where Your Thoughts Find Structure.
            </h1>

            <h3 className="text-base sm:text-xl md:text-2xl font-medium capitalize">
                A quiet space for loud ideas. <br />
                <span className="text-lg uppercase">
                    <TypewriterTextAnimation
                        text="Capture ideas, manage tasks, and keep everything in one clean, distraction-free space."
                    />
                </span>
            </h3>

            {!isLoaded && (
                <div className="flex justify-center">
                    <Spinner />
                </div>
            )}

            {isLoaded && !isSignedIn && (
                <SignInButton mode="modal">
                    <Button size="sm">Get Notizen Free</Button>
                </SignInButton>
            )}

            {isLoaded && isSignedIn && (
                <Button asChild>
                    <Link href="/notes">
                        Enter Notizen
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
        </div>
    )
}