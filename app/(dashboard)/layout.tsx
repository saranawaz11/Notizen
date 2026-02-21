import React from 'react'
import Navbar from './_components/Navbar'
// import Header from '@/app/components/Header'
// import { Plus } from 'lucide-react'

export default function DashboardLayout(
    { children }: {
        children: React.ReactNode
    }
) {
    return (
        <div className="dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="h-full pt-40">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}
