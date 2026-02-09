import React from 'react'
import Header from '@/app/components/Header'
import { Plus } from 'lucide-react'

export default function DashboardLayout(
    { children }: {
        children: React.ReactNode
    }
) {
    return (
        <div>
            <Header/>
            {children}

        </div>
    )
}
