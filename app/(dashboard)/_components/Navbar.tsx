'use client'

import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Spinner } from "@/app/components/Spinner";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/app/components/Mode-Toggle";

export default function Navbar() {
    const { isSignedIn, isLoaded } = useUser()
    return (
        <div className={cn('z-50 dark:bg-[#1F1F1F] bg-background fixed top-0 flex w-full p-6 items-center')}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between items-center w-full flex gap-x-2">
                {!isLoaded && (
                    <Spinner />
                )}
                {!isSignedIn && !isLoaded && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant='ghost' size='sm'>Log in</Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size='sm'>Get Notizen Free</Button>
                        </SignInButton>
                    </>
                )}
                {isSignedIn && !isLoaded && (
                    <>
                        <Button variant='ghost' size={'sm'} asChild>
                            <Link href='/documents'>
                                Enter Notizen
                            </Link>
                        </Button>
                        <UserButton afterSwitchSessionUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
}
